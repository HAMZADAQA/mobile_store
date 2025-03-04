import { useState, useEffect } from "react";
import { Product } from "../types/types";

export const useProductUIState = (product: Product | null) => {
  const [currentImage, setCurrentImage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (product) {
      setCurrentImage(
        product.imageUrl || product.colorOptions?.[0]?.imageUrl || ""
      );
      setPrice(product.basePrice);
      setSelectedColor("");
      setSelectedStorage("");
      setSimilarProducts((prev) =>
        prev.length > 0 ? prev : product.similarProducts || []
      );
    }
  }, [product]);

  return {
    currentImage,
    setCurrentImage,
    price,
    setPrice,
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    similarProducts,
  };
};
