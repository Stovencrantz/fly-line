import axios from "axios";

export default {
  getForecast: async function (coords) {
    console.log("sending forecast request from front end to backend");
    console.log(
      `https://api.stormglass.io/forecast?lat=${coords.lat}&lng=${coords.lng}`
    );
    // axios.get(`https://api.stormglass.io/forecast?lat=${coords.lat}&lng=${coords.lng}`, {
    //     headers: {
    //         Authorization: 'f6ec6fb6-39c0-11eb-9138-0242ac130002-f6ec702e-39c0-11eb-9138-0242ac130002',
    //     },
    // })
    // .then(results => console.log(results))
    // .catch(error => console.log(error))
    
        const response = await axios.get("api/weather/" + `${coords.lng}/${coords.lat}`);
        return response.data;
  },
};
