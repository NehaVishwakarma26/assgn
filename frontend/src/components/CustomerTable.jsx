import React from "react";
import CustomerRow from "./CustomerRow";

const CustomerTable = ({ customers, containerRef, onScroll, loading }) => (
  <div
    ref={containerRef}
    onScroll={onScroll}
    style={{ height: "600px", overflowY: "auto", border: "1px solid #ddd" }}
  >
    {/* Table Header */}
    <div
      style={{
        display: "flex",
        fontWeight: "bold",
        padding: "0 10px",
        borderBottom: "2px solid #000",
        alignItems: "center",
      }}
    >
      <div style={{ width: "40px" }}><input type="checkbox" /></div>
      <div style={{ flex: 1 }}>Customer</div>
      <div style={{ flex: 1 }}>Score</div>
      <div style={{ flex: 1 }}>Email</div>
      <div style={{ flex: 1 }}>Last message sent at</div>
      <div style={{ flex: 1 }}>Added By</div>
    </div>

    {customers.map((customer, index) => (
      <CustomerRow key={index} customer={customer} />
    ))}

    {loading && (
      <div style={{ padding: "10px", textAlign: "center" }}>Loading more...</div>
    )}
  </div>
);

export default CustomerTable;
