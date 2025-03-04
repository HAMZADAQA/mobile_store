import React, { ChangeEvent } from "react";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  resultCount: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, resultCount }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onSearch(e.target.value)
        }
        className="search-bar__input"
      />
      <div className="search-bar__result-count">{resultCount} results</div>
    </div>
  );
};

export default SearchBar;
