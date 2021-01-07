import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloudTwoToneIcon from "@material-ui/icons/CloudTwoTone";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow, faWater } from "@fortawesome/free-solid-svg-icons";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  // Width of the modal that appears at bottom of screen for mobile devices
  drawerPaperMobile: {
    width: "100%",
  },
  // Width of the modal that appears at the left of screen for desktop
  drawerPaperDesktop: {
    width: "25%",
    zIndex: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
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
    fontSize: "0.7em",
    fontWeight: "bold",
  },
}));

function ForecastDisplay(props) {
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
    let feet = Math.round(meters*3.281);
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

  // Actual content within our drawer
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button key="currentWeather ">
          <ListItemIcon>
            {" "}
            <CloudTwoToneIcon />{" "}
          </ListItemIcon>
          <ListItemText primary="Current Weather" />
        </ListItem>
        <ListItem>
          <Grid
            container
            xs={12}
            spacing={1}
            // justify="space-evenly"
            // alignItems="center"
          >
            {/* ====================================================================================== */}
            {/* weather */}
            {/* ====================================================================================== */}{" "}
            <Grid
              item
              xs={4}
            >
              <Grid container xs={12}  id="weatherDetails"
>
                <Grid
                  item
                  xs={6}
                >
                    <img id="wicon" src={iconUrl} alt="Weather icon" />
                </Grid>
                <Grid item xs={6} >
                  <Paper className={classes.paper}>
                    <Typography className={classes.typ}>
                      {kelvinToFahrenheit(currentWeatherData.temp)}°
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} >
                  <Paper className={classes.paper}>
                    <Typography className={classes.typ} style={{ marginTop: "26px"}}>
                      Feels Like{" "}
                      {kelvinToFahrenheit(currentWeatherData.feelsLike)}°
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            {/* ====================================================================================== */}
            {/* Wind */}
            {/* ====================================================================================== */}
            <Grid
              item
              xs={4}
            >
              <Grid container xs={12} >
                <Grid item xs={6} >
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
                <Grid item xs={6} >
                  <Paper className={classes.paper}>
                    <Typography className={classes.typ}>
                      {mpsToMph(currentWeatherData.windSpeed)}mph
                    </Typography>
                    <Typography className={classes.typ}>
                      {degToCompass(currentWeatherData.windDirection)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} >
                  <Paper className={classes.paper}>
                    <Typography className={classes.typ}>
                      Gusts up to {mpsToMph(currentWeatherData.windGust)}mph
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            {/* maritime grid item */}
            <Grid
              item
              xs={4}
            >
              <Grid
                container
                xs={12}
              >
                <Grid item xs={6} >
                  <Paper className={classes.paper}>
                    <FontAwesomeIcon
                      icon={faWater}
                      size="2x"
                      style={{ color: "cyan" }}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={6} >
                  <Paper className={classes.paper}>
                    <Typography className={classes.typ}>
                      {celsiusToFahrenheit(maritimeData.waterTemp)}°
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} >
                  <Paper className={classes.paper}>
                    <Typography className={classes.typ} style={{ marginTop: "30px"}}>
                      {metersToFeet(maritimeData.waveHeight)} feet
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid container xs={12} spacing={1} justify="center"  direction="row"> */}

          {/* ====================================================================================== */}
          {/* weather */}
          {/* ====================================================================================== */}
          {/* 
            <Grid item xs={4}  id="weatherDetails" style={{alignSelf: "center"}}>
              <Grid container className={classes.gridItems} >
                <Grid item xs={6} spacing={1} direction="column">
                  <Paper className={classes.paper} elevation={0} >
                    <img id="wicon" src={iconUrl} alt="Weather icon" />
                  </Paper>
                </Grid>
                <Grid item xs={6} spacing={1} direction="column">
                  <Paper className={classes.paper} style={{ fontSize: "1em" }}>
                    {kelvinToFahrenheit(currentWeatherData.temp)}°
                  </Paper>
                </Grid>
                <Grid item xs={12} spacing={1} direction="column">
                  <Paper className={classes.paper}>
                      Feels Like{" "}{kelvinToFahrenheit(currentWeatherData.feelsLike)}°
                  </Paper>
                </Grid>
              </Grid>
            </Grid> */}
          {/* ====================================================================================== */}
          {/* Wind */}
          {/* ====================================================================================== */}
          {/* 
            <Grid item xs={4}  id="windDetails">
              <Grid container className={classes.gridItems}>
                <Grid item xs={6} spacing={1} direction="column">
                  <Paper className={classes.paper}> */}
          {/* we subtract 45 degrees from the total angle to correctly align the arrow in our icon with the true angle position*/}
          {/* <FontAwesomeIcon icon={faLocationArrow} size="2x" style={{ transform: `rotate(${currentWeatherData.windDirection-45}deg)`}}/>
                  </Paper>
                </Grid>
                <Grid item xs={6} spacing={1} direction="column">
                  <Paper className={classes.paper} style={{ fontSize: "1em" }}>
                    {mpsToMph(currentWeatherData.windSpeed)}mph
                  </Paper>
                  <Paper className={classes.paper} style={{ fontSize: "1em" }}>
                    {degToCompass(currentWeatherData.windDirection)}
                  </Paper>
                </Grid>
                <Grid item xs={12} spacing={1} direction="column">
                  <Paper className={classes.paper} style={{ marginTop: "14px"}}>
                    Gusts up to {mpsToMph(currentWeatherData.windGust)}mph
                  </Paper>
                </Grid>
              </Grid>
            </Grid> */}
          {/* ====================================================================================== */}
          {/* Waves */}
          {/* ====================================================================================== */}
          {/* <Grid item xs={4}  id="waveDetails">
              <Grid container className={classes.gridItems}>
                <Grid item xs={6} spacing={1} direction="column">
                  <Paper className={classes.paper}>
                    <FontAwesomeIcon icon={faWater} size="2x" style={{ color: "cyan"}}/>
                  </Paper>
                </Grid>
                <Grid item xs={6} spacing={1} direction="column">
                  <Paper className={classes.paper} style={{ fontSize: "1em" }}>
                      {celsiusToFahrenheit(maritimeData.waterTemp)}°
                  </Paper>
                </Grid>
                <Grid item xs={12} spacing={1} direction="column">
                  <Paper className={classes.paper} style={{ marginTop: "28px"}}>
                      Feels Like {kelvinToFahrenheit(currentWeatherData.feelsLike)}°
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}

          {/* attempt at adding a new row */}

          {/* <Grid container xs={12} spacing={1} justify="center"  direction="row">
            <Grid item xs={12} spacing={1} direction="column">
              <Paper className={classes.paper}>
                  Feels Like{" "}{kelvinToFahrenheit(currentWeatherData.feelsLike)}°
              </Paper>
            </Grid>

            <Grid item xs={12} spacing={1} direction="column">
              <Paper className={classes.paper} style={{ marginTop: "14px"}}>
                Gusts up to {mpsToMph(currentWeatherData.windGust)}mph
              </Paper>
            </Grid>      

            <Grid item xs={12} spacing={1} direction="column">
              <Paper className={classes.paper} style={{ marginTop: "28px"}}>
                Feels Like {kelvinToFahrenheit(currentWeatherData.feelsLike)}°
              </Paper>
            </Grid>     
          </Grid>  */}
        </ListItem>
      </List>
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
      <Divider />
      <List>
        <ListItem button>
          <Grid
            container
            xs={12}
            spacing={1}
            justify="space-evenly"
            alignItems="center"
            style={{ backgroundColor: "red" }}
          >
            {/* weather grid item */}
            <Grid
              item
              xs={4}
              style={{ backgroundColor: "yellow", textAlign: "center" }}
            >
              <Grid container xs={12} style={{ backgroundColor: "orange" }}>
                <Grid item xs={6} style={{ backgroundColor: "green" }}>
                  <Typography className={classes.typ}>6</Typography>
                </Grid>
                <Grid item xs={6} style={{ backgroundColor: "green" }}>
                  <Typography className={classes.typ}>6</Typography>
                </Grid>
                <Grid item xs={12} style={{ backgroundColor: "green" }}>
                  <Typography className={classes.typ}>12</Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* wind grid item */}
            <Grid
              item
              xs={4}
              style={{ backgroundColor: "yellow", textAlign: "center" }}
            >
              <Grid container xs={12} style={{ backgroundColor: "orange" }}>
                <Grid item xs={6} style={{ backgroundColor: "green" }}>
                  <Typography className={classes.typ}>6</Typography>
                </Grid>
                <Grid item xs={6} style={{ backgroundColor: "green" }}>
                  <Typography className={classes.typ}>6</Typography>
                </Grid>
                <Grid item xs={12} style={{ backgroundColor: "green" }}>
                  <Typography className={classes.typ}>12</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* maritime grid item */}
            <Grid
              item
              xs={4}
              style={{ backgroundColor: "yellow", textAlign: "center" }}
            >
              <Grid container xs={12} style={{ backgroundColor: "orange" }}>
                <Grid item xs={6} style={{ backgroundColor: "green" }}>
                  <Typography className={classes.typ}>6</Typography>
                </Grid>
                <Grid item xs={6} style={{ backgroundColor: "green" }}>
                  <Typography className={classes.typ}>6</Typography>
                </Grid>
                <Grid item xs={12} style={{ backgroundColor: "green" }}>
                  <Typography className={classes.typ}>12</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={"bottom"}
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaperMobile,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        {/* Hidden component with attribute of mdDown, in this case, prevents our permanent drawer model from appearing on the left hand side for any device below desktop size screens */}
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaperDesktop,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

export default ForecastDisplay;
