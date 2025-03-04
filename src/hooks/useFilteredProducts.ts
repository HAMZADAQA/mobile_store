import { useMemo } from "react";
import { Product } from "../types/types";

const useFilteredProducts = (products: Product[], query: string): Product[] => {
  const filteredProducts = useMemo(() => {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.brand.toLowerCase().includes(lowerQuery)
    );
  }, [products, query]);

  return filteredProducts;
};

export default useFilteredProducts;
