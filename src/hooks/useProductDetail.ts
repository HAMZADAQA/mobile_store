import { useState, useEffect } from "react";
import { Product } from "../types/types";
import { getCache, setCache } from "../services/utils/cache";
import { getProductById } from "../services/api";

export const useProductDetail = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(() =>
    productId ? getCache<Product>(`product_${productId}`) : null
  );
  const [loading, setLoading] = useState<boolean>(() =>
    productId ? !getCache(`product_${productId}`) : false
  );
  const [lastLoadedProductId, setLastLoadedProductId] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!productId) return;
    if (productId === lastLoadedProductId) return;

    const loadProduct = async () => {
      const cached = getCache<Product>(`product_${productId}`);
      if (cached) {
        setProduct(cached);
      } else {
        setLoading(true);
        try {
          const data = await getProductById(productId);
          if (data) {
            setCache(`product_${productId}`, data);
            setProduct(data);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
      setLastLoadedProductId(productId);
    };

    loadProduct();
  }, [productId, lastLoadedProductId]);

  return { product, loading };
};
