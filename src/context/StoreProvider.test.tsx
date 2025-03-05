import { useContext } from "react";
import { render, screen, act } from "@testing-library/react";
import { StoreProvider } from "./StoreProvider";
import { StoreContext } from "./CartContext";
import { CartItem } from "../types/types";
import { mockProduct } from "../__mocks__/mockData";

jest.mock("../services/utils/cache", () => ({
  getCache: jest.fn(() => undefined),
  setCache: jest.fn(),
}));

const ConsumerComponent = () => {
  const context = useContext(StoreContext);
  if (!context) return <div>No context available</div>;

  return (
    <div>
      <div data-testid="loading">
        {context.loading ? "loading" : "not loading"}
      </div>
      <div data-testid="total">{context.total}</div>
      <button
        data-testid="add-item"
        onClick={() => {
          const cartItem: CartItem = {
            id: "cart-item-1",
            product: mockProduct,
            selectedColor:
              mockProduct.colorOptions && mockProduct.colorOptions.length > 0
                ? mockProduct.colorOptions[0].name
                : "default",
            selectedStorage:
              mockProduct.storageOptions &&
              mockProduct.storageOptions.length > 0
                ? mockProduct.storageOptions[0].capacity
                : "default",
            price: mockProduct.basePrice,
          };
          context.addItem(cartItem);
        }}
      >
        Add Item
      </button>
      <button data-testid="clear-cart" onClick={context.clearCart}>
        Clear Cart
      </button>
    </div>
  );
};

describe("StoreProvider", () => {
  test("provides initial context values", () => {
    render(
      <StoreProvider>
        <ConsumerComponent />
      </StoreProvider>
    );

    expect(screen.getByTestId("loading").textContent).toBe("loading");
    expect(screen.getByTestId("total").textContent).toBe("0");
  });

  test("updates total after adding an item", () => {
    render(
      <StoreProvider>
        <ConsumerComponent />
      </StoreProvider>
    );

    const addButton = screen.getByTestId("add-item");
    act(() => {
      addButton.click();
    });

    expect(screen.getByTestId("total").textContent).toBe(
      String(mockProduct.basePrice)
    );
  });

  test("clears cart and resets total", () => {
    render(
      <StoreProvider>
        <ConsumerComponent />
      </StoreProvider>
    );

    const addButton = screen.getByTestId("add-item");
    const clearButton = screen.getByTestId("clear-cart");

    act(() => {
      addButton.click();
    });
    expect(screen.getByTestId("total").textContent).toBe(
      String(mockProduct.basePrice)
    );

    act(() => {
      clearButton.click();
    });
    expect(screen.getByTestId("total").textContent).toBe("0");
  });
});
