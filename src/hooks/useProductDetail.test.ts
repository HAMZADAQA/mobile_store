import { renderHook, waitFor } from "@testing-library/react";
import { useProductDetail } from "../hooks/useProductDetail";
import { getCache, setCache } from "../services/utils/cache";
import { getProductById } from "../services/api";
import { mockCachedProduct, mockAPIProduct } from "../__mocks__/mockData";

jest.mock("../services/utils/cache", () => ({
  getCache: jest.fn() as jest.Mock,
  setCache: jest.fn() as jest.Mock,
}));

jest.mock("../services/api", () => ({
  getProductById: jest.fn() as jest.Mock,
}));

describe("useProductDetail Hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached product if available", async () => {
    (getCache as jest.Mock).mockReturnValue(mockCachedProduct);

    const { result } = renderHook(() => useProductDetail("SMG-S24U"));

    expect(result.current.product).toEqual(mockCachedProduct);
    expect(result.current.loading).toBe(false);
    expect(getCache).toHaveBeenCalledWith("product_SMG-S24U");
  });

  it("should fetch product from API if not in cache", async () => {
    (getCache as jest.Mock).mockReturnValue(null);
    (getProductById as jest.Mock).mockResolvedValue(mockAPIProduct);

    const { result } = renderHook(() => useProductDetail("SMG-S24U"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.product).toEqual(mockAPIProduct);
      expect(result.current.loading).toBe(false);
    });

    expect(getProductById).toHaveBeenCalledWith("SMG-S24U");
    expect(setCache).toHaveBeenCalledWith("product_SMG-S24U", mockAPIProduct);
  });

  it("should handle API error gracefully", async () => {
    (getCache as jest.Mock).mockReturnValue(null);
    (getProductById as jest.Mock).mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useProductDetail("SMG-S24U"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.product).toBeNull();
      expect(result.current.loading).toBe(false);
    });

    expect(getProductById).toHaveBeenCalledWith("SMG-S24U");
  });
});
