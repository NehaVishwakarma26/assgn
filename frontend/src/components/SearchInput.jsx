import React, { useState, useMemo } from "react";
import { debounce } from "../utils/debounce";
import { FiSearch } from "react-icons/fi"; // only search icon here

const SearchInput = ({ onSearch }) => {
  const [value, setValue] = useState("");

  const debouncedSearch = useMemo(() => debounce(onSearch, 250), [onSearch]);

  const handleChange = (e) => {
    const val = e.target.value;
    setValue(val);
    debouncedSearch(val);
  };

  return (
    <>
      <style>{`
        .search-container {
          position: relative;
          width: 100%;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 8px 12px 8px 36px; /* left padding for icon */
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: border 0.2s ease;
        }

        .search-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 1px #2563eb;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }
      `}</style>

      <div className="search-container">
        <FiSearch className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={value}
          onChange={handleChange}
          className="search-input"
        />
      </div>
    </>
  );
};

export default SearchInput;
