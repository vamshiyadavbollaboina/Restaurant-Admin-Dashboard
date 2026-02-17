import React from "react";
import { FaUtensils, FaList, FaClipboardList } from "react-icons/fa";
import "./index.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo"><FaUtensils /> Eatoes Admin</h1>
      <ul className="nav-links">
        <li><a href="/menu"><FaList /> Menu</a></li>
        <li><a href="/orders"><FaClipboardList /> Orders</a></li>
      </ul>
    </nav>
  );
}
