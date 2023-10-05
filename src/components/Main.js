import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { apikey, base } from "./Apikey";
import "../App.css";
import ShowWeather from "./ShowWeather";

function Main() {
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

  async function loadedOptions(city) {
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
      temperatureC: response.main.temp,
      temperatureF: response.main.temp,
      country: response.sys.country,
      humidity: response.main.humidity,
      icon: "CLEAR_DAY",
      wind: response.wind.speed,
      pressure: response.main.pressure,
      visibility: response.visibility,
      weather: response.weather[0],
    });

    const options = [
      {
        label: response.city.name,
      },
    ];

    return {
      options,
    };
  }

  function handleSearch() {}

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
    color: "darkgrey",
    size: 35,
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
            />
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
          <div className="chart">
            <h1>Weekly Temperature</h1>
          </div>
        </div>

        <ShowWeather
          lat={state.lat}
          lon={state.lon}
          city={state.city}
          country={state.country}
          temperatureC={state.temperatureC}
          wind={state.wind}
          pressure={state.pressure}
          humidity={state.humidity}
          visibility={state.visibility}
          weather={state.weather}
          icon={state.icon}
          icons={defaults.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>
    </>
  );
}

export default Main;
