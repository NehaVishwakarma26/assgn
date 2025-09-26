// src/components/CustomersTable.jsx
import React, { useState, useMemo } from "react";

const CustomersTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <style>{`
        .table-container {
          height: 600px;
          overflow-y: auto;
        }

        .table-header {
          display: grid;
          grid-template-columns: 40px 300px 250px 100px 200px 200px;
          background: #f9fafb;
          font-weight: 600;
          font-size: 14px;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 1;
          height: 50px;
          align-items: center;
          padding: 0 10px;
        }

        .table-header div {
          cursor: pointer;
          padding: 0 8px;
          white-space: nowrap;
        }

        .table-row {
          display: grid;
          grid-template-columns: 40px 300px 250px 100px 200px 200px;
          align-items: center;
          border-bottom: 1px solid #e5e7eb;
          height: 60px;
          padding: 0 10px;
          font-size: 14px;
          color: #111827;
          transition: background 0.2s ease;
        }

        .table-row:hover {
          background: #f3f4f6;
        }

        .customer-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .customer-cell img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #e5e7eb;
        }

        .customer-info {
          display: flex;
          flex-direction: column;
        }

        .customer-name {
          font-weight: 500;
        }

        .customer-phone {
          font-size: 12px;
          color: #6b7280;
        }
      `}</style>

      <div className="table-container">
        {/* Table header */}
        <div className="table-header">
          <div>
            <input type="checkbox" />
          </div>
          <div onClick={() => handleSort("name")}>Customer</div>
          <div onClick={() => handleSort("email")}>Email</div>
          <div onClick={() => handleSort("score")}>Score</div>
          <div onClick={() => handleSort("lastMessageAt")}>Last message sent at</div>
          <div onClick={() => handleSort("addedBy")}>Added by</div>
        </div>

        {/* Table rows */}
        {sortedData.map((row) => (
          <div key={row.id} className="table-row">
            <div>
              <input type="checkbox" />
            </div>
            <div className="customer-cell">
              <img src={row.avatar} alt={row.name} />
              <div className="customer-info">
                <span className="customer-name">{row.name}</span>
                <span className="customer-phone">{row.phone}</span>
              </div>
            </div>
            <div>{row.email}</div>
            <div>{row.score}</div>
            <div>{formatDate(row.lastMessageAt)}</div>
            <div>{row.addedBy}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomersTable;
