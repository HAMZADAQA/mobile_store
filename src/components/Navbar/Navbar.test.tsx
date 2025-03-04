import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { StoreContext } from "../../context/CartContext";
import { mockProduct } from "../../__mocks__/mockData";

describe("Navbar Component", () => {
  it("renders logo and shows empty cart when cart is empty", () => {
    const storeContextValue = {
      cart: [],
    };

    render(
      <MemoryRouter>
        <StoreContext.Provider value={storeContextValue as any}>
          <Navbar />
        </StoreContext.Provider>
      </MemoryRouter>
    );

    const logoImg = document.querySelector(".navbar__logo img");
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute("src", "/file.svg");

    expect(screen.getByText("0")).toBeInTheDocument();

    const shoppingBag = document.querySelector(".shopping-bag");
    expect(shoppingBag).toBeInTheDocument();
    expect(shoppingBag).not.toHaveClass("filled");
  });

  it("shows filled cart when there are items in the cart", () => {
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

    const storeContextValue = {
      cart: [dummyCartItem],
    };

    render(
      <MemoryRouter>
        <StoreContext.Provider value={storeContextValue as any}>
          <Navbar />
        </StoreContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("1")).toBeInTheDocument();

    const shoppingBag = document.querySelector(".shopping-bag");
    expect(shoppingBag).toBeInTheDocument();
    expect(shoppingBag).toHaveClass("filled");
  });
});
