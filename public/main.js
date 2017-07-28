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

  socket.emit("userConnected");

  socket.on('checkUser', function(data){
    if((jQuery.inArray(data.currentUser,data.clients)) === -1){
      socket.emit("addUserToArray");
    }
  });

  socket.on("displayUsers", function(data){
    data.clients.forEach(function(username){
      $('#usersNum').text(data.onlineUsers);
      $('#usersArea').append(`<li>${username}</li>`);
    });
  })

  });

  // 
  // data.onlineUsers++;
  // data.clients.push(data.currentUser);
  // clients.forEach(function(username){
  //   $('#usersNum').text(onlineUsers);
  //   $('#usersArea').append(`<li>${username}</li>`);
  // });
