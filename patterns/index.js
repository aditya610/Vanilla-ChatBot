 var patternDict = [
   {
     pattern : "\\b(?<greeting>hi|hello|hey|namaste)\\b",
     intent : "Hello"
   },
   {
     pattern : "\\b(bye|exit|ttyl|seeya|cya|gn)\\b",
     intent : "Bye"
   },
   {
     pattern : "(temp\\sin\\b(?<City>.+)|like\\sin\\s\\b(?<city>.+))",
     intent : "currentWeather"
   },
   {
     pattern : "\\b(joke||jokes)\\b",
     intent : "Joke"
   }
 ]

module.exports = patternDict;
