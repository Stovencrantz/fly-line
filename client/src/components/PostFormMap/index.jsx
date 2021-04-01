import React, {useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { makeStyles } from "@material-ui/core/styles";
import "./style.css"

const useStyles = makeStyles((Theme) => ({
    mapContainer: {
      position: "absolute",
      borderStyle: "solid",
      borderRadius: "5px",
      borderColor: "grey",
      borderWidth: "2px",
      width: "80%",
      height: "42%",
      // marginLeft: "auto",
      // marginRight: "auto",
      margin: "10px auto 0px auto",
      left: "0",
      right: "0",
      textAlign: "center"
    },
    map: {
      height: "100%",
    },
    mapboxglCtrlBottomLeft: {
      zIndex: "0"
    }
}))

export default function PostFormMap() {

    const classes = useStyles();

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const [coords, setCoords] = useState({ lng: "", lat: "", zoom: "" });

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
          container: "postFormMap",
          style: "mapbox://styles/mapbox/streets-v11",
          center: center,
          zoom: 12,
        });

        var marker = new mapboxgl.Marker({
          color: "#5ed1c8",
          draggable: true
        })
        .setLngLat(coords)
        .addTo(map)

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
    
        map.on("moveend", () => {
          setCoords({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2),
          });

          marker.setLngLat(map.getCenter())

        })

      }
    
      useEffect(() => {
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
          enableHighAccuracy: true,
        })
        
        
      }, []);
    
      useEffect(() => {
        const timeout = setTimeout(() => {
          console.log("We arrived at our destination", coords)      
        }, 5000);

        return () => clearTimeout(timeout);
      }, [coords]);
    

    return(
      <div className={classes.mapContainer}>
        <div id="postFormMap" className={classes.map}></div>
      </div>


    )
}