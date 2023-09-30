import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { apikey, base } from "./Apikey";
import "../App.css";
import axios from "axios";

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayBuilder = (d) => {
  let day = days[d.getDay()];

  return `${day}`;
};

const dateBuilder = (d) => {
  let day = days[d.getDay()];
  let date = d.getDate();
  let year = d.getFullYear();
  let month = months[d.getMonth()];

  return `${month} ${date}, ${year}`;
};

function Main(props) {
  const [search, setSearch] = useState(null);

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

  async function loadedOptions(inputvalue) {
    const apicall = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=${apikey}`
    );
    const response = await apicall.json();
    console.log(response);

    getWeather(response.coords.lat, response.coords.lon);
    const options = [
      {
        label: response.city.name,
      },
    ];

    return {
      options,
    };
  }

  const [query, setQuery] = useState("");

  async function handleSearch(city) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          city != "[object Object]" ? city : query
        }&units=metric&APPID=${apikey}`
      )
      .then((response) => {
        console.log(response);
        getWeather(response.city.coord.lat, response.city.coord.lon);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="main-container">
        <nav className="horizontal-nav">
          <div className="date-time">
            <p className="date">{dateBuilder(new Date())}</p>
            <p className="day">{dayBuilder(new Date())}</p>
          </div>

          <div className="search">
            <input
              type="text"
              className="search-bar"
              placeholder="Search any city"
              onChange={(e) => {
                setQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              value={query}
            />
            {/* <AsyncPaginate
              loadOptions={loadedOptions}
              onChange={handleSearch}
            /> */}
          </div>
        </nav>
        <div className="climate">
          <h3>Today Overview</h3>
          <div className="climate-cards">
            <div id="wind" className="card">
              <p className="climate-p">
                Wind speed
                <h1>{state.wind} Km/h</h1>
              </p>
            </div>
            <div id="humidity" className="card">
              <p className="climate-p">
                Humidity
                <h1>{state.humidity} g.m-3</h1>
              </p>
            </div>
            <div id="pressure" className="card">
              <p className="climate-p">
                Pressure
                <h1>{state.pressure} hpa</h1>
              </p>
            </div>
            <div id="visibility" className="card">
              <p className="climate-p">
                Visibility
                <h1>{state.visibility} metres</h1>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
