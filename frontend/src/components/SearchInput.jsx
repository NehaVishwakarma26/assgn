// src/components/SearchInput.jsx
import React, { useState, useMemo } from 'react';
import { debounce } from '../utils/debounce';
import '../styles.css';

const SearchInput = ({ onSearch }) => {
  const [value, setValue] = useState('');

  // Memoize debounced function so it doesn't recreate on every render
  const debouncedSearch = useMemo(() => debounce(onSearch, 250), [onSearch]);

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    debouncedSearch(val);
  };

  return (
    <input
      type="text"
      placeholder="Search by name, email, or phone..."
      value={value}
      onChange={handleChange}
      className="search-input"
    />
  );
};

export default SearchInput;
