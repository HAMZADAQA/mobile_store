import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Product, CartItem } from "../types/types";
import { getProducts } from "../services/api";
import { getCache, setCache } from "../services/utils/cache";

interface StoreContextType {
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

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(
    () => getCache<Product[]>("products") || []
  );
  const [loading, setLoading] = useState<boolean>(products.length === 0);

  const fetchProducts = useCallback(async (query = ""): Promise<void> => {
    setLoading(true);

    try {
      const data = await getProducts(query, 20, 0);
      setProducts([...data]);
      setCache("products", data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  const [cart, setCart] = useState<CartItem[]>(
    () => getCache<CartItem[]>("cart") || []
  );

  useEffect(() => {
    setCache("cart", cart);
  }, [cart]);

  const addItem = (item: CartItem) => setCart((prev) => [...prev, item]);

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        loading,
        fetchProducts,
        cart,
        addItem,
        removeItem,
        clearCart,
        total,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
