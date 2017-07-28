'use strict';
const request = require('request');
const constants = require('../constants');

let getNews = (callback) => {
  request(constants.NEWS_API_URL,
    (error,response,body) => {
      if(!error && response.statusCode === 200){
        let msg = '';
        let num = 1;
        let news = JSON.parse(body);
        news.articles.forEach( (article => {
          msg += `#${num} ${article.title}<br><br>`;
          num++;
        }));
        msg += `Powered By News Api<br>`;
        callback(msg);
      }
  })
}

module.exports = getNews;
