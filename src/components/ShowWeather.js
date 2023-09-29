import React, { useEffect, useState } from "react";
import "../App.css";
import { base, apikey } from "./Apikey";
import ReactAnimatedWeather from "react-animated-weather";

function ShowWeather() {
  const [state, setState] = useState({
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
    wind: undefined,
    pressure: undefined,
    visibility: undefined,
    weather: undefined,
  });

  function getPosition(options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async function getWeather(lat, lon) {
    const apicall = await fetch(`${base}lat=${lat}&lon=${lon}&appid=${apikey}
  `);
    const response = await apicall.json();
    console.log(response);

    switch (state.weather) {
      case "Haze":
        setState({ ...state, icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        setState({ ...state, icon: "CLOUDY" });
        break;
      case "Rain":
        setState({ ...state, icon: "RAIN" });
        break;
      case "Snow":
        setState({ ...state, icon: "SNOW" });
        break;
      case "Dust":
        setState({ ...state, icon: "WIND" });
        break;
      case "Drizzle":
        setState({ ...state, icon: "SLEET" });
        break;
      case "Fog":
        setState({ ...state, icon: "FOG" });
        break;
      case "Smoke":
        setState({ ...state, icon: "FOG" });
        break;
      case "Tornado":
        setState({ ...state, icon: "WIND" });
        break;
      default:
        setState({ ...state, icon: "CLEAR_DAY" });
    }

    setState({
      ...state,
      lat: lat,
      lon: lon,
      city: response.city.name,
      country: response.city.country,
      sunrise: response.city.sunrise,
      sunset: response.city.sunset,
      temperatureC: Math.round(response.list[0].main.temp),
      temperatureF: Math.round(response.list[0].main.temp * 1.8 + 32),
      pressure: response.list[0].main.pressure,
      humidity: response.list[0].main.humidity,
      wind: response.list[0].wind.speed,
      visibility: response.list[0].visibility,
      weather: response.list[0].weather[0].main,
    });
  }

  useEffect(() => {
    if (navigator.geolocation) {
      getPosition()
        .then((position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          getWeather(26.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }
  }, []);

  setInterval(() => getWeather(state.lat, state.lon), 600000);

  const defaults = {
    icon: state.icon,
    color: "darkgrey",
    size: 35,
    animate: true,
  };

  return (
    <>
      <div className="show-container">
        <nav className="weather-navbar">
          <ul className="showWeather-ul">
            <li className="nav-item">
              <a className="overview">Today Overview</a>
            </li>
          </ul>
          <div className="city">
            <p className="nav-item-p">
              {state.city}-{state.country}
            </p>
          </div>
          <div className="detail">
            <div className="icon">
              <ReactAnimatedWeather
                icon={defaults.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              <p className="nav-item-temp">{state.temperatureC}°C</p>
            </div>

            <p className="detail-icon">{state.icon}</p>
          </div>
        </nav>
      </div>
    </>
  );
}

export default ShowWeather;