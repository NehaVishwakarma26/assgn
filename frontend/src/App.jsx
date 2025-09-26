import React, { useState, useEffect } from 'react';
import { generateCustomers } from './userData/generateData';
import CustomersTable from './components/CustomersTable';
import SearchInput from './components/SearchInput';
import FilterDropdown from './components/FilterDropdown';
import './styles.css';

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
    // If search box is empty, show all customers
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
      <h1>Customers List</h1>
      <div className="header-bar">
        <SearchInput onSearch={handleSearch} />
        <FilterDropdown />
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
