$(function () {
    var socket = io();

    $('form').submit(function(){
      socket.emit('msgForBot', $('#m').val());
      $('#m').val('');
      return false;
    });

  socket.on('postBotReply',function(botMsg){
    $('#messages').append(`<li>${botMsg}</li>`);
  })

  });
