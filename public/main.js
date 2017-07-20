$(function () {
    var socket = io();
    var input = $('#m');

    $('form').submit(function(){
      socket.emit('userMessaged', input.val());
      socket.emit('msgForBot', input.val());
      input.val('');
      return false;
    });

  socket.on('postBotReply',function(botMsg){
    $('#messages').append(`<li><strong>Bot</strong><br><p>${botMsg}</p></li>`);
    $('.chatArea').stop().animate({
      scrollTop: $('.chatArea')[0].scrollHeight
    }, 800);
  });

  socket.on('postUserMsg', function(userMsg){
    $('#messages').append(`<li id='userMsg'><strong>${userMsg.username}</strong><br><p>${userMsg.msg}<p></li>`);
    $('.chatArea').stop().animate({
      scrollTop: $('.chatArea')[0].scrollHeight
    }, 800);
  });

  });
