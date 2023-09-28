import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { apikey, base } from "./Apikey";
import "../App.css";

async function loadedOptions() {
  const apicall = await fetch(`${base}lat=19.0760&lon=72.8777&appid=${apikey}
  `);
  const response = await apicall.json();
  console.log(response);

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

function Main() {
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
      </div>
    </>
  );
}

export default Main;
