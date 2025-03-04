import { act, renderHook } from "@testing-library/react";
import usePrefetchProduct from "./usePrefetchProduct";
import { getCache, setCache } from "../services/utils/cache";
import { getProductById } from "../services/api";

jest.mock("../services/utils/cache", () => ({
  getCache: jest.fn(),
  setCache: jest.fn(),
}));
jest.mock("../services/api", () => ({
  getProductById: jest.fn(),
}));

describe("usePrefetchProduct", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should prefetch product when not cached", async () => {
    (getCache as jest.Mock).mockReturnValue(null);
    const dummyProduct = { id: "TEST-4", name: "Prefetched Product" };
    (getProductById as jest.Mock).mockResolvedValue(dummyProduct);

    const { result } = renderHook(() => usePrefetchProduct());
    await act(async () => {
      await result.current("TEST-4");
    });

    expect(getCache).toHaveBeenCalledWith(`product_TEST-4`);
    expect(getProductById).toHaveBeenCalledWith("TEST-4");
    expect(setCache).toHaveBeenCalledWith(`product_TEST-4`, dummyProduct);
  });

  it("should not prefetch if product is already cached", async () => {
    const cachedProduct = { id: "TEST-5", name: "Cached Product" };
    (getCache as jest.Mock).mockReturnValue(cachedProduct);

    const { result } = renderHook(() => usePrefetchProduct());
    await act(async () => {
      await result.current("TEST-5");
    });

    expect(getCache).toHaveBeenCalledWith(`product_TEST-5`);
    expect(getProductById).not.toHaveBeenCalled();
    expect(setCache).not.toHaveBeenCalled();
  });
});
