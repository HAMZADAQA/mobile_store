import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  test("calls onSearch callback when input changes", () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} resultCount={5} />);

    const input = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(input, { target: { value: "test query" } });

    expect(onSearchMock).toHaveBeenCalledWith("test query");
  });

  test("displays the correct result count", () => {
    render(<SearchBar onSearch={() => {}} resultCount={10} />);

    expect(screen.getByText(/10 results/i)).toBeInTheDocument();
  });
});
