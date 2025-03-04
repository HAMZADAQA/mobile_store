import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import useFilteredProducts from "./useFilteredProducts";
import {
  mockProduct,
  mockCachedProduct,
  mockAPIProduct,
} from "../__mocks__/mockData";

const products = [mockProduct, mockCachedProduct, mockAPIProduct];

interface TestComponentProps {
  query: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ query }) => {
  const filteredProducts = useFilteredProducts(products, query);
  return (
    <ul>
      {filteredProducts.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
};

describe("useFilteredProducts hook (integration test)", () => {
  test("returns all products when query is empty", async () => {
    render(<TestComponent query="" />);
    await waitFor(() => {
      const items = screen.getAllByRole("listitem");
      expect(items.length).toBe(3);
    });
  });

  test("filters products by name (case-insensitive)", async () => {
    render(<TestComponent query="cached" />);
    await waitFor(() => {
      expect(screen.getByText("Cached S24 Ultra")).toBeInTheDocument();
    });
  });

  test("filters products by brand (case-insensitive)", async () => {
    render(<TestComponent query="samsung" />);
    await waitFor(() => {
      const items = screen.getAllByRole("listitem");
      expect(items.length).toBe(3);
    });
  });

  test("returns an empty array when no products match the query", async () => {
    render(<TestComponent query="nonexistent" />);
    await waitFor(() => {
      expect(screen.queryAllByRole("listitem").length).toBe(0);
    });
  });

  test("filters products by partial name or brand match", async () => {
    render(<TestComponent query="S24" />);
    await waitFor(() => {
      const items = screen.getAllByRole("listitem");
      expect(items.length).toBe(3);
    });
  });
});
