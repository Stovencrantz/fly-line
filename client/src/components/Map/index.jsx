import React, { useState, useEffect } from "react";
import "./style.css";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Fab } from "@material-ui/core";
import API from "../../utils/API";
import ForecastDisplay from "../../components/ForecastDisplay";

export default function Map() {
  // React-scripts uses dotenv library under the hood, so environment vars can be accessed // without need for the npm package
  // But all vars in the .env file must preface with REACT_APP_<Our var name here>

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  function successLocation(position) {
    console.log("position: ", position);
    setCoords({
      lng: position.coords.longitude,
      lat: position.coords.latitude,
      zoom: 12,
    });
    setupMap([position.coords.longitude, position.coords.latitude]);
  }

  function errorLocation(error) {
    console.log("Error: ", error);
    setCoords({
      lng: -2.24,
      lat: 53.48,
      zoom: 12,
    });
    setupMap([-2.24, 53.48]);
  }

  const [coords, setCoords] = useState({ lng: "", lat: "", zoom: "" });
  const [drawer, setDrawer] = useState(false);

  function setupMap(center) {
    var map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: 12,
    });

    map.addControl(new mapboxgl.GeolocateControl(), "bottom-right");

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");

    // const directions = new MapboxDirections({
    //   accessToken: mapboxgl.accessToken,
    // });
    // map.addControl(directions,'top-left');

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken, // Set the access token
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: true, // Do not use the default marker style
    });
    map.addControl(geocoder, "top-left");

    map.on("move", () => {
      setCoords({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });
  }, []);

  useEffect(() => {
    console.log("updatedCoords: ", coords);
  }, [coords]);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  async function handleWeatherBtnClick() {
    // setDrawer(true)
    handleDrawerToggle();
    console.log("acccessing coords data from weather btn", coords);
    const forecast = await API.getForecast(coords);
    console.log("Forecast: ", forecast);
    

  }

  return (
    <>
      <div
        id="map"
      ></div>
      <div className="map-overlay">
        {/* {drawer === true ? (
          <ForecastDisplay handleDrawerToggle={handleDrawerToggle} />
        ) : (
          <Fab
            variant="extended"
            color="primary"
            className="weatherBtn"
            onClick={() => handleWeatherBtnClick()}
          >
            Weather
          </Fab>
        )} */}

          <Fab
            variant="extended"
            color="primary"
            className="weatherBtn"
            onClick={() => handleWeatherBtnClick()}
          >
            Weather
          </Fab>
        <div className="sidebarStyle">
          <div>
            Longitude: {coords.lng} | Latitude: {coords.lat} | Zoom:{" "}
            {coords.zoom}
          </div>
        </div>

        <ForecastDisplay handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />

      </div>
    </>
  );
}
