const KnockKnockJokes = require('knock-knock-jokes');

module.exports = {
  getJoke: () => {
    console.log(KnockKnockJokes());
  }
}
