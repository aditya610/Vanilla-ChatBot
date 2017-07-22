//all middleware goes here
var middlewareObject = {};

middlewareObject.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}


module.exports = middlewareObject;
