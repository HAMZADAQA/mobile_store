import { renderHook, act } from "@testing-library/react";
import { useProductUIState } from "../hooks/useProductUIState";
import { mockProduct } from "../__mocks__/mockData";

describe("useProductUIState Hook", () => {
  it("should initialize state correctly with a product", () => {
    const { result } = renderHook(() => useProductUIState(mockProduct));

    expect(result.current.currentImage).toBe(mockProduct.imageUrl);
    expect(result.current.price).toBe(mockProduct.basePrice);
    expect(result.current.selectedColor).toBe("");
    expect(result.current.selectedStorage).toBe("");
    expect(result.current.similarProducts).toEqual(mockProduct.similarProducts);
  });

  it("should update current image", () => {
    const { result } = renderHook(() => useProductUIState(mockProduct));
    act(() => {
      result.current.setCurrentImage("new-image.png");
    });
    expect(result.current.currentImage).toBe("new-image.png");
  });

  it("should update price", () => {
    const { result } = renderHook(() => useProductUIState(mockProduct));
    act(() => {
      result.current.setPrice(1499);
    });
    expect(result.current.price).toBe(1499);
  });

  it("should update selected color", () => {
    const { result } = renderHook(() => useProductUIState(mockProduct));
    act(() => {
      result.current.setSelectedColor("Blue");
    });
    expect(result.current.selectedColor).toBe("Blue");
  });

  it("should update selected storage", () => {
    const { result } = renderHook(() => useProductUIState(mockProduct));
    act(() => {
      result.current.setSelectedStorage("256GB");
    });
    expect(result.current.selectedStorage).toBe("256GB");
  });
});
