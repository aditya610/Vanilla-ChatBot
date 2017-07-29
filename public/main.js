$(function () {
    var socket = io();
    var input = $('#m');

    $('#chat-form').submit(function(){
      socket.emit('userMessaged', input.val());
      socket.emit('msgForBot', input.val());
      input.val('');
      return false;
    });

  socket.on('postBotReply',function(botMsg){
    $('#messages').append(`<li><strong>Bot</strong><br>${botMsg}</li>`);
    $('.chatArea').stop().animate({
      scrollTop: $('.chatArea')[0].scrollHeight
    }, 800);
  });

  socket.on('postUserMsg', function(userMsg){
    $('#messages').append(`<li id='userMsg'><strong>${userMsg.username}</strong><br>${userMsg.msg}</li>`);
    $('.chatArea').stop().animate({
      scrollTop: $('.chatArea')[0].scrollHeight
    }, 800);
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
    $('#usersArea').text = ' ';
    $('#usersNum').text(data.clients.length);
    data.clients.forEach(function(username){
      $('#usersArea').append(`<li>${username}</li>`);
    });
  })

  });
