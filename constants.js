
const KELVIN_CELCIUS_OFFSET = 273;
const WEATHER_API_KEY = '0477ec3cca45792dddd65c8e9f9c5fc1';
const WEATHER_API_PREFIX_URL = `http://api.openweathermap.org/data/2.5/weather?APPID=${WEATHER_API_KEY}&q=`;
const PLACE_API_KEY = 'AIzaSyAZcutqDagqRZqm8iPOeo5-RWvokaq2cqk';
const PLACE_AUTOCOMPLETE_API_PREFIX_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${PLACE_API_KEY}&input=`;
const PLACE_DETAILS_API_PREFIX_URL = `https://maps.googleapis.com/maps/api/place/details/json?key=${PLACE_API_KEY}&placeid=`;

module.exports = {
  WEATHER_API_PREFIX_URL,
  KELVIN_CELCIUS_OFFSET,
  PLACE_AUTOCOMPLETE_API_PREFIX_URL,
  PLACE_DETAILS_API_PREFIX_URL
}
