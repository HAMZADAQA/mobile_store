import { render, screen, fireEvent } from "@testing-library/react";
import ProductSelectors from "./ProductSelectors";
import { mockProduct } from "../../__mocks__/mockData";

describe("ProductSelectors Component", () => {
  const handleColorChange = jest.fn();
  const handleStorageChange = jest.fn();
  const setHoveredColor = jest.fn();

  const defaultProps = {
    product: mockProduct,
    selectedColor: "",
    selectedStorage: "",
    handleColorChange,
    handleStorageChange,
    hoveredColor: null,
    setHoveredColor,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders storage and color options", () => {
    render(<ProductSelectors {...defaultProps} />);

    expect(screen.getByText("128GB")).toBeInTheDocument();
    expect(screen.getByText("256GB")).toBeInTheDocument();

    expect(screen.getByTitle("Phantom Black")).toBeInTheDocument();
    expect(screen.getByTitle("Cream")).toBeInTheDocument();
  });

  it("calls handleStorageChange when a storage option is clicked", () => {
    render(<ProductSelectors {...defaultProps} />);
    const storageButton = screen.getByText("128GB");

    fireEvent.click(storageButton);
    expect(handleStorageChange).toHaveBeenCalledWith("128GB");
  });

  it("calls handleColorChange when a color swatch is clicked", () => {
    render(<ProductSelectors {...defaultProps} />);
    const colorButton = screen.getByTitle("Phantom Black");

    fireEvent.click(colorButton);
    expect(handleColorChange).toHaveBeenCalledWith("Phantom Black");
  });

  it("calls setHoveredColor on mouse enter and mouse leave", () => {
    render(<ProductSelectors {...defaultProps} />);
    const colorButton = screen.getByTitle("Cream");

    fireEvent.mouseEnter(colorButton);
    expect(setHoveredColor).toHaveBeenCalledWith("Cream");

    fireEvent.mouseLeave(colorButton);
    expect(setHoveredColor).toHaveBeenCalledWith(null);
  });

  it("displays the selected or hovered color", () => {
    const { rerender } = render(
      <ProductSelectors
        {...defaultProps}
        selectedColor="Phantom Black"
        hoveredColor={null}
      />
    );
    expect(screen.getByText("Phantom Black")).toBeInTheDocument();

    rerender(
      <ProductSelectors
        {...defaultProps}
        selectedColor="Phantom Black"
        hoveredColor="Cream"
      />
    );
    expect(screen.getByText("Cream")).toBeInTheDocument();
  });
});
