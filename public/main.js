$(function () {
    var socket = io();
    var input = $('#m');
    var onlineUsers = 0;
    var clients = [];

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

  socket.emit("userConnected");

  socket.on('displayUsers', function(data){
    if((jQuery.inArray(data.currentUser,clients)) === -1){
      onlineUsers++;
      clients.push(data.currentUser);
      clients.forEach(function(username){
        $('#usersNum').text(onlineUsers);
        $('#usersArea').append(`<li>${username}</li>`);
      });
    }
  });

  });
