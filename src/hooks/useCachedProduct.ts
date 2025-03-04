import { useState, useEffect } from "react";
import { Product } from "../types/types";
import { getCache, setCache } from "../services/utils/cache";
import { getProductById } from "../services/api";

const useCachedProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(() => {
    return getCache<Product>(`product_${productId}`) || null;
  });
  const [loading, setLoading] = useState<boolean>(!product);

  useEffect(() => {
    let isMounted = true;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProductById(productId);
        if (data && isMounted) {
          setCache(`product_${productId}`, data);
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (!product) {
      fetchProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [productId, product]);

  return { product, loading };
};

export default useCachedProduct;
