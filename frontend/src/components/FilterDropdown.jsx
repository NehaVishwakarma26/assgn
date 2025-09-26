// src/components/FilterDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../styles.css';

const FilterDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="filter-dropdown">
      <button onClick={() => setOpen(!open)}>Filters</button>
      {open && (
        <div className="filter-menu">
          <div>Filter 1</div>
          <div>Filter 2</div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
