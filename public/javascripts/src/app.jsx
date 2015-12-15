var React = require('react');
var ReactDOM = require('react-dom');
var Message = require('./message.jsx');

ReactDOM.render(
  <Message from={'test sender'} message={'test message'} />,
  document.getElementById('example2')
);
