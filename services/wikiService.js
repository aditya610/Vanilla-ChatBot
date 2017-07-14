'use strict';
const request = require('request');
const constants = require('../constants');

let wikiSerch = (term, callback) => {
  request(
    constants.WIKI_API_PREFIX_URL + encodeURIComponent(term),
    (error,response,body) => {
      if(!error & response.statusCode === 200){
        let searchResult = JSON.parse(body);
        let msg = searchResult[2][0];
        callback(`\n<br>${msg}<br>\n`);
      } else {
        callback(`Sorry, unable to connect to the servers. Please try again later`);
      }
    }
  )
}

module.exports = wikiSerch;
