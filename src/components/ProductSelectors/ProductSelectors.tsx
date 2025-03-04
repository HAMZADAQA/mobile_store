import React from "react";
import { Product } from "../../types/types";
import "./ProductSelectors.css";

interface ProductSelectorsProps {
  product: Product;
  selectedColor: string;
  selectedStorage: string;
  handleColorChange: (color: string) => void;
  handleStorageChange: (capacity: string) => void;
  hoveredColor: string | null;
  setHoveredColor: (color: string | null) => void;
}

const ProductSelectors: React.FC<ProductSelectorsProps> = ({
  product,
  selectedColor,
  selectedStorage,
  handleColorChange,
  handleStorageChange,
  hoveredColor,
  setHoveredColor,
}) => (
  <div className="detail__selectors">
    {product.storageOptions && product.storageOptions.length > 0 && (
      <div className="detail__storage">
        <h4>Storage - Choose your space</h4>
        <div className="detail__storage-options">
          {product.storageOptions.map((storage, index) => (
            <button
              key={`${storage.capacity}-${index}`}
              className={`detail__storage-btn ${
                selectedStorage === storage.capacity ? "active" : ""
              }`}
              onClick={() => handleStorageChange(storage.capacity)}
            >
              {storage.capacity}
            </button>
          ))}
        </div>
      </div>
    )}

    {product.colorOptions && product.colorOptions.length > 0 && (
      <div className="detail__color">
        <h4>Color - Pick your favorite</h4>
        <div className="detail__color-options">
          {product.colorOptions.map((color, index) => (
            <button
              key={`${color.name}-${index}`}
              className={`detail__color-swatch ${
                selectedColor === color.name ? "active" : ""
              }`}
              style={{ backgroundColor: color.hexCode }}
              onClick={() => handleColorChange(color.name)}
              onMouseEnter={() => setHoveredColor(color.name)}
              onMouseLeave={() => setHoveredColor(null)}
              title={color.name}
            />
          ))}
        </div>
        <p className="detail__selected-color">
          {hoveredColor || selectedColor || ""}
        </p>
      </div>
    )}
  </div>
);

export default ProductSelectors;
