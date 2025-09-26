// src/components/CustomersTable.jsx
import React, { useState, useMemo } from "react";
import "../styles.css";

const ROW_HEIGHT = 50;
const TABLE_HEIGHT = 600;

const CustomersTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <div style={{ height: TABLE_HEIGHT, overflowY: "auto" }}>
      {/* Table header */}
      <div
        className="table-header"
        style={{
          display: "grid",
          gridTemplateColumns: "50px 50px 200px 250px 150px 100px",
          background: "#eee",
          position: "sticky",
          top: 0,
          zIndex: 1,
          padding: "0 10px",
        }}
      >
        <div onClick={() => handleSort("id")}>ID</div>
        <div>Avatar</div>
        <div onClick={() => handleSort("name")}>Name</div>
        <div onClick={() => handleSort("email")}>Email</div>
        <div onClick={() => handleSort("phone")}>Phone</div>
        <div onClick={() => handleSort("score")}>Score</div>
      </div>

      {/* Table rows */}
      {sortedData.map((row) => (
        <div
          key={row.id}
          style={{
            display: "grid",
            gridTemplateColumns: "50px 50px 200px 250px 150px 100px",
            alignItems: "center",
            borderBottom: "1px solid #ccc",
            padding: "0 10px",
            height: ROW_HEIGHT,
          }}
          className="table-row"
        >
          <div>{row.id}</div>
          <div>
            <img
              src={row.avatar}
              alt={row.name}
              style={{ width: 30, height: 30, borderRadius: "50%" }}
            />
          </div>
          <div>{row.name}</div>
          <div>{row.email}</div>
          <div>{row.phone}</div>
          <div>{row.score}</div>
        </div>
      ))}
    </div>
  );
};

export default CustomersTable;
