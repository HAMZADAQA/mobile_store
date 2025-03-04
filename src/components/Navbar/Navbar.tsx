import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/CartContext";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const cartContext = useContext(StoreContext);
  const cartCount = cartContext ? cartContext.cart.length : 0;

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <img src="/file.svg" style={{ width: 74, height: 44 }} />
        </Link>
      </div>
      <div className="navbar__cart">
        <Link to="/cart">
          <div className={`shopping-bag ${cartCount > 0 ? "filled" : ""}`}>
            <div className="bag-handle"></div>
          </div>
          <span className="navbar__cart-count">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
