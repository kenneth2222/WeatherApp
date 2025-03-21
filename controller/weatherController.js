const axios = require("axios");
const weatherModel = require('../model/weather');
require('dotenv').config();
const API_KEY = process.env.WEATHER_API;






    exports.getWeather = async (req, res) => {
      try {
        const { city } = req.query;
        const units = "metric"; // Default to Celsius
        const info = { q: city, appid: API_KEY, units };
    
        if (!city) {
          return res.status(400).json({ error: "City name is required" });
        }

        console.log(API_KEY);
        // console.log(response);
        // Fetch weather data from OpenWeatherMap
        // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params: info });
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);    
        // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params: info });



        const { name, main, weather, wind } = response.data;
    
        // Prepare data for saving
        const weatherData = {
          cityName: name,
          temperature: main.temp,
          condition: weather[0].description,
          wind_speed: wind.speed,
        };
    
        // Save to database
        const newWeather = new weatherModel(weatherData);
        await newWeather.save();
    
        return res.status(200).json({
          message: "Weather data fetched successfully",
          data: {
            city: name,
            temperature: main.temp,
            condition: weather[0].description,
            wind_speed: wind.speed,
          },
        });
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return res.status(500).json({
          Message: `Failed to fetch weather data` + error.message,
        });
      }
    };
    
  
