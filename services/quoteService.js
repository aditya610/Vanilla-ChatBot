const request = require('request');
const quote = require('motivation');

let getQuote = (callback) => {
  let q = quote.get();
  let text = q.text;
  let author = q.author
  let msg = text;
      msg += `\n\t<br> - <strong>${author}</strong>`;
  callback(msg);
}

module.exports = getQuote;
