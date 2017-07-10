'use strict';

const weather = require('./services/weatherService');
const joke = require('./services/jokeService');
const helpMsg = require('./services/helpService');


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
        //get data from api
        weather.getWeather(data.entities.city||data.entities.City);
        setTimeout(function(){
          rl.prompt();
        },3000);
          break;

      case 'Joke':
        joke();
        rl.prompt();
        break;

      case 'Help':
        console.log(helpMsg);
        rl.prompt();
        break;

      default:
        console.log("I cant understand what you meant. You see I am a dumb ass robot.");
        rl.prompt();
    }
  })
} )
