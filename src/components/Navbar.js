import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar-vertical">
        <div className="weather-name">
          <Link className="weather-name" to="/">Weather</Link>
          </div>
        <ul className="nav-ul">
          <li className="nav-item">
            <Link className="nav-item" to="/">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-item" to="/Map">Map</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-item" to="/SavedLocation">Saved Location</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-item" to="/Calender">Calender</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
