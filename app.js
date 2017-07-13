'use strict';

const weather = require('./services/weatherService');
const joke = require('./services/jokeService');
const helpMsg = require('./services/helpService');
const placeDetails = require('./services/placeInfoService');
const quote = require('./services/quoteService');
const define = require('./services/defineService');
const wikiSearch = require('./services/wikiService');


const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
const matcher = require('./matcher');

rl.setPrompt("> ");
rl.prompt();

rl.on('line', userMsg => {
  matcher(userMsg, data => {
    switch (data.intent) {

      case 'Hello':
        console.log(`${data.entities.greeting}`);
        rl.prompt();
        break;

      case 'Bye':
        console.log("Seeya");
        process.exit(0);
        break;

      case 'currentWeather':
        console.log(`Checking weather conditions in ${data.entities.city || data.entities.City }....`);
        weather.getWeather(data.entities.city||data.entities.City);
        setTimeout(function(){
          rl.prompt();
        },4500);
          break;

      case 'Joke':
        joke();
        rl.prompt();
        break;

      case 'Help':
        console.log(helpMsg);
        rl.prompt();
        break;

      case 'placeInfo':
        console.log("Checking for place details...");
        placeDetails(data.entities.place);
        setTimeout(function(){
          rl.prompt();
        },5000);
        break;

      case 'Quote':
        quote();
        rl.prompt();
        break;

      case 'Define':
        define(data.entities.term);
        setTimeout(function(){
          rl.prompt();
        },5000);
        break;

      case 'Wiki':
        console.log(`Please wait, connecting to the servers...`);
        wikiSearch(data.entities.wikiTerm);
        setTimeout(function(){
          rl.prompt();
        },5000);
        break;

      default:
        console.log("I cant understand what you meant. You see I am a dumb ass robot.");
        console.log("In order to view help menu just type the keyword 'help'");
        rl.prompt();
    }
  })
} )
