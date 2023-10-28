import React, { useEffect, useState } from "react";
import { apikey, base, url, getoptions } from "./Apikey";
import "../App.css";
import ReactAnimatedWeather from "react-animated-weather";
import { UserData } from "./Data";
import Barchart from "./User";
import axios from "axios";
import Linechart from "./Temp";
import Search from "./Search";
import "./images/icons8-wind.gif";

function Main() {
  const [day_1, setDay_1] = useState({});
  const [day_2, setDay_2] = useState({});
  const [day_3, setDay_3] = useState({});
  const [day_4, setDay_4] = useState({});
  const [day_5, setDay_5] = useState({});

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

  const [userdata, setUserData] = useState({
    label: UserData.map((data) => data.year),
    datasets: [
      {
        label: "User Gained",
        data: UserData.map((data) => data.userGain),
      },
    ],
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

    setDay_1({
      temp: response.list[1].main.temp,
      day: response.list[1].dt_txt,
      w: response.list[0].weather[0].icon,
    });
    setDay_2({
      temp: response.list[2].main.temp,
      day: response.list[2].dt_txt,
      w: response.list[0].weather[0].icon,
    });
    setDay_3({
      temp: response.list[3].main.temp,
      day: response.list[3].dt_txt,
      w: response.list[0].weather[0].icon,
    });
    setDay_4({
      temp: response.list[4].main.temp,
      day: response.list[4].dt_txt,
      w: response.list[0].weather[0].icon,
    });
    setDay_5({
      temp: response.list[5].main.temp,
      day: response.list[5].dt_txt,
      w: response.list[0].weather[0].icon,
    });

    const weeklyTemperatureData = response.list.map((item) => item.main.temp);
    console.log(weeklyTemperatureData);

    setUserData({
      labels: [
        "after 3hr",
        "after 6hr",
        "after 9hr",
        "after 12hr",
        "after 15hr",
        "after 18hr",
      ],
      datasets: [
        {
          label: "Temperature",
          data: weeklyTemperatureData,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    });
  }

  // const forecast = [day_1, day_2, day_3, day_4, day_5];
  const forecast = [day_1, day_2];

  const option = {
    scales: {
      xAxes: [{ type: "category", labels: userdata.label }],
      yAxes: [
        { type: "linear", label: "Temperature", ticks: { stepSize: 10 } },
      ],
    },
  };

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

  // console.log("State after ending: ", state);

  return (
    <>
      <div className="main-container">
        <nav className="horizontal-nav">
          <div className="date-time">
            <p className="date">{dateBuilder(new Date())}</p>
            <p className="day">{dayBuilder(new Date())}</p>
          </div>

          <div className="search">
            <Search />
          </div>
        </nav>

        <div className="climate">
          <h3>Today Overview</h3>
          <div className="climate-cards">
            <div id="wind" className="card">
              <img src="./images/icons8-wind.gif" className="img" alt="" srcset="" />
              <p className="climate-p">
                Wind speed
                <h1>{state.wind} Km/h</h1>
              </p>
            </div>
            <div id="humidity" className="card">
              <img
                src="./images/humidity.png"
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
                src="./images/pressure.png"
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
            <h3>Hourly Temperature</h3>
            {/* <Barchart chartData={userdata} options={options} /> */}
            <Linechart chartData={userdata} options={option} />
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
          <div className="cont">
            <div className="detail-c">
              <div className="icon-c">
                {forecast.map((day) => (
                  <>
                    <p>Date: {day.day}</p>
                    <ReactAnimatedWeather
                      icon="10d"
                      color={defaults.color}
                      animate={defaults.animate}
                      size={defaults.size}
                    />
                    <p className="nav-item-temp-c">{day.temp}°C</p>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
