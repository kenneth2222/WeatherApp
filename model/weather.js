const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
  {
    cityName: {
      type: String,
      trim: true, // Trims before validation
      required: true,
    },
    temperature: {
      type: String,
      trim: true,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    wind_speed: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Fix: Use a different variable name for the model
const Weather = mongoose.model("Weather", weatherSchema);
module.exports = Weather;
