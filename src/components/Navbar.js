import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar-vertical">
        <div className="weather-name">Weather</div>
        <ul className="nav-ul">
          <li className="nav-item">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/Map">Map</Link>
          </li>
          <li className="nav-item">
            <Link to="/SavedLocation">Saved Location</Link>
          </li>
          <li className="nav-item">
            <Link to="/Calender">Calender</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
