var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className={'row'}>
        <div className={'col-xs-2'}>{this.props.from + ':'}</div>
        <div className={'col-xs-10'}>{this.props.message}</div>
      </div>
    );
  }
});
