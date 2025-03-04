import { useCallback } from "react";
import { getProductById } from "../services/api";
import { getCache, setCache } from "../services/utils/cache";

const usePrefetchProduct = () => {
  const prefetchProduct = useCallback(async (productId: string) => {
    const cacheKey = `product_${productId}`;
    const cachedProduct = getCache(cacheKey);
    if (!cachedProduct) {
      try {
        const data = await getProductById(productId);
        if (data) {
          setCache(cacheKey, data);
        }
      } catch (error) {
        console.error("Error prefetching product:", error);
      }
    }
  }, []);

  return prefetchProduct;
};

export default usePrefetchProduct;
