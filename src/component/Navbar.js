import React, { useState } from "react";
import "../css/App.css";
import CIcon from "@coreui/icons-react";
import { cilHamburgerMenu, cilSearch } from "@coreui/icons";
import { useEffect } from "react";
import { base, apikey } from "../component/Apikey.js";
import ReactAnimatedWeather from "react-animated-weather";

function Navbar() {
  const [state, setState] = useState({
    lat: null,
    lon: null,
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
    display: undefined,
    time1: undefined,
    time2: undefined,
    time3: undefined,
    time4: undefined,
    d1: undefined,
    d2: undefined,
    d3: undefined,
    d4: undefined,
    icon1: "CLEAR_DAY",
    icon2: "CLEAR_DAY",
    icon3: "CLEAR_DAY",
    icon4: "CLEAR_DAY",
    day1: undefined,
    day2: undefined,
    day3: undefined,
    day4: undefined,
  });

  function openmodal() {
    var open = (document.querySelector(".option").style.display = "flex");
  }

  function closemodal() {
    var close = (document.querySelector(".option").style.display = "none");
  }

  function opensearch() {
    var open = (document.querySelector(".search-city").style.display = "block");
  }

  function closesearch() {
    var close = (document.querySelector(".search-city").style.display = "none");
  }

  function getPosition() {
    return new Promise((resolve, reject, option) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, option);
    });
  }

  const day = new Date();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  const cityInput = document.querySelector(".search-city input");
  if (cityInput) {
    cityInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const cityName = cityInput.value;
        city_parameter(cityName);
      }
    });
    cityInput.value = "";
  }

  async function city_parameter(cityName) {
    const city_call = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`
    );

    const response = await city_call.json();
    console.log(response);

    if (response) {
      getWeather(response.coord.lat, response.coord.lon);
    } else {
      alert("Latitude and longitude not yet available.");
    }
  }

  async function getWeather(lat, lon) {
    const apicall = await fetch(`${base}lat=${lat}&lon=${lon}&appid=${apikey}`);
    const response = await apicall.json();
    console.log(response);

    setState({
      country: response.city.country,
      city: response.city.name,
      temperatureC: Math.round(response.list[0].main.temp - 273.15),
      temperatureF: Math.round(
        (response.list[0].main.temp - 273.15) * 1.8 + 32
      ),
      visibility: response.list[0].visibility,
      wind: response.list[0].wind.speed,
      humidity: response.list[0].main.humidity,
      pressure: response.list[0].main.pressure,
      description: response.list[0].weather[0].description,
      icon: response.list[0].weather[0].icon,
      weather: response.list[0].weather[0].main,
      display: response.list[0].dt_txt,
      time1: response.list[4].dt_txt,
      time2: response.list[12].dt_txt,
      time3: response.list[24].dt_txt,
      time4: response.list[32].dt_txt,
      d1: Math.round(response.list[4].main.temp - 273.15),
      d2: Math.round(response.list[12].main.temp - 273.15),
      d3: Math.round(response.list[24].main.temp - 273.15),
      d4: Math.round(response.list[32].main.temp - 273.15),
      icon1: response.list[4].weather[0].icon,
      icon2: response.list[12].weather[0].icon,
      icon3: response.list[24].weather[0].icon,
      icon4: response.list[32].weather[0].icon,
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
  }, []);

  const defaults = {
    icon: "10d",
    color: "#1e1e1e",
    size: "50px",
    animate: true,
  };

  const defaultsSeg = {
    icon: "10d",
    color: "white",
    size: "40px",
    animate: true,
  };

  return (
    <>
      {/* <!-- container --> */}

      <div className="container">
        {/* option field */}
        <div className="option">
          <a href="/component/Map.js">Map</a>
          <a href="/component/Calender.js">Calender</a>
        </div>
        {/* option field end */}

        {/* serach field */}
        <div className="search-city">
          <input
            type="text"
            role="button"
            placeholder="Enter the name of city"
          />
        </div>
        {/* search field end */}

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
              <a
                className="modal-btn"
                onClick={opensearch}
                onDoubleClick={closesearch}
              >
                <CIcon icon={cilSearch} className="large-icon" />
              </a>
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
            <div className="today">
              {state.display} {days[new Date(state.display).getDay()]}
            </div>
          </div>
          {/* <!-- current-weather end --> */}

          {/* <!-- details --> */}
          <div className="details">
            <div className="i" id="i1">
              <p>{state.humidity}%</p>
            </div>
            <div className="i" id="i2">
              <p>{state.pressure}hPa</p>
            </div>
            <div className="i" id="i3">
              <p>{state.wind}m/s</p>
            </div>
            <div className="i" id="i4">
              <p>{state.visibility}m</p>
            </div>
          </div>
          {/* <!-- details end --> */}
        </div>
        {/* <!-- overview end --> */}

        {/* <!-- display --> */}
        <div className="display">
          <div className="display-segment" id="segment-1">
            <p>{days[new Date(state.time1).getDay()]}</p>
            <div className="display-icon">
              <ReactAnimatedWeather
                icon={state.icon1}
                color={defaultsSeg.color}
                size={defaultsSeg.size}
                animate={defaultsSeg.animate}
              />
            </div>
            <div className="segment-temp">{state.d1}°C</div>
          </div>
          <div className="display-segment" id="segment-2">
            <p>{days[new Date(state.time2).getDay()]}</p>
            <div className="display-icon">
              <ReactAnimatedWeather
                icon={state.icon2}
                color={defaultsSeg.color}
                size={defaultsSeg.size}
                animate={defaultsSeg.animate}
              />
            </div>
            <div className="segment-temp">{state.d2}°C</div>
          </div>
          <div className="display-segment" id="segment-3">
            <p>{days[new Date(state.time3).getDay()]}</p>
            <div className="display-icon">
              <ReactAnimatedWeather
                icon={state.icon3}
                color={defaultsSeg.color}
                size={defaultsSeg.size}
                animate={defaultsSeg.animate}
              />
            </div>
            <div className="segment-temp">{state.d3}°C</div>
          </div>
          <div className="display-segment" id="segment-4">
            <p>{days[new Date(state.time4).getDay()]}</p>
            <div className="display-icon">
              <ReactAnimatedWeather
                icon={state.icon4}
                color={defaultsSeg.color}
                size={defaultsSeg.size}
                animate={defaultsSeg.animate}
              />
            </div>
            <div className="segment-temp">{state.d4}°C</div>
          </div>
        </div>
        {/* <!-- display end --> */}
      </div>
      {/* <!-- container end --> */}
    </>
  );
}

export default Navbar;
