import { render, screen, fireEvent } from "@testing-library/react";
import PhoneCard from "./PhoneCard";
import { MemoryRouter } from "react-router-dom";
import { mockProduct } from "../../__mocks__/mockData";
import usePrefetchProduct from "../../hooks/usePrefetchProduct";

jest.mock("../../hooks/usePrefetchProduct");

describe("PhoneCard Component", () => {
  const mockPrefetch = jest.fn();

  beforeEach(() => {
    (usePrefetchProduct as jest.Mock).mockReturnValue(mockPrefetch);
    mockPrefetch.mockClear();
  });

  it("renders product details correctly", () => {
    render(
      <MemoryRouter>
        <PhoneCard product={mockProduct} />
      </MemoryRouter>
    );

    const image = screen.getByRole("img", {
      name: `${mockProduct.brand} ${mockProduct.name}`,
    });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.imageUrl);

    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    expect(
      screen.getByText(`${mockProduct.basePrice} EUR`)
    ).toBeInTheDocument();
  });

  it("calls prefetchProduct on mouse enter", () => {
    const { container } = render(
      <MemoryRouter>
        <PhoneCard product={mockProduct} />
      </MemoryRouter>
    );

    const phoneCardDiv = container.querySelector(".phone-card");
    expect(phoneCardDiv).toBeInTheDocument();

    if (phoneCardDiv) {
      fireEvent.mouseEnter(phoneCardDiv);
    }

    expect(mockPrefetch).toHaveBeenCalledWith(mockProduct.id);
  });
});
