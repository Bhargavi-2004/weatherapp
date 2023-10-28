import React from "react";
import { map_api } from "./Apikey";

function Map(props) {
  const [location, setLocation] = React.useState({
    lat: 41.85,
    lng: -87.65,
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  // const url = `https://www.google.com/maps/embed/v1/place?q=${props.city},+${props.country}&key=${map_api}`;

  const url = `https://www.google.com/maps/embed/v1/view?zoom=14&center=${location.lat},${location.lng}&key=${map_api}`;

  return (
    <>
      <iframe
        style={{
          height: "100vh",
          width: "1500px",
          border: "0",
          marginLeft: "250px",
        }}
        frameborder="0"
        src={url}
      />
    </>
  );
}

export default Map;

// src="https://www.google.com/maps/embed/v1/place?q=Veraval,+Gujarat,+India&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
