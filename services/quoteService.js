const request = require('request');
const quote = require('motivation');

let getQuote = () => {
  let q = quote.get();
  let text = q.text;
  let author = q.author
  let msg = text;
      msg += `\n\t -${author}`;
  console.log(msg);
}

module.exports = getQuote;
