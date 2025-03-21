const express = require("express");
const weatherRouter = express.Router();
const { getWeather } = require("../controller/weatherController");

weatherRouter.get("/weather", getWeather);

module.exports = weatherRouter;