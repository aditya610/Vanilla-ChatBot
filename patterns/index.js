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
     pattern : "(temp\\sin\\b(?<City>.+)|weather\\s(like\\s)?in\\b(?<city>.+))",
     intent : "currentWeather"
   },
   {
     pattern : "\\b(joke|jokes)\\b",
     intent : "Joke"
   },
   {
     pattern : "\\bhelp\\b",
     intent : "Help"
   },
   {
     pattern : "Info\\b(?<place>.+)",
     intent : "placeInfo"
   },
   {
     pattern : "\\bquote\\b",
     intent : "Quote"
   },
   {
     pattern : "\\bdefine\\b(?<term>.+)",
     intent : "Define"
   }
 ]

module.exports = patternDict;
