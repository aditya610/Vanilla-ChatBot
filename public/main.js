$(function () {
    var socket = io();
    var input = $('#m');
    var color = '';

    $('#chat-form').submit(function(){
      socket.emit('userMessaged', input.val());
      socket.emit('checkIfForBot',input.val());
      input.val('');
      return false;
    });

  socket.on('getUserColour', function(data){
    hex = intToRGB(hashCode(data.username));
    rgb = hexToRgb(hex);
    color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
    // $('#messages li.userMsg').css(`background`, `#${color}`);
  });

  socket.on('getBotReply', function(msg){
    socket.emit('msgForBot',msg);
  });


  socket.on('postBotReply',function(botMsg){
    $('#messages').append(`<li><strong>Bot</strong><br>${botMsg}</li>`);
    $('.chatArea').stop().animate({
      scrollTop: $('.chatArea')[0].scrollHeight
    }, 800);
  });

  socket.on('postUserMsg', function(userMsg){
    $('#messages').append(`<li><strong>${userMsg.username}</strong><br>${userMsg.msg}</li>`);
    $('.chatArea').stop().animate({
      scrollTop: $('.chatArea')[0].scrollHeight
    }, 800);
  });

  socket.on('addStyling', function(){
    $('#messages li:nth-last-child(1)').addClass('userMsg');
    console.log(color);
    $('#messages li.userMsg').css(`background`, `${color}`);
  });

  socket.on("newConnection", function(){
    socket.emit("userConnected");
  });

  socket.on('checkUser', function(data){
    if((jQuery.inArray(data.currentUser,data.clients)) === -1){
      socket.emit("addUserToArray");
    }
    socket.emit("doneChecking");
  });

  socket.on("displayUsers", function(data){
    $('#usersArea').text(" ");
    $('#usersNum').text(data.clients.length);
    data.clients.forEach(function(username){
      $('#usersArea').append(`<li>${username}</li>`);
    });
  })

  function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  });
