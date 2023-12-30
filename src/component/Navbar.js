import React, { useState } from "react";
import "../css/App.css";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu, cilSearch } from "@coreui/icons";
import { useEffect } from "react";
import { base, apikey } from "../component/Apikey.js";
import ReactAnimatedWeather from "react-animated-weather";

function Navbar() {
  const [state, setState] = useState({
    lat: undefined,
    lon: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    wind: undefined,
    pressure: undefined,
    visibility: undefined,
    weather: undefined,
    time: undefined,
    display: undefined,
  });

  function openmodal() {
    var open = (document.querySelector(".option").style.display = "flex");
  }

  function closemodal() {
    var close = (document.querySelector(".option").style.display = "none");
  }

  function getPosition() {
    return new Promise((resolve, reject, option) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, option);
    });
  }

  async function getWeather(lat, lon) {
    const apicall = await fetch(`${base}lat=${lat}&lon=${lon}&appid=${apikey}`);
    const response = await apicall.json();
    console.log(response);

    setState({
      country: response.city.country,
      city: response.city.name,
      temperatureC: Math.round(response.list[0].main.temp),
      temperatureF: Math.round(response.list[0].main.temp * 1.8 + 32),
      visibility: response.list[0].visibility,
      wind: response.list[0].wind.speed,
      humidity: response.list[0].main.humidity,
      pressure: response.list[0].main.pressure,
      description: response.list[0].weather[0].description,
      icon: response.list[0].weather[0].icon,
      weather: response.list[0].weather[0].main,
      time: response.list[0].dt_txt,
    });
  }

  useEffect(() => {
    if (navigator.geolocation) {
      getPosition().then((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log(lat, lon);

        setTimeout(() => {
          getWeather(lat, lon);
        }, 10000);
      });
    }
  }, 1000);

  const defaults = {
    icon: "10d",
    color: "#1e1e1e",
    size: "80px",
    animate: true,
  };

  return (
    <>
      {/* <!-- container --> */}

      <div className="container">
        {/* option feild */}
        <div className="option">
          <a href="/component/Map.js">Map</a>
          <a href="/component/Calender.js">Calender</a>
        </div>
        {/* option feild end */}

        {/* <!-- overview --> */}
        <div className="overview">
          {/* <!-- header --> */}
          <div className="header">
            <div className="setting">
              <a
                className="modal-btn"
                onClick={openmodal}
                onDoubleClick={closemodal}
              >
                <CIcon icon={cilHamburgerMenu} className="large-icon" />
              </a>
            </div>
            <div className="name">
              {state.city}, {state.country}
            </div>
            <div className="search">
              <CIcon icon={cilSearch} className="large-icon" />
            </div>
          </div>
          {/* <!-- header end --> */}

          {/* <!-- current-weather --> */}
          <div className="current-weather">
            <div className="text">{state.weather}</div>
            <div className="information">
              <div className="icon react-icon">
                <ReactAnimatedWeather
                  icon={state.icon}
                  color={defaults.color}
                  animate={defaults.animate}
                  size={defaults.size}
                />
              </div>
              <div className="temp">{state.temperatureC}°C</div>
            </div>
          </div>
          {/* <!-- current-weather end --> */}

          {/* <!-- details --> */}
          <div className="details">
            <div className="i" id="i1">
              <p>{state.humidity}</p>
            </div>
            <div className="i" id="i2">
              <p>{state.pressure}</p>
            </div>
            <div className="i" id="i3">
              <p>{state.wind}</p>
            </div>
            <div className="i" id="i4">
              <p>{state.visibility}</p>
            </div>
          </div>
          {/* <!-- details end --> */}
        </div>
        {/* <!-- overview end --> */}

        {/* <!-- display --> */}
        <div className="display">
          
        </div>
        {/* <!-- display end --> */}
      </div>
      {/* <!-- container end --> */}
      
    </>
  );
}

export default Navbar;
