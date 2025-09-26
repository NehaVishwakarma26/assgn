import React, { useState, useEffect, useRef } from "react";
import { generateCustomers } from "./userData/generateData";
import Header from "./components/Header";
import SearchFilterBar from "./components/SearchFilterBar";
import CustomerTable from "./components/CustomerTable";

const CHUNK_SIZE = 1000;
const TOTAL_ROWS = 1_000_000;

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const data = generateCustomers(TOTAL_ROWS);
    setCustomers(data);
    setFiltered(data);
    setDisplayed(data.slice(0, CHUNK_SIZE));
  }, []);

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
      }, 100);
    }
  };

  return (
    <div className="app-container">
      <Header total={filtered.length} />
      <SearchFilterBar onSearch={handleSearch} />
      <CustomerTable
        customers={displayed}
        containerRef={containerRef}
        onScroll={handleScroll}
        loading={loading}
      />
    </div>
  );
};

export default App;
