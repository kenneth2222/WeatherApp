const express = require("express");
const weatherRouter = express.Router();
const { getWeather, getWeatherData } = require("../controller/weatherController");

weatherRouter.get("/weather", getWeather);
weatherRouter.get("/weatherData", getWeatherData);

module.exports = weatherRouter;