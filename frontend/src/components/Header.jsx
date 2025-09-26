import React from "react";
import { FaCheckDouble } from "react-icons/fa";

const Header = ({ total }) => (
  <>
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

    <div
      className="all-customers"
      style={{ fontSize: "1.5rem", margin: "10px 0" }}
    >
      All Customers{" "}
      <span style={{ color: "green", fontWeight: "bold" }}>{total}</span>
    </div>
  </>
);

export default Header;
