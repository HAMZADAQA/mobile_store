import React, { useContext, useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CartItem } from "../../types/types";
import { StoreContext } from "../../context/CartContext";
import { useProductDetail } from "../../hooks/useProductDetail";
import { useProductUIState } from "../../hooks/useProductUIState";
import ProductSelectors from "../../components/ProductSelectors/ProductSelectors";
import Specifications from "../../components/Specifications/Specifications";
import SwipeableProductsSlider from "../../components/SimilarProductsSlider/SimilarProductsSlider";
import useSmoothScrollOnParamChange from "../../hooks/useSmoothScrollOnParamChange";
import "./detail.css";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  useSmoothScrollOnParamChange(id || "");

  const cartContext = useContext(StoreContext);
  const { product, loading } = useProductDetail(id || "");
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const {
    currentImage,
    setCurrentImage,
    price,
    setPrice,
    selectedColor,
    setSelectedColor,
    selectedStorage,
    setSelectedStorage,
    similarProducts,
  } = useProductUIState(product);

  const handleAddToCart = useCallback(() => {
    if (!product || !selectedColor || !selectedStorage) return;
    const cartItem: CartItem = {
      id: product.id,
      product,
      selectedColor,
      selectedStorage,
      price,
      image: currentImage,
    };
    cartContext?.addItem(cartItem);
  }, [
    product,
    selectedColor,
    selectedStorage,
    price,
    currentImage,
    cartContext,
  ]);

  const handleColorChange = useCallback(
    (colorName: string) => {
      if (!product) return;
      setSelectedColor(colorName);
      const selectedColorObj = product.colorOptions?.find(
        (c) => c.name === colorName
      );
      if (selectedColorObj) {
        setCurrentImage(selectedColorObj.imageUrl);
      }
    },
    [product, setSelectedColor, setCurrentImage]
  );

  const handleStorageChange = useCallback(
    (capacity: string) => {
      if (!product) return;
      setSelectedStorage(capacity);
      const selectedOption = product.storageOptions?.find(
        (opt) => opt.capacity === capacity
      );
      setPrice(selectedOption ? selectedOption.price : product.basePrice || 0);
    },
    [product, setSelectedStorage, setPrice]
  );

  if (loading || !product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="detail">
      <div className="detail__back">
        <Link to="/" className="back-link">
          Back
        </Link>
      </div>

      <div className="detail__main">
        <div className="detail__image">
          {currentImage ? (
            <img
              style={{ width: 510, height: 630, objectFit: "contain" }}
              src={currentImage}
              alt={`${product.brand} ${product.name}`}
            />
          ) : (
            <div>No image available</div>
          )}
        </div>

        <div className="detail__info">
          <h2 className="detail__name">{product.name}</h2>
          <p className="detail__price">{price} EUR</p>

          <ProductSelectors
            product={product}
            selectedColor={selectedColor}
            selectedStorage={selectedStorage}
            hoveredColor={hoveredColor}
            handleColorChange={handleColorChange}
            handleStorageChange={handleStorageChange}
            setHoveredColor={setHoveredColor}
          />

          <button
            className="btn-add-cart"
            onClick={handleAddToCart}
            disabled={!selectedColor || !selectedStorage}
          >
            Añadir
          </button>
        </div>
      </div>

      <section className="detail__specifications">
        <Specifications product={product} />
      </section>

      {similarProducts.length > 0 && (
        <div className="detail__similar">
          <h3 className="similar__items">Similar Items</h3>
          <SwipeableProductsSlider products={similarProducts} />
        </div>
      )}
    </div>
  );
};

export default Detail;
