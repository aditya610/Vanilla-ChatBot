let loginContainer = $("#login");
let loginBtn = $("#loginBtn");
let signupContainer = $("#signup");
let signupBtn = $("#signupBtn");

let loginContainerVisible = false;
let signupContainerVisible = false;

loginBtn.on("click",function(){
  signupContainer.css("display", "none");
  signupContainerVisible = false;
  loginContainer.fadeToggle(1000);
  loginContainerVisible = !loginContainerVisible;
  if(loginContainerVisible){
    $('body').stop().animate({
      scrollTop: $('body')[0].scrollHeight
    }, 800);
  }

  if(!loginContainerVisible) {
    $('body').stop().animate({
      scrollTop: 0
    }, 500);
  }
});

signupBtn.on("click",function(){
  loginContainer.css("display", "none");
  loginContainerVisible = false;
  signupContainer.fadeToggle(1000);
  signupContainerVisible = !signupContainerVisible;;
  if(signupContainerVisible){
    $('body').stop().animate({
      scrollTop: $('body')[0].scrollHeight
    }, 800);
  }

  if(!signupContainerVisible) {
    $('body').stop().animate({
      scrollTop: 0
    }, 500);
  }
});
