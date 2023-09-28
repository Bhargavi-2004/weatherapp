import React from "react";
import "../App.css";

function ShowWeather() {
  return (
    <>
      <div className="show-container">
        <nav className="weather-navbar">
          <ul className="showWeather-ul">
            <li className="nav item">
              <a>Today Overvuew</a>
            </li>
            <li className="nav item"></li>
            <li className="nav item"></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default ShowWeather;
