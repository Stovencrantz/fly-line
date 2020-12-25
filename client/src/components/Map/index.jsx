import React, { useState, useEffect } from "react";
import "./style.css";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Fab, Hidden } from "@material-ui/core";
import API from "../../utils/API";
import ForecastDisplay from "../../components/ForecastDisplay";

export default function Map() {
  // React-scripts uses dotenv library under the hood, so environment vars can be accessed // without need for the npm package
  // But all vars in the .env file must preface with REACT_APP_<Our var name here>

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const [coords, setCoords] = useState({ lng: "", lat: "", zoom: "" });
  const [drawer, setDrawer] = useState(false);

  function successLocation(position) {
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

// =============================================
// Code block for adding direction control to map. -- implement a button to bring up the direction Control
// =============================================
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

    // map.on("move", () => {
    //   setCoords({
    //     lng: map.getCenter().lng.toFixed(4),
    //     lat: map.getCenter().lat.toFixed(4),
    //     zoom: map.getZoom().toFixed(2),
    //   });
    //   // =============================================
    //   // After user moves to location, wait 2 seconds after click to ensure this is the users destination. Then run call to forecast API
    //   // =============================================
    //   // handleWeatherBtnClick()
    // });

    map.on("moveend", () => {
      setCoords({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    })
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    })
    
    
  }, []);

  useEffect(() => {
    console.log("We arrived at our destination", coords)      
    getWeatherAtMapCenter();

  }, [coords]);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

// Fetch forecast API at map center for Mobile devices after the user clicks the weather button
  async function handleWeatherBtnClick(event) {
    event.preventDefault();
    handleDrawerToggle();
    console.log("acccessing coords from mobile", coords);
    const forecast = await API.getForecast(coords);
    console.log("Forecast: ", forecast);
  }

// Fetch forecast API at map center for desktop after the user finishes navigating around the map
  async function getWeatherAtMapCenter() {
  
    const currentWeather = await API.getCurrentWeather(coords);
    console.log("CurrentWeather: ", currentWeather);

    const fiveDayForecast = await API.getFiveDayForecast(coords);
    console.log("fivedayforecast: ", fiveDayForecast);

    const maritimeForecast = await API.getMaritimeForecast(coords);
    console.log("Maritime Forecast: ", maritimeForecast);
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

{/* Hidden component with attribute of lgUp, in this case, prevents the display of our weather button which brings out our weather modal,
 from appearing on the bottom, for any device above medium size screens. I.e. this button will only appear on mobile devices */}
        <Hidden lgUp implementation="css">
          <Fab
            variant="extended"
            color="primary"
            className="weatherBtn"
            onClick={() => handleWeatherBtnClick()}
            >
            Weather
          </Fab>
        </Hidden>
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
