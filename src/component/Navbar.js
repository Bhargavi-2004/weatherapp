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
      pressure: response.list[0].pressure,
      description: response.list[0].weather[0].description,
      icon: response.list[0].weather[0].icon,
      weather: response.list[0].weather[0].main,
      time: response.list[0].dt_txt,
    });

    state.display = `https://openweathermap.org/img/wn/${state.icon}.png`;

    // const img = `https://openweathermap.org/img/wn/${state.icon}.png`
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
    size: "100%",
    animate: true,
  };

  return (
    <>
      {/* <!-- container --> */}

      <div class="container">
        {/* option feild */}
        <div className="option">
          <a href="/component/Map.js">Map</a>
          <a href="/component/Calender.js">Calender</a>
        </div>
        {/* option feild end */}

        {/* <!-- overview --> */}
        <div class="overview">
          {/* <!-- header --> */}
          <div class="header">
            <div class="setting">
              <a
                className="modal-btn"
                onClick={openmodal}
                onDoubleClick={closemodal}
              >
                <CIcon icon={cilHamburgerMenu} className="large-icon" />
              </a>
            </div>
            <div class="name">
              {state.city}, {state.country}
            </div>
            <div class="search">
              <CIcon icon={cilSearch} className="large-icon" />
            </div>
          </div>
          {/* <!-- header end --> */}

          {/* <!-- current-weather --> */}
          <div class="current-weather">
            <div class="text">{state.weather}</div>
            <div class="information">
              <div class="icon react-icon">
                <ReactAnimatedWeather
                  icon={state.icon}
                  color={defaults.color}
                  animate={defaults.animate}
                  size={defaults.size}
                />
              </div>
              <div class="temp">{state.temperatureC}°C</div>
            </div>
          </div>
          {/* <!-- current-weather end --> */}

          {/* <!-- details --> */}
          <div class="details">
            <div class="i" id="i1">
              {state.humidity}
            </div>
            <div class="i" id="i2">
              {state.pressure}
            </div>
            <div class="i" id="i3">
              {state.wind}
            </div>
            <div class="i" id="i4">
              {state.visibility}
            </div>
          </div>
          {/* <!-- details end --> */}
        </div>
        {/* <!-- overview end --> */}

        {/* <!-- display --> */}
        <div class="display"></div>
        {/* <!-- display end --> */}
      </div>
      {/* <!-- container end --> */}
      {/* https://codesandbox.io/p/sandbox/reactweatherproject-vud6ws?file=%2Fsrc%2FWeatherIcon.js%3A29%2C7-30%2C24 */}
    </>
  );
}

export default Navbar;
