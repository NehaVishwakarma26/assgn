import React from "react";

const CustomerRow = ({ customer }) => (
  <div
    style={{
      display: "flex",
      padding: "0 10px",
      borderBottom: "1px solid #eee",
      height: "60px",
      alignItems: "center",
    }}
  >
    <div style={{ width: "40px" }}><input type="checkbox" /></div>
    <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
      <img
        src={customer.avatar}
        alt={customer.name}
        style={{ width: 36, height: 36, borderRadius: "50%", marginRight: "10px" }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontWeight: "bold" }}>{customer.name}</span>
        <span style={{ fontSize: "12px", color: "#888" }}>{customer.phone}</span>
      </div>
    </div>
    <div style={{ flex: 1 }}>{customer.score}</div>
    <div style={{ flex: 1 }}>{customer.email}</div>
    <div style={{ flex: 1 }}>
      {new Date(customer.lastMessageAt).toLocaleString()}
    </div>
    <div style={{ flex: 1 }}>{customer.addedBy}</div>
  </div>
);

export default CustomerRow;
