const knockKnockJokes = require('knock-knock-jokes');
const oneLinerJoke = require('one-liner-joke');

function getRandomJoke() {
  let joke1 = knockKnockJokes();
  let joke2 = oneLinerJoke.getRandomJoke().body;
  let randomNumber = Math.round(Math.random() * 1);

  let jokes = [
    joke1,
    joke2
  ]

  console.log(jokes[randomNumber]);

}

module.exports = getRandomJoke;
