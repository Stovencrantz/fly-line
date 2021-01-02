const express = require("express");
const router = express.Router();
const axios = require("axios");
// const User = require("../models/user");

router.get("/api/currentweather/:lng/:lat",  async (req, res) => {

  console.log("Request body: ", req.params);
  // const api_url = `https://api.stormglass.io/forecast?lat=${req.params.lat}&lng=${req.params.lng}`;
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.params.lat}&lon=${req.params.lng}&appid=${process.env.OPENWEATHERMAP_TOKEN}`;
    const response = await axios.get(api_url)
    .catch(error => console.log("weather response error: ", error))

    // console.log("response: ", response)
    // const json = await response.json();
    res.send(response.data)  
})

router.get("/api/fivedayforecast/:lng/:lat",  async (req, res) => {

  console.log("Request body: ", req.params);
  // const api_url = `https://api.stormglass.io/forecast?lat=${req.params.lat}&lng=${req.params.lng}`;
  const api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${req.params.lat}&lon=${req.params.lng}&appid=${process.env.OPENWEATHERMAP_TOKEN}`;
    const response = await axios.get(api_url)
    .catch(error => console.log("weather response error: ", error))

    // console.log("response: ", response)
    // const json = await response.json();
    res.send(response.data)  
})

router.get("/api/maritimeforecast/:lng/:lat",  async (req, res) => {

  console.log("Request body: ", req.params);
  const api_url = `https://api.stormglass.io/forecast?lat=${req.params.lat}&lng=${req.params.lng}&start=${new Date().toISOString()}`;

    const response = await axios.get(api_url, {
        headers: {
            Authorization: process.env.STORMGLASS_TOKEN
        },
    })
    .catch(error => console.log(error))

    // console.log("response: ", response.data)
    res.send(response.data)  
})

router.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  // const newUser = new User({
  //     name: name, email: email
  // })

  User.insertMany({ name: name, email: email })
    .then((data) => {
      console.log("Created account successfully");
      res.json({
        message: "Created account successfully",
      });
    })
    .catch((err) =>
      res.status(400).json({
        error: err,
        message: "Error creating account",
      })
    );
});

module.exports = router;
