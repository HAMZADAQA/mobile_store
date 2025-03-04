import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import useCachedProduct from "./useCachedProduct";
import { getCache, setCache } from "../services/utils/cache";
import { getProductById } from "../services/api";
import { Product } from "../types/types";

jest.mock("../services/utils/cache", () => ({
  getCache: jest.fn(),
  setCache: jest.fn(),
}));
jest.mock("../services/api", () => ({
  getProductById: jest.fn(),
}));

const CachedProductTest: React.FC<{ productId: string }> = ({ productId }) => {
  const { product, loading } = useCachedProduct(productId);
  return (
    <div>
      {loading ? (
        <span data-testid="loading">Loading</span>
      ) : (
        <span data-testid="product">
          {product ? product.name : "No product"}
        </span>
      )}
    </div>
  );
};

describe("useCachedProduct", () => {
  const dummyProduct: Product = {
    id: "TEST-1",
    brand: "TestBrand",
    name: "Test Product",
    basePrice: 100,
    imageUrl: "http://example.com/image.png",
    description: "Test product description",
    colorOptions: [],
    storageOptions: [],
    similarProducts: [],
    specs: {
      screen: "6 inches",
      resolution: "1920x1080",
      processor: "Test Processor",
      mainCamera: "Test Main Camera",
      selfieCamera: "Test Selfie Camera",
    },
    rating: 4.5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display cached product if available", async () => {
    (getCache as jest.Mock).mockReturnValue(dummyProduct);
    (getProductById as jest.Mock).mockResolvedValue(dummyProduct);

    render(<CachedProductTest productId="TEST-1" />);
    await waitFor(() =>
      expect(screen.getByTestId("product").textContent).toBe(dummyProduct.name)
    );
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
  });

  it("should fetch product if not cached", async () => {
    (getCache as jest.Mock).mockReturnValue(null);
    (getProductById as jest.Mock).mockResolvedValue(dummyProduct);

    render(<CachedProductTest productId="TEST-2" />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId("product").textContent).toBe(dummyProduct.name)
    );
    expect(setCache).toHaveBeenCalledWith(`product_TEST-2`, dummyProduct);
  });

  it("should handle errors during fetch", async () => {
    (getCache as jest.Mock).mockReturnValue(null);
    (getProductById as jest.Mock).mockRejectedValue(new Error("Fetch error"));

    render(<CachedProductTest productId="TEST-3" />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId("product").textContent).toBe("No product")
    );
  });
});
