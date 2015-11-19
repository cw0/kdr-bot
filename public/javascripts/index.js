$(document).ready(function () {
  handleBotStatus();
});

var socket = io();

socket.on('bot-connect', handleBotStatus);
socket.on('bot-disconnect', handleBotStatus);

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
