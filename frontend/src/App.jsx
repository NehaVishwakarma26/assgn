import React, { useState, useEffect } from "react";
import { generateCustomers } from "./userData/generateData";
import CustomersTable from "./components/CustomersTable";
import SearchInput from "./components/SearchInput";
import FilterDropdown from "./components/FilterDropdown";
import { FaCheckDouble } from "react-icons/fa"; // double tick icon
import "./styles.css";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // Use 1000 records for now to avoid freezing the browser
    const data = generateCustomers(10);
    setCustomers(data);
    setFiltered(data);
  }, []);

  const handleSearch = (query) => {
    const lower = query.toLowerCase();

    if (!lower) {
      setFiltered(customers);
      return;
    }

    setFiltered(
      customers.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.email.toLowerCase().includes(lower) ||
          c.phone.includes(lower)
      )
    );
  };

  return (
    <div className="app-container">
      {/* Double tick icon */}
      <div className="double-tick" style={{ fontSize: "2rem", color: "green",borderBottom:" 1px black solid",padding:0 }}>
       DoubleTick
      </div>

      {/* All Customers text with number */}
      <div className="all-customers" style={{ fontSize: "1.5rem", margin: "10px 0" }}>
        All Customers <span style={{ color: "green", fontWeight: "bold" }}>1230</span>
      </div>

      <div className="header-bar">
        <div className="search-container">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="filter-container">
          <FilterDropdown />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="no-results">No results found</div>
      ) : (
        <CustomersTable data={filtered} />
      )}
    </div>
  );
};

export default App;
