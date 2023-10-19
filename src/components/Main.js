import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { apikey, base, url, getoptions } from "./Apikey";
import "../App.css";
import ReactAnimatedWeather from "react-animated-weather";

function Main() {
  const [search, setSearch] = useState(" ");
  const [query, setQuery] = useState(" ");
  const [error, setError] = useState(" ");
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
      // alert("Access");
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async function getWeather(lat, lon) {
    const apicall = await fetch(`${base}lat=${lat}&lon=${lon}&appid=${apikey}`);
    const response = await apicall.json();
    console.log(response);

    setState({
      lat: response.city.coord.lat,
      lon: response.city.coord.lon,
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

    console.log("setState: ", state);
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

  async function handleSearch() {}

  async function loadedOptions(city) {
    const search_apicall = await fetch(`${url}?namePrefix=${city}`, getoptions)
      .then((response) => response.json())
      .then((response) => {
        setSearch(city.name);
        setState({
          lat: city.data[0].latitude,
          lon: city.data[0].longitude,
        });

        // console.log(response);

        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => {
        console.log(err);
        return { options: [] }; // Return an object with an empty options prop
      });

    const apicall =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}
`);

    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    const response = await apicall.json();
    console.log(response);

    setState({
      lat: response.coord.lat,
      lon: response.coord.lon,
      city: response.name,
      temperatureC: Math.round(response.main.temp),
      temperatureF: Math.round(response.main.temp * 1.8 + 32),
      country: response.sys.country,
      humidity: response.main.humidity,
      icon: response.weather[0].icon,
      wind: response.wind.speed,
      pressure: response.main.pressure,
      visibility: response.visibility,
      weather: response.weather[0].main,
      description: response.weather[0].description,
    });
    setSearch(state.city);
    return search_apicall;
  }

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

  const defaults = {
    icon: state.icon,
    color: "white",
    size: 50,
    animate: true,
  };

  return (
    <>
      <div className="main-container">
        <nav className="horizontal-nav">
          <div className="date-time">
            <p className="date">{dateBuilder(new Date())}</p>
            <p className="day">{dayBuilder(new Date())}</p>
          </div>

          <div className="search">
            <AsyncPaginate
              loadOptions={loadedOptions}
              onChange={handleSearch}
              value={search}
            />
          </div>
        </nav>

        <div className="climate">
          <h3>Today Overview</h3>
          <div className="climate-cards">
            <div id="wind" className="card">
              <img src="./images/wind.jpg" className="img" alt="" srcset="" />
              <p className="climate-p">
                Wind speed
                <h1>{state.wind} Km/h</h1>
              </p>
            </div>
            <div id="humidity" className="card">
              <img
                src="./images/humidity.jpg"
                className="img"
                alt=""
                srcset=""
              />
              <p className="climate-p">
                Humidity
                <h1>{state.humidity} g.m-3</h1>
              </p>
            </div>
            <div id="pressure" className="card">
              <img
                src="./images/pressure.jpg"
                className="img"
                alt=""
                srcset=""
              />

              <p className="climate-p">
                Pressure
                <h1>{state.pressure} hpa</h1>
              </p>
            </div>
            <div id="visibility" className="card">
              <img
                src="./images/visibility.jpg"
                className="img"
                alt=""
                srcset=""
              />

              <p className="climate-p">
                Visibility
                <h1>{state.visibility} metres</h1>
              </p>
            </div>
          </div>
          <div className="chart">
            <h3>Weekly Temperature</h3>
          </div>
        </div>

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
                  animate={defaults.animate}
                  size={defaults.size}
                />
                <p className="nav-item-temp">{state.temperatureC}°C</p>
              </div>

              <p className="detail-icon">{state.weather}</p>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Main;
