var React = require('react');
var ReactDOM = require('react-dom');
var HelloWorld = require('./helloworld.jsx');
var Message = require('./message.jsx');

ReactDOM.render(
    <HelloWorld />,
    document.getElementById('example')
);

ReactDOM.render(
  <Message from={'test sender'} message={'test message'} />,
  document.getElementById('example2')
);
