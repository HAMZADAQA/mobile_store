import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import { StoreContext } from "../../context/CartContext";
import { mockProduct } from "../../__mocks__/mockData";

jest.mock("../../hooks/useProductDetail", () => ({
  useProductDetail: jest.fn(),
}));
jest.mock("../../hooks/useProductUIState", () => ({
  useProductUIState: jest.fn(),
}));
jest.mock("../../hooks/useSmoothScrollOnParamChange", () => jest.fn());

import { useProductDetail } from "../../hooks/useProductDetail";
import { useProductUIState } from "../../hooks/useProductUIState";

const addItemMock = jest.fn();
const storeContextValue = {
  cart: [],
  addItem: addItemMock,
  removeItem: jest.fn(),
  clearCart: jest.fn(),
  products: [],
  fetchProducts: jest.fn(),
  loading: false,
  total: 0,
};

describe("Detail Component", () => {
  beforeEach(() => {
    addItemMock.mockClear();
    (useProductDetail as jest.Mock).mockClear();
    (useProductUIState as jest.Mock).mockClear();
  });

  it("renders loading state when product is loading", () => {
    (useProductDetail as jest.Mock).mockReturnValue({
      product: null,
      loading: true,
    });
    (useProductUIState as jest.Mock).mockReturnValue({
      currentImage: "",
      setCurrentImage: jest.fn(),
      price: 0,
      setPrice: jest.fn(),
      selectedColor: "",
      setSelectedColor: jest.fn(),
      selectedStorage: "",
      setSelectedStorage: jest.fn(),
      similarProducts: [],
    });

    render(
      <MemoryRouter initialEntries={["/detail/SMG-S24U"]}>
        <Routes>
          <Route
            path="/detail/:id"
            element={
              <StoreContext.Provider value={storeContextValue}>
                <Detail />
              </StoreContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders detail view when product is loaded", () => {
    (useProductDetail as jest.Mock).mockReturnValue({
      product: mockProduct,
      loading: false,
    });
    (useProductUIState as jest.Mock).mockReturnValue({
      currentImage: mockProduct.imageUrl,
      setCurrentImage: jest.fn(),
      price: mockProduct.basePrice,
      setPrice: jest.fn(),
      selectedColor: "Phantom Black",
      setSelectedColor: jest.fn(),
      selectedStorage: "128GB",
      setSelectedStorage: jest.fn(),
      similarProducts: [],
    });

    render(
      <MemoryRouter initialEntries={["/detail/SMG-S24U"]}>
        <Routes>
          <Route
            path="/detail/:id"
            element={
              <StoreContext.Provider value={storeContextValue}>
                <Detail />
              </StoreContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const productNameHeading = screen.getByRole("heading", {
      name: mockProduct.name,
    });
    expect(productNameHeading).toBeInTheDocument();

    expect(
      screen.getByText(`${mockProduct.basePrice} EUR`)
    ).toBeInTheDocument();

    const img = screen.getByRole("img", {
      name: `${mockProduct.brand} ${mockProduct.name}`,
    });
    expect(img).toHaveAttribute("src", mockProduct.imageUrl);

    expect(screen.getByText(/Back/i)).toBeInTheDocument();

    const addToCartButton = screen.getByRole("button", { name: /Añadir/i });
    expect(addToCartButton).toBeEnabled();
  });

  it("disables add to cart button if color or storage not selected", () => {
    (useProductDetail as jest.Mock).mockReturnValue({
      product: mockProduct,
      loading: false,
    });
    (useProductUIState as jest.Mock).mockReturnValue({
      currentImage: mockProduct.imageUrl,
      setCurrentImage: jest.fn(),
      price: mockProduct.basePrice,
      setPrice: jest.fn(),
      selectedColor: "",
      setSelectedColor: jest.fn(),
      selectedStorage: "",
      setSelectedStorage: jest.fn(),
      similarProducts: [],
    });

    render(
      <MemoryRouter initialEntries={["/detail/SMG-S24U"]}>
        <Routes>
          <Route
            path="/detail/:id"
            element={
              <StoreContext.Provider value={storeContextValue}>
                <Detail />
              </StoreContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const addToCartButton = screen.getByRole("button", { name: /Añadir/i });
    expect(addToCartButton).toBeDisabled();
  });

  it("calls addItem when add to cart button is clicked", () => {
    (useProductDetail as jest.Mock).mockReturnValue({
      product: mockProduct,
      loading: false,
    });
    (useProductUIState as jest.Mock).mockReturnValue({
      currentImage: mockProduct.imageUrl,
      setCurrentImage: jest.fn(),
      price: mockProduct.basePrice,
      setPrice: jest.fn(),
      selectedColor: "Phantom Black",
      setSelectedColor: jest.fn(),
      selectedStorage: "128GB",
      setSelectedStorage: jest.fn(),
      similarProducts: [],
    });

    render(
      <MemoryRouter initialEntries={["/detail/SMG-S24U"]}>
        <Routes>
          <Route
            path="/detail/:id"
            element={
              <StoreContext.Provider value={storeContextValue}>
                <Detail />
              </StoreContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const addToCartButton = screen.getByRole("button", { name: /Añadir/i });
    act(() => {
      fireEvent.click(addToCartButton);
    });
    expect(addItemMock).toHaveBeenCalledTimes(1);
    const addedItem = addItemMock.mock.calls[0][0];
    expect(addedItem.product).toEqual(mockProduct);
    expect(addedItem.selectedColor).toBe("Phantom Black");
    expect(addedItem.selectedStorage).toBe("128GB");
    expect(addedItem.price).toBe(mockProduct.basePrice);
    expect(addedItem.image).toBe(mockProduct.imageUrl);
  });
});
