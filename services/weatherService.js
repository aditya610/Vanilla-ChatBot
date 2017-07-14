'use strict';
const request = require('request');
const constants = require('../constants');

module.exports = {
  getWeather: (cityname, callback) => {
    request(
      constants.WEATHER_API_PREFIX_URL + encodeURIComponent(cityname),
      (error, response, body) => {
        if(error)
          console.log("Sorry, unable to fetch weather conditions. Please try again later");
        if (!error && response.statusCode === 200) {
          const weatherData = JSON.parse(body);
          let message = `${weatherData.weather[0].description}`
          message += `\nHumidity: ${weatherData.main.humidity}%\n`;
          const TempCelcius = (
            (weatherData.main.temp - constants.KELVIN_CELCIUS_OFFSET)
              .toFixed(2));
          const maxTempCelcius = (
            (weatherData.main.temp_max - constants.KELVIN_CELCIUS_OFFSET)
              .toFixed(2));
          const minTempCelcius = (
            (weatherData.main.temp_min - constants.KELVIN_CELCIUS_OFFSET)
              .toFixed(2));
          message += `Temperature: ${TempCelcius}C`;
          message += `\nMax Temperature: ${maxTempCelcius}C`;
          message += `\nMin Temperature: ${minTempCelcius}C`;
          callback(message);
        }
      }
    );
  }
};
