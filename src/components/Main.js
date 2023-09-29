import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { apikey, base, url, geoApioptions } from "./Apikey";
import "../App.css";

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
  const [search, setSearch] = useState(null);

  async function loadedOptions(inputvalue) {
    // try {
    //   const response = await fetch(url, options);
    //   const result = await response.text();
    //   console.log(result);
    // } catch (error) {
    //   console.error(error);
    // }

    const call = await fetch(
      `${url}?minPopulation=100000&namePrefix=${inputvalue}`,
      geoApioptions
    );

    const call_response = await call.json();
    console.log(call_response);

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

  function handleSearch(searchData) {
    setSearch(searchData);
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
