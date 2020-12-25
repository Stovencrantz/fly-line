import axios from "axios";

export default {

  getCurrentWeather: async function (coords) {
    console.log("sending FiveDayForecast request from front end to backend");
    console.log(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}`
    );    
        const response = await axios.get("api/currentweather/" + `${coords.lng}/${coords.lat}`);
        return response.data;
  },

  getFiveDayForecast: async function (coords) {
    console.log("sending FiveDayForecast request from front end to backend");
    console.log(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}`
    );    
        const response = await axios.get("api/fivedayforecast/" + `${coords.lng}/${coords.lat}`);
        return response.data;
  },

  getMaritimeForecast: async function (coords) {
    console.log("sending forecast request from front end to backend");
    console.log(
      `https://api.stormglass.io/forecast?lat=${coords.lat}&lng=${coords.lng}`
    );    
        const response = await axios.get("api/maritimeforecast/" + `${coords.lng}/${coords.lat}`);
        return response.data;
  }
};
