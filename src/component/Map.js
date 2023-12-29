import React, { useState } from "react";
import "../css/Map.css";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";

function openmodal() {
  var open = (document.querySelector(".option").style.display = "flex");
}

function closemodal() {
  var close = (document.querySelector(".option").style.display = "none");
}

function Map() {
  const [location, setLocation] = useState({
    lat: "20.91",
    lon: "70.33",
  });

  const map_api = "AIzaSyDFyzUbCFUUs-SL3oGWmUJytNc5iv8plYc";

  const url = `https://www.google.com/maps/embed/v1/view?zoom=14&center=${location.lat},${location.lon}&key=${map_api}`;

  return (
    <>
      <div className="map-container">
        <div className="back">
          <a href="/">
            <CIcon icon={cilArrowLeft} className="large-icon" />
          </a>
          <p>Back to Homapage</p>
        </div>
        <iframe className="iFrame" frameborder="0" src={url} />
      </div>
    </>
  );
}

export default Map;
