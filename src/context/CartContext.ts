import { createContext } from "react";
import { Product, CartItem } from "../types/types";

export interface StoreContextType {
  products: Product[];
  loading: boolean;
  fetchProducts: (query?: string) => Promise<void>;
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
  total: number;
}

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);
