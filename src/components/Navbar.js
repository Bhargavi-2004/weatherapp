import React from "react";
import "../App.css";

function Navbar() {
  return (
    <>
      <nav className="navbar-vertical">
        <div className="weather-name">Weather</div>
        <ul className="nav-ul">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Map
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Saved Location
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Calender
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;