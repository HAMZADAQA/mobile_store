import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { StoreContext } from "../../context/CartContext";

const Cart: React.FC = () => {
  const cartContext = useContext(StoreContext);
  if (!cartContext) return null;

  const { cart: items, removeItem, total, clearCart } = cartContext;

  const handlePay = () => {
    clearCart();
  };

  return (
    <div className="cart">
      <h2>Cart ({items.length})</h2>

      {items.length === 0 ? (
        <div className="cart__empty">
          <Link to="/" className="btn-continue">
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="cart__content">
          <div className="cart__items">
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart__item">
                <img
                  src={item.image ? item.image : item.product.imageUrl}
                  alt={item.product.name}
                  className="cart__item-image"
                />
                <div className="cart__item-info">
                  <p className="product__name">{item.product.name}</p>
                  <p>
                    {item.selectedStorage} | {item.selectedColor}
                  </p>
                  <p className="product__price">{item.price} EUR</p>
                  <button
                    className="btn-remove"
                    onClick={() => removeItem(index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart__footer">
            <div className="footer-desktop">
              <Link to="/" className="btn-continue">
                Continuar comprando
              </Link>
              <div className="cart__pay-section">
                <span className="cart__total-label">TOTAL</span>
                <span className="cart__total-value">{total} EUR</span>
                <button className="pay-btn" onClick={handlePay}>
                  pay
                </button>
              </div>
            </div>

            <div className="footer-mobile">
              <div className="mobile-column">
                <span className="cart__total-label">TOTAL</span>
                <Link to="/" className="btn-continue">
                  Continuar comprando
                </Link>
              </div>
              <div className="mobile-column">
                <span className="cart__total-value">{total} EUR</span>
                <button className="pay-btn" onClick={handlePay}>
                  pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
