'use strict';

//services
const weather = require('./services/weatherService');
const joke = require('./services/jokeService');
const helpMsg = require('./services/helpService');
const placeDetails = require('./services/placeInfoService');
const quote = require('./services/quoteService');
const define = require('./services/defineService');
const wikiSearch = require('./services/wikiService');


const matcher = require('./matcher');

let defaultBotMsg = "I cant understand what you meant. You see I am a dumb ass robot.<br>In order to view help menu just type the keyword 'help'"

var express       = require('express'),
    app           = express(),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local');

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var User  = require('./models/users');

mongoose.connect("mongodb://localhost/vanilla_chatbot");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set("view engine","ejs");

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "This is a secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var currentUser = '';


app.get("/",function(req,res){
  res.render("index");
});


//login logic
app.post("/login",passport.authenticate("local",{
  successRedirect: "/home",
  failureRedirect: "/login"
  }),function(req,res){
});


//signup logic
app.post("/signup",function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser,req.body.password,function(err,user){
      if(err){
        return res.redirect("/signup");
      }
      passport.authenticate("local")(req,res,function(){
        res.redirect("/home");
      })
  });
});

//logout
app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
});

//vanilla-chatbot
app.get("/home",function(req,res){
  currentUser = req.user.username;
  res.render("home");
});


io.on('connection', function(socket){

  console.log("user connected");

  socket.on('msgForBot', function(userMsg){

    matcher(userMsg, data => {
        switch (data.intent) {

          case 'Hello':
            socket.emit('postBotReply',data.entities.greeting);
            break;

            case 'Bye':
              socket.emit('postBotReply','Seeya');
              break;

            case 'currentWeather':
              weather.getWeather(data.entities.city||data.entities.City,function(botMsg){
                socket.emit('postBotReply',botMsg);
              });
              break;

            case 'Joke':
              joke(function(botMsg){
                socket.emit('postBotReply',botMsg);
              });
              break;

            case 'Help':
              socket.emit('postBotReply',helpMsg);
              break;

            case 'placeInfo':
              placeDetails.getPlaceId(data.entities.place);
              setTimeout(function(){
                placeDetails.getPlaceDetails(botMsg => {
                  socket.emit('postBotReply',botMsg);
                });
              },3000);
              break;

            case 'Quote':
              quote( botMsg => {
                socket.emit('postBotReply',botMsg);
              });
              break;

            case 'Define':
              define(data.entities.term,botMsg => {
                socket.emit('postBotReply',botMsg);
              });
              break;

            case 'Wiki':
              wikiSearch(data.entities.wikiTerm,botMsg => {
                socket.emit('postBotReply',botMsg);
              });
              break;

              default:
                socket.emit('postBotReply',defaultBotMsg);
                break;

          }
        });

  });

  socket.on('userMessaged', (msg) => {
    socket.emit('postUserMsg', {
      msg:msg,
      username: currentUser
    });
  })

});


//server
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
