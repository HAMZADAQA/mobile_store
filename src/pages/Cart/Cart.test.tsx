import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import { MemoryRouter } from "react-router-dom";
import { StoreContext, StoreContextType } from "../../context/CartContext";
import { mockProduct } from "../../__mocks__/mockData";

describe("Cart Component", () => {
  const removeItemMock = jest.fn();
  const clearCartMock = jest.fn();

  const baseContext: StoreContextType = {
    products: [],
    loading: false,
    fetchProducts: async () => {},
    cart: [],
    addItem: () => {},
    removeItem: removeItemMock,
    clearCart: clearCartMock,
    total: 0,
  };

  beforeEach(() => {
    removeItemMock.mockClear();
    clearCartMock.mockClear();
  });

  it("renders empty cart view", () => {
    render(
      <MemoryRouter>
        <StoreContext.Provider value={baseContext}>
          <Cart />
        </StoreContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Cart \(0\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Continuar comprando/i)).toBeInTheDocument();
  });

  it("renders cart items and total when items are present", () => {
    const dummyCartItem = {
      id: "cart-item-1",
      product: mockProduct,
      selectedColor:
        mockProduct.colorOptions && mockProduct.colorOptions.length > 0
          ? mockProduct.colorOptions[0].name
          : "default",
      selectedStorage:
        mockProduct.storageOptions && mockProduct.storageOptions.length > 0
          ? mockProduct.storageOptions[0].capacity
          : "default",
      price: mockProduct.basePrice,
    };

    const contextValue: StoreContextType = {
      ...baseContext,
      cart: [dummyCartItem],
      total: dummyCartItem.price,
    };

    render(
      <MemoryRouter>
        <StoreContext.Provider value={contextValue}>
          <Cart />
        </StoreContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Cart \(1\)/i)).toBeInTheDocument();
    expect(screen.getByText(dummyCartItem.product.name)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${dummyCartItem.selectedStorage} | ${dummyCartItem.selectedColor}`
      )
    ).toBeInTheDocument();
    const priceElements = screen.getAllByText(`${dummyCartItem.price} EUR`);
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it("calls removeItem when 'Eliminar' button is clicked", () => {
    const dummyCartItem = {
      id: "cart-item-1",
      product: mockProduct,
      selectedColor:
        mockProduct.colorOptions && mockProduct.colorOptions.length > 0
          ? mockProduct.colorOptions[0].name
          : "default",
      selectedStorage:
        mockProduct.storageOptions && mockProduct.storageOptions.length > 0
          ? mockProduct.storageOptions[0].capacity
          : "default",
      price: mockProduct.basePrice,
    };

    const contextValue: StoreContextType = {
      ...baseContext,
      cart: [dummyCartItem],
      total: dummyCartItem.price,
    };

    render(
      <MemoryRouter>
        <StoreContext.Provider value={contextValue}>
          <Cart />
        </StoreContext.Provider>
      </MemoryRouter>
    );

    const removeButtons = screen.getAllByText(/Eliminar/i);
    expect(removeButtons.length).toBeGreaterThan(0);
    fireEvent.click(removeButtons[0]);
    expect(removeItemMock).toHaveBeenCalledWith(0);
  });

  it("calls clearCart when a pay button is clicked", () => {
    const dummyCartItem = {
      id: "cart-item-1",
      product: mockProduct,
      selectedColor:
        mockProduct.colorOptions && mockProduct.colorOptions.length > 0
          ? mockProduct.colorOptions[0].name
          : "default",
      selectedStorage:
        mockProduct.storageOptions && mockProduct.storageOptions.length > 0
          ? mockProduct.storageOptions[0].capacity
          : "default",
      price: mockProduct.basePrice,
    };

    const contextValue: StoreContextType = {
      ...baseContext,
      cart: [dummyCartItem],
      total: dummyCartItem.price,
    };

    render(
      <MemoryRouter>
        <StoreContext.Provider value={contextValue}>
          <Cart />
        </StoreContext.Provider>
      </MemoryRouter>
    );

    const payButtons = screen.getAllByRole("button", { name: /pay/i });
    expect(payButtons.length).toBeGreaterThan(0);
    fireEvent.click(payButtons[0]);
    expect(clearCartMock).toHaveBeenCalled();
  });
});
