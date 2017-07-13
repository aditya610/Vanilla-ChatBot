
const KELVIN_CELCIUS_OFFSET = 273;
const WEATHER_API_KEY = '0477ec3cca45792dddd65c8e9f9c5fc1';
const WEATHER_API_PREFIX_URL = `http://api.openweathermap.org/data/2.5/weather?APPID=${WEATHER_API_KEY}&q=`;
const PLACE_API_KEY = 'AIzaSyAZcutqDagqRZqm8iPOeo5-RWvokaq2cqk';
const PLACE_AUTOCOMPLETE_API_PREFIX_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${PLACE_API_KEY}&input=`;
const PLACE_DETAILS_API_PREFIX_URL = `https://maps.googleapis.com/maps/api/place/details/json?key=${PLACE_API_KEY}&placeid=`;
const DEFINE_API_KEY = `RnbZ2fEahbmshgLifQqsp4CaFjwmp1GenKRjsntOIpBGX311nw`;
const DEFINE_API_URL = `https://mashape-community-urban-dictionary.p.mashape.com/define?term=`;
const WIKI_API_PREFIX_URL = `https://en.wikipedia.org/w/api.php?action=opensearch&limit=1&namespace=0&format=json&search=`;

module.exports = {
  WEATHER_API_PREFIX_URL,
  KELVIN_CELCIUS_OFFSET,
  PLACE_AUTOCOMPLETE_API_PREFIX_URL,
  PLACE_DETAILS_API_PREFIX_URL,
  DEFINE_API_URL,
  DEFINE_API_KEY,
  WIKI_API_PREFIX_URL
}
