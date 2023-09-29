import React, { useEffect, useState } from "react";
import "../App.css";
import { base, apikey } from "./Apikey";

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
    setState({
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

    switch (state.weather) {
      case "Haze":
        setState({ ...state, icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        setState({ ...state,icon: "CLOUDY" });
        break;
      case "Rain":
        setState({ ...state,icon: "RAIN" });
        break;
      case "Snow":
        setState({ ...state,icon: "SNOW" });
        break;
      case "Dust":
        setState({ ...state,icon: "WIND" });
        break;
      case "Drizzle":
        setState({ ...state,icon: "SLEET" });
        break;
      case "Fog":
        setState({ ...state,icon: "FOG" });
        break;
      case "Smoke":
        setState({ ...state,icon: "FOG" });
        break;
      case "Tornado":
        setState({ ...state,icon: "WIND" });
        break;
      default:
        setState({ ...state,icon: "CLEAR_DAY" });
    }
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

  return (
    <>
      <div className="show-container">
        <nav className="weather-navbar">
          <ul className="showWeather-ul">
            <li className="nav item">
              <a className="overview">Today Overview</a>
            </li>
            <li className="nav item">{state.lon}</li>
            <li className="nav item">{state.lat}</li>
            <li className="nav item">{state.city}</li>
            <li className="nav item">{state.country}</li>
            <li className="nav item">{state.sunrise}</li>
            <li className="nav item">{state.sunset}</li>
            <li className="nav item">{state.temperatureC}</li>
            <li className="nav item">{state.temperatureF}</li>
            <li className="nav item">{state.wind}</li>
            <li className="nav item">{state.pressure}</li>
            <li className="nav item">{state.humidity}</li>
            <li className="nav item">{state.visibility}</li>
            <li className="nav item">{state.weather}</li>
            <li className="nav item">{state.icon}</li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default ShowWeather;
