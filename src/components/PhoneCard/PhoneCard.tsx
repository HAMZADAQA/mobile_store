import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types/types";
import usePrefetchProduct from "../../hooks/usePrefetchProduct";
import "./PhoneCard.css";

interface PhoneCardProps {
  product: Product;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ product }) => {
  const prefetchProduct = usePrefetchProduct();

  const handleHover = () => {
    prefetchProduct(product.id);
  };

  return (
    <div className="phone-card" onMouseEnter={handleHover}>
      <Link to={`/detail/${product.id}`}>
        <div className="phone-card__image-container">
          <img
            src={product.imageUrl}
            alt={`${product.brand} ${product.name}`}
            className="phone-card__image"
          />
        </div>
        <div className="phone-card__info">
          <div className="phone-card__brand-name">
            <p className="phone-card__brand">{product.brand}</p>
            <h3 className="phone-card__name">{product.name}</h3>
          </div>
          <p className="phone-card__price">{product.basePrice} EUR</p>
        </div>
      </Link>
    </div>
  );
};

export default PhoneCard;
