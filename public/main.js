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
    $('#messages').append(`<li>${botMsg}</li>`);
    $('.chatArea').stop().animate({
      scrollTop: $('.chatArea')[0].scrollHeight
    }, 800);
  });

  socket.on('postUserMsg', function(userMsg){
    $('#messages').append(`<li id='userMsg'>${userMsg}</li>`);
    $('.chatArea').stop().animate({
      scrollTop: $('.chatArea')[0].scrollHeight
    }, 800);
  });

  });
