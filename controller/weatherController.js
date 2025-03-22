const axios = require("axios");
const weatherModel = require('../model/weather');
require('dotenv').config();
const API_KEY = process.env.WEATHER_API;



    exports.getWeather = async (req, res) => {
      try {
        const { city } = req.query;
        const units = "metric"; 
        const info = { q: city, appid: API_KEY, units };
    
        if (!city) {
          return res.status(400).json({ error: "City name is required" });
        }

        // console.log(API_KEY);
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);    
   
        const { name, main, weather, wind, sys } = response.data;

       
    const weatherData = {
        cityName: `${name}, ${sys?.country}`,
        temperature: main.temp,
        condition: weather[0].description,
        wind_speed: wind.speed,
        humidity: main.humidity,
      };
      
    
        // Save to database
        const newWeather = new weatherModel(weatherData);
        await newWeather.save();
    
        return res.status(200).json({
          message: "Weather data fetched successfully",
          data: {
            city: weatherData.cityName,
            temperature: weatherData.temperature,
            condition: weatherData.condition,
            wind_speed: weatherData.wind_speed,
            humidity: weatherData.humidity,
          },
        });
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return res.status(500).json({
          Message: `Failed to fetch weather data` + error.message,
        });
      }
    };

    exports.getWeatherData = async (req, res) => {
      try {
        const weatherData = await weatherModel.find();
        return res.status(200).json({
          message: "Weather data fetched successfully",
          data: weatherData,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return res.status(500).json({
          message: "Failed to fetch weather data",
        });
      }
    };  
    
  
