
const KELVIN_CELCIUS_OFFSET = 273;
const WEATHER_API_KEY = '0477ec3cca45792dddd65c8e9f9c5fc1';
const WEATHER_API_PREFIX_URL = `http://api.openweathermap.org/data/2.5/weather?APPID=${WEATHER_API_KEY}&q=`;

module.exports = {
  WEATHER_API_PREFIX_URL,
  KELVIN_CELCIUS_OFFSET
}
