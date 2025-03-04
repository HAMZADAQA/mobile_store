import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { StoreContext } from "../../context/CartContext";
import { mockProduct, mockAPIProduct } from "../../__mocks__/mockData";

const mockProducts = [mockProduct, mockAPIProduct];

const storeContextValue = {
  products: mockProducts,
  loading: false,
  fetchProducts: jest.fn(),
  cart: [],
  addItem: jest.fn(),
  removeItem: jest.fn(),
  clearCart: jest.fn(),
  total: 0,
};

describe("Home Component", () => {
  test("renders search bar and phone grid when products are loaded", () => {
    render(
      <MemoryRouter>
        <StoreContext.Provider value={storeContextValue}>
          <Home />
        </StoreContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();

    expect(screen.getByText(/2 results/i)).toBeInTheDocument();

    expect(screen.getByText(/Galaxy S24 Ultra/i)).toBeInTheDocument();
    expect(screen.getByText(/API Fetched S24 Ultra/i)).toBeInTheDocument();
  });

  test("shows loading message when loading is true and no products", () => {
    const loadingContextValue = {
      ...storeContextValue,
      products: [],
      loading: true,
    };

    render(
      <MemoryRouter>
        <StoreContext.Provider value={loadingContextValue}>
          <Home />
        </StoreContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("filters products based on search query", () => {
    render(
      <MemoryRouter>
        <StoreContext.Provider value={storeContextValue}>
          <Home />
        </StoreContext.Provider>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: "Galaxy S24 Ultra" } });

    expect(screen.getByText(/1 results/i)).toBeInTheDocument();
    expect(screen.getByText(/Galaxy S24 Ultra/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/API Fetched S24 Ultra/i)
    ).not.toBeInTheDocument();
  });
});
