import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { apikey, base, url, getoptions } from "./Apikey";

function Search() {
  const [search, setSearch] = useState("");

  const loadedOptions = async (city) => {
    const search_apicall = await fetch(
      `${url}?namePrefix=${city}`,
      getoptions
    ).catch((err) => {
      console.log(err);
    });

    // https://maps.googleapis.com/maps/api/geocode/json?address=San%20Francisco&key=AIzaSyDFyzUbCFUUs-SL3oGWmUJytNc5iv8plYc

    const response = await search_apicall.json();

    console.log("response", response);

    return {
      options: response.map((response) => ({
        value: response.city,
        label: response.countryCode,
      })),
    };
  };

  async function handleSearch(city) {
    setSearch(city);
  }

  return (
    <AsyncPaginate
      loadOptions={loadedOptions}
      onChange={handleSearch}
      value={search}
    />
  );
}

export default Search;
