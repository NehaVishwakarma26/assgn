import React from "react";
import SearchInput from "./SearchInput";
import FilterDropdown from "./FilterDropdown";

const SearchFilterBar = ({ onSearch }) => (
  <div
    className="header-bar"
    style={{
      display: "flex",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      background: "#fff",
      zIndex: 10,
      padding: "5px 0",
    }}
  >
    <div className="search-container">
      <SearchInput onSearch={onSearch} />
    </div>
    <div className="filter-container">
      <FilterDropdown />
    </div>
  </div>
);

export default SearchFilterBar;
