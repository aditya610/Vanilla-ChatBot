'use strict';
const request = require('request');
const constants = require('../constants');

let getDefination = (term,callback) => {
  request({
    url: `${constants.DEFINE_API_URL}${term}`,
      headers: {
        'X-Mashape-Key': constants.DEFINE_API_KEY
      },
      method: 'GET'
    },(error,response,body) => {
    if(!error && response.statusCode === 200){
      let msg = `\n`;
      const parsed = JSON.parse(body);
      let num = 0;
      parsed.list.forEach((listItem) => {
        num++;
        msg += `#${num}  ${listItem.definition}\n\n`;
      });
      callback(msg);
    } else {
      console.log(error);
    }
  })
}

module.exports = getDefination;
