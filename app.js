'use strict';

//services
const weather = require('./services/weatherService');
const joke = require('./services/jokeService');
const helpMsg = require('./services/helpService');
const placeDetails = require('./services/placeInfoService');
const quote = require('./services/quoteService');
const define = require('./services/defineService');
const wikiSearch = require('./services/wikiService');
const news = require('./services/newsService');


const matcher = require('./matcher');
const middleware = require('./middleware');

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


var DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/vanilla_chatbot"
mongoose.connect(DATABASE_URL);
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
var clients = [];


app.get("/",function(req,res){
  res.render("index");
});


//login logic
app.post("/login",passport.authenticate("local",{
  successRedirect: "/home",
  failureRedirect: "/"
  }),function(req,res){
});


//signup logic
app.post("/signup",function(req,res){
  var newUser = new User({username: req.body.username});
  User.register(newUser,req.body.password,function(err,user){
      if(err){
        return res.redirect("/");
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
app.get("/home",middleware.isLoggedIn,function(req,res){
  currentUser = req.user.username;
  res.render("home");
});


io.on('connection', function(socket){

  console.log("User Connected");
  socket.username = currentUser;
  console.log(socket.username);

  socket.emit("newConnection");

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

            case 'News':
              news(botMsg => {
                socket.emit('postBotReply',botMsg);
              });
              break;

            default:
              socket.emit('postBotReply',defaultBotMsg);
              break;

          }
        });

  });

  socket.on('userConnected', () => {
    socket.emit("checkUser",{
      currentUser:socket.username,
      clients:clients
    })
  });

  socket.on("addUserToArray", () => {
    clients.push(socket.username);
  });

  socket.on("doneChecking", () => {
    socket.emit("displayUsers",{
      clients:clients
    });
  });

  socket.on('userMessaged', (msg) => {
    socket.emit('postUserMsg', {
      msg:msg,
      username: socket.username
    });
  });


  socket.on('disconnect', function () {
    let index = clients.indexOf(socket.username);
    clients.splice(index, 1);
    socket.emit("displayUsers",{
      clients:clients
    });
  });


});


//server
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
