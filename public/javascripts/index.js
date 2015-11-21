$(document).ready(function () {
  handleBotStatus();
});

var socket = io.connect('http://localhost:3000');

socket.on('bot-connect', function (msg) {
  console.log(msg);
});
socket.on('bot-disconnect', handleBotPM);
socket.on('bot-message', handleBotPM);

function handleBotStatus () {
  var status = $('#bot-status').data('status');

  if (status == 'offline') {
    $('body').addClass('offline');
    $('body').removeClass('online');
    $('html').addClass('offline');
    $('html').removeClass('online');
  } else {
    $('body').addClass('online');
    $('body').removeClass('offline');
    $('html').addClass('online');
    $('html').removeClass('offline');
  }
}

function handleBotPM (msg) {
  console.log('message: ', msg);
}
