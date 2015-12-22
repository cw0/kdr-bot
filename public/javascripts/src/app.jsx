var React = require('react');
var ReactDOM = require('react-dom');
var Message = require('./message.jsx');

var
  self = this,
  socket = io.connect('http://localhost:3000');

socket.on('bot-message', function(data) {
  ReactDOM.render(
    <Message from={data.from} message={data.message} />,
    document.getElementById('example2')
  );
});
