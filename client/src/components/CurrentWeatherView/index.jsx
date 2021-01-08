import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faWater } from "@fortawesome/free-solid-svg-icons";
import Typography from "@material-ui/core/Typography";

import { makeStyles, useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  gridItems: {
    alignItems: "center",
    height: "100%",
  },
  paper: {
    padding: theme.spacing(1),
    justifyContent: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    margin: "2px",
  },
  typ: {
    backgroundColor: "white",
    margin: "5px",
    textAlign: "center",
    fontSize: "1em",
    fontWeight: "bold",
  },
}));

export default function CurrentWeatherView(props) {

    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();

    const { currentWeatherData } = props.currentWeatherData;
    console.log("current weather from props", currentWeatherData);

    const iconCode = currentWeatherData.weatherIconCode;
    const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    console.log(iconUrl);

    const { maritimeData } = props.maritimeData;
    console.log("Current maritime data from props", maritimeData);


  function kelvinToFahrenheit(kelvin) {
    let fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
    return Math.round(fahrenheit);
  }
  function celsiusToFahrenheit(celsius) {
    let fahrenheit = celsius * (9 / 5) + 32;
    return Math.round(fahrenheit);
  }

  function metersToFeet(meters) {
    let feet = Math.round(meters * 3.281);
    return feet;
  }

  function degToCompass(num) {
    let val = Math.floor(num / 22.5 + 0.5);
    let arr = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  }

  function mpsToMph(metersPerSecond) {
    let milesPerHour = Math.floor(metersPerSecond * 2.237);
    return milesPerHour;
  }

  return (
    <Grid container xs={12} spacing={1}>
      {/* ====================================================================================== */}
      {/* weather */}
      {/* ====================================================================================== */}{" "}
      <Grid item xs={4}>
        <Grid container xs={12} id="weatherDetails">
          <Grid item xs={6}>
            <img id="wicon" src={iconUrl} alt="Weather icon" />
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography className={classes.typ}>
                {kelvinToFahrenheit(currentWeatherData.temp)}°
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.typ} style={{ marginTop: "26px" }}>
                Feels Like {kelvinToFahrenheit(currentWeatherData.feelsLike)}°
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {/* ====================================================================================== */}
      {/* Wind */}
      {/* ====================================================================================== */}
      <Grid item xs={4}>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <FontAwesomeIcon
                icon={faLocationArrow}
                size="2x"
                style={{
                  transform: `rotate(${
                    currentWeatherData.windDirection - 45
                  }deg)`,
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography className={classes.typ}>
                {mpsToMph(currentWeatherData.windSpeed)}mph
              </Typography>
              <Typography className={classes.typ}>
                {degToCompass(currentWeatherData.windDirection)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {currentWeatherData.windGust === undefined ? (
                <Typography className={classes.typ}>No gusts today</Typography>
              ) : (
                <Typography className={classes.typ}>
                  Gusts up to {mpsToMph(currentWeatherData.windGust)}mph
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      {/* maritime grid item */}
      <Grid item xs={4}>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <FontAwesomeIcon
                icon={faWater}
                size="2x"
                style={{ color: "cyan" }}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography className={classes.typ}>
                {celsiusToFahrenheit(maritimeData.waterTemp)}°
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.typ} style={{ marginTop: "30px" }}>
                Wave Height {<br />}
                {metersToFeet(maritimeData.waveHeight)} feet
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
