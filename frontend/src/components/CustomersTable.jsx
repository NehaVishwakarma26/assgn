import React, { useState, useEffect, useRef } from "react";
import { generateCustomers } from "./userData/generateData";
import SearchInput from "./components/SearchInput";
import FilterDropdown from "./components/FilterDropdown";
import { FaCheckDouble } from "react-icons/fa";
import "./styles.css";

const CHUNK_SIZE = 1000; // load 1000 rows at a time
const TOTAL_ROWS = 1_000_000;

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  // Generate 1M customers on mount
  useEffect(() => {
    const data = generateCustomers(TOTAL_ROWS);
    setCustomers(data);
    setFiltered(data);
    setDisplayed(data.slice(0, CHUNK_SIZE));
  }, []);

  // Handle search
  const handleSearch = (query) => {
    const lower = query.toLowerCase();
    if (!lower) {
      setFiltered(customers);
      setDisplayed(customers.slice(0, CHUNK_SIZE));
      return;
    }

    const filteredData = customers.filter(
      (c) =>
        c.name.toLowerCase().includes(lower) ||
        c.email.toLowerCase().includes(lower) ||
        c.phone.includes(lower)
    );
    setFiltered(filteredData);
    setDisplayed(filteredData.slice(0, CHUNK_SIZE));
  };

  // Handle scroll to load more
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setLoading(true);
      setTimeout(() => {
        const currentLength = displayed.length;
        const nextChunk = filtered.slice(currentLength, currentLength + CHUNK_SIZE);
        setDisplayed([...displayed, ...nextChunk]);
        setLoading(false);
      }, 100); // simulate async loading
    }
  };

  return (
    <div className="app-container">
      {/* Double tick icon */}
      <div
        className="double-tick"
        style={{
          fontSize: "2rem",
          color: "green",
          borderBottom: "1px black solid",
          padding: "5px",
        }}
      >
        <FaCheckDouble /> DoubleTick
      </div>

      {/* All Customers */}
      <div
        className="all-customers"
        style={{ fontSize: "1.5rem", margin: "10px 0" }}
      >
        All Customers{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>
          {filtered.length}
        </span>
      </div>

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
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="filter-container">
          <FilterDropdown />
        </div>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: "600px", overflowY: "auto", border: "1px solid #ddd" }}
      >
        {/* Table header */}
        <div
          style={{
            display: "flex",
            fontWeight: "bold",
            padding: "0 10px",
            borderBottom: "2px solid #000",
          }}
        >
          <div style={{ flex: 1 }}>Name</div>
          <div style={{ flex: 1 }}>Email</div>
          <div style={{ flex: 1 }}>Phone</div>
        </div>

        {/* Table rows */}
        {displayed.map((customer, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              padding: "0 10px",
              borderBottom: "1px solid #eee",
              height: "50px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>{customer.name}</div>
            <div style={{ flex: 1 }}>{customer.email}</div>
            <div style={{ flex: 1 }}>{customer.phone}</div>
          </div>
        ))}

        {loading && (
          <div style={{ padding: "10px", textAlign: "center" }}>Loading more...</div>
        )}
      </div>
    </div>
  );
};

export default App;
