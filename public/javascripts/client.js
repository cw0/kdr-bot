$(document).ready(function () {
  handleBotStatus();
  bindBotSetupSubmit();
});

var socket = io.connect('http://localhost:3000');

socket.on('bot-connect', handleBotStatus);
socket.on('bot-disconnect', handleBotStatus);
socket.on('bot-on-pm', handleBotPM);

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

function bindBotSetupSubmit() {
  $('#bot-setup-form').submit(function (e) {
    var $form = $('#bot-setup-form');

    $.post($form.attr('action'), $form.serialize(), function(response) {
      console.log(response);
    });

    e.preventDefault();
  });
}
