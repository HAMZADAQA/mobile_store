import React, { useContext, useState } from "react";
import PhoneCard from "../../components/PhoneCard/PhoneCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import useFilteredProducts from "../../hooks/useFilteredProducts";
import { StoreContext } from "../../context/CartContext";
import "./Home.css";

const Home: React.FC = () => {
  const { products, loading } = useContext(StoreContext)!;
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = useFilteredProducts(products, searchQuery);

  return (
    <div className="home">
      <SearchBar
        onSearch={setSearchQuery}
        resultCount={filteredProducts.length}
      />
      {loading && products.length === 0 ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="phone-grid">
          {filteredProducts.map((product, index) => (
            <PhoneCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
