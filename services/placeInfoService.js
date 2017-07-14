'use strict';
const request = require('request');
const constants = require('../constants');
var msg;
var placeId;

let getPlaceId = (place) => {
  msg = '';
  request(
    constants.PLACE_AUTOCOMPLETE_API_PREFIX_URL + encodeURIComponent(place),
    (error,response,body) => {
      if(!error && response.statusCode === 200){
        let data = JSON.parse(body);
        placeId = data.predictions[0].place_id;
      }else {
        console.log("Sorry, unable to fetch place details");
      }
    }
  )
}

let getPlaceDetails = (callback) => {
  request(
    constants.PLACE_DETAILS_API_PREFIX_URL + encodeURIComponent(placeId),
    (error,response,body) => {
      if(!error && response.statusCode === 200){
        let placeDetails = JSON.parse(body);
        var msg = ` <br># Address : ${placeDetails.result.formatted_address}`;
        msg += `<br> # Local Phone Number : ${placeDetails.result.formatted_phone_number || "NA"}`;
        msg += `<br> # International Phone Number : ${placeDetails.result.international_phone_number || "NA"}`;
        msg += `<br> # Coordinates ==><br>&nbsp;&nbsp;&nbsp;&nbsp;Latitude : ${placeDetails.result.geometry.location.lat}<br>&nbsp;&nbsp;&nbsp;&nbsp;Longitude : ${placeDetails.result.geometry.location.lng || "none"}`;
        msg += `<br> # Rating : ${placeDetails.result.rating || "NA"}<br>`;
        callback(msg);
      }else{
        msg = "Sorry, unable to fetch place details";
        callback(msg);
      }
    }
  )
}

module.exports =  {
  getPlaceId,
  getPlaceDetails
}
