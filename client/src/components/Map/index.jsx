import React from "react";
import "./style.css";
import mapboxgl from "mapbox-gl";
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

export default function Map() {

  // React-scripts uses dotenv library under the hood, so environment vars can be accessed // without need for the npm package
  // But all vars in the .env file must preface with REACT_APP_<Our var name here>

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
   
function successLocation(position) {
    console.log("position: ", position);
    setupMap([ position.coords.longitude, position.coords.latitude]);
}

function errorLocation(error) {
    console.log("Error: ", error);
    setupMap([ -2.24, 53.48 ]);
}

function setupMap(center) {
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: center,
        zoom: 12
      });

      map.addControl(
        new mapboxgl.GeolocateControl(), "bottom-right"
      )
      
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "top-right");

      var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,

      });

      map.addControl(directions,'top-left');
        
}


 navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });


  return (
    <div
      id="map"
      // style={{
      //   width: "100vw",
      //   height: "90vh",
      //   justifyContent: "center",
      //   alignContent: "center",
      // }}
    ></div>
  );
}
