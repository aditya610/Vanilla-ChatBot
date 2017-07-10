'use strict';
const request = require('request');
const constants = require('../constants');


let getPlaceId = (place) => {
  request(
    constants.PLACE_AUTOCOMPLETE_API_PREFIX_URL + encodeURIComponent(place),
    (error,response,body) => {
      if(!error && response.statusCode === 200){
        let data = JSON.parse(body);
        var placeId = data.predictions[0].place_id;
        getPlaceDetails(placeId);
      }else {
        console.log("Sorry, unable to fetch place details");
      }
    }
  )
}

let getPlaceDetails = (placeId) => {
  request(
    constants.PLACE_DETAILS_API_PREFIX_URL + encodeURIComponent(placeId),
    (error,response,body) => {
      if(!error && response.statusCode === 200){
        let placeDetails = JSON.parse(body);
        var msg = ` # Address : ${placeDetails.result.formatted_address}`;
        msg += `\n # Local Phone Number : ${placeDetails.result.formatted_phone_number || "NA"}`;
        msg += `\n # International Phone Number : ${placeDetails.result.international_phone_number || "NA"}`;
        msg += `\n # Coordinates ==>\n\tLatitude : ${placeDetails.result.geometry.location.lat}\n\tLongitude : ${placeDetails.result.geometry.location.lng || "none"}`;
        msg += `\n # Rating : ${placeDetails.result.rating || "NA"}`;
        console.log(msg);
      }else{
        console.log("Sorry, unable to fetch place details");
      }
    }
  )
}

module.exports = getPlaceId;
