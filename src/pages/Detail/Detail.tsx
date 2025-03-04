import React, { useContext, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { CartItem } from "../../types/types";
import { StoreContext } from "../../context/CartContext";
import { useProductDetail } from "../../hooks/useProductDetail";
import { useProductUIState } from "../../hooks/useProductUIState";
import ProductSelectors from "../../components/ProductSelectors/ProductSelectors";
import Specifications from "../../components/Specifications/Specifications";
import SwipeableProductsSlider from "../../components/SimilarProductsSlider/SimilarProductsSlider";
import "./detail.css";
import useScrollToTop from "../../hooks/useScrollToTop";

const Detail: React.FC = () => {
  useScrollToTop();

  const { id } = useParams<{ id: string }>();
  const cartContext = useContext(StoreContext);
  const { product, loading } = useProductDetail(id || "");

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

  if (loading || !product) {
    return <div className="loading">Loading...</div>;
  }

  const handleAddToCart = useCallback(() => {
    if (!selectedColor || !selectedStorage) return;
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
      setSelectedStorage(capacity);
      const selectedOption = product.storageOptions?.find(
        (opt) => opt.capacity === capacity
      );
      setPrice(selectedOption ? selectedOption.price : product.basePrice || 0);
    },
    [product, setSelectedStorage, setPrice]
  );

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
            hoveredColor={null}
            handleColorChange={handleColorChange}
            handleStorageChange={handleStorageChange}
            setHoveredColor={() => {}}
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
