#!/usr/bin/env node

//declare variables
var
  irc = require('irc'),
  colors = require('colors'),
  nano = require('nano')('http://localhost:5984'),
  db = nano.db.use('kdr_bot_dev');

exports.Bot = Bot;

function Bot(server, nick, realName, userName, channels) {
  this.server = server;
  this.nick = nick;
  this.channels = channels;
  this.realName = realName || 'thomas';
  this.userName = userName || 'thomas';
  this.isOnline = false;
  this.io = require('socket.io-client')('http://localhost:3000');

  //console.log(this.io);

  this.onRegister = function (message) {
    console.log('kdr bot connected to server successfully');
    this.io.emit('bot-connect', 'everyone');
    //console.log(message);
  };

  this.onKick = function (channel, nick, by, reason, message) {
    data = {
      date : Date.now(),
      type : 'kick',
      channel : channel,
      nick : nick,
      by : by,
      reason : reason,
      message : message
    };
    this.io.emit('bot-kick', data);
    db.insert(data, function (err, body) {
      if (!err) {
        console.log('%s kicked by: %s for: %s'.green, nick, by, reason);
      } else {
        console.log('error saving kick msg', data);
      }
    });
  };

  this.onMessage = function (from, to, message) {
    var data = {
      date : Date.now(),
      type : 'message',
      from : from,
      to : to,
      message : message
    };
    this.io.emit('bot-message', data);
    db.insert(data, function (err, body) {
      if (!err) {
        //console.log(from + ' => ' + to + ': ' + message);
      } else {
        console.log('error saving msg', data);
      }
    });
  };

  this.onPlusMode = function (channel, by, mode, argument, message) {
    var data = {
      date : Date.now(),
      type : '+mode',
      channel : channel,
      by : by,
      mode : mode,
      on : argument,
      message : message
    };
    this.io.emit('bot-on-plus-mode', data);
    db.insert(data, function (err, body) {
      if (!err) {
        console.log('%s set mode: +%s on %s'.blue, by, mode, argument);
      } else {
        console.log('error saving +mode', data);
      }
    });
  };

  this.onMinusMode = function (channel, by, mode, argument, message) {
    var data = {
      date : Date.now(),
      type : '-mode',
      channel : channel,
      by : by,
      mode : mode,
      on : argument,
      message : message
    };
    this.io.emit('bot-on-minus-mode', data);
    db.insert(data, function (err, body) {
      if (!err) {
        console.log('%s set mode: -%s on %s'.blue, by, mode, argument);
      } else {
        console.log('error saving -mode', data);
      }
    });
  };

  this.onPm = function (from, message) {
    var data = {
      date : Date.now(),
      type : 'pm',
      from : from,
      message : message
    };
    this.io.emit('bot-on-pm', data);
    db.insert(data, function (err, body) {
      if (!err) {
        console.log('%s => me: %s'.yellow, from, message);
      } else {
        console.log('error saving pm', data);
      }
    });
  };

  this.onCtcpVersion = function (from, to, message) {
    var
      versionMessageIrssi = 'irssi v0.8.12 - running on CYGWIN_NT-6.1-WOW64 i686',
      versionMessageHexChat = 'VERSION HexChat 2.9.1 [x86] / Windows 8.1 [1.46GHz]',
      data = {
        date : Date.now(),
        type : 'ctcp-version',
        from : from,
        to : to,
        message : message
      };
    this.io.emit('bot-ctcp-version', data);
    db.insert(data, function (err, body) {
      if (!err) {
        console.log('%s => me: CTCP VERSION'.red, from);
      } else {
        console.log('error saving ctcp-version', data);
      }
    });
    this.client.ctcp(from, 'privmsg', versionMessageHexChat);
    //console.log(this.client);
  };

  this.onIrcError = function (message) {
    console.log('error: ', message);
    this.io.emit('bot-irc-error', message);
  };
}

Bot.prototype = {
  constructor: Bot,
  connect: function () {
    var
      self = this;

    console.log('isOnline?:', self.isOnline);
    if (!self.isOnline) {
      self.isOnline = true;
      this.client = new irc.Client(this.server, this.nick, {
        channels: this.channels,
        realName: this.realName,
        userName: this.userName
      });
      this.client.addListener('registered', this.onRegister.bind(this));
      this.client.addListener('kick', this.onKick.bind(this));
      this.client.addListener('message', this.onMessage.bind(this));
      this.client.addListener('+mode', this.onPlusMode.bind(this));
      this.client.addListener('-mode', this.onMinusMode.bind(this));
      this.client.addListener('pm', this.onPm.bind(this));
      this.client.addListener('ctcp-version', this.onCtcpVersion.bind(this));
      this.client.addListener('error', this.onIrcError);
    } else {
      console.log('already connected');
    }
  },
  disconnect: function () {
    var
      self = this;

    if (self.isOnline) {
      self.client.disconnect('quit', function () {
        console.log('bot offline');
        self.isOnline = false;
        self.io.emit('bot-disconnect', 'everyone');
      });
    } else {
      console.log('bot is already offline');
    }
  }
};
