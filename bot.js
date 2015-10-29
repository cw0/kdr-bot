#!/usr/bin/env node

//declare variables
var
  irc = require('irc'),
  colors = require('colors'),
  nano = require('nano')('http://localhost:5984'),
  db = nano.db.use('kdr_bot_dev');

exports.Bot = Bot;

function Bot(server, nick, channels) {

  this.server = server;
  this.nick = nick;
  this.channels = channels;
}

Bot.prototype = {
  constructor: Bot,
  connect: function () {
    var
      self = this;
      versionMessageIrssi = 'irssi v0.8.12 - running on CYGWIN_NT-6.1-WOW64 i686',
      versionMessageHexChat = 'VERSION HexChat 2.9.1 [x86] / Windows 8.1 [1.46GHz]';

    this.client = new irc.Client(this.server, this.nick, {
      channels: this.channels
    });
    this.client.addListener('registered', function (message) {
      console.log('kdr bot connected to server successfully');
      //console.log(message);
    });
    this.client.addListener('kick', function (channel, nick, by, reason, message) {
      data = {
        type : 'kick',
        channel : channel,
        nick : nick,
        by : by,
        reason : reason,
        message : message
      };
      db.insert(data, function (err, body) {
        if (!err) {
          console.log('%s kicked by: %s for: %s'.green, nick, by, reason);
        } else {
          console.log('error saving kick msg', data);
        }
      });
    });
    this.client.addListener('message', function (from, to, message) {
      var data = {
        type : 'message',
        from : from,
        to : to,
        message : message
      };
      db.insert(data, function (err, body) {
        if (!err) {
          //console.log(from + ' => ' + to + ': ' + message);
        } else {
          console.log('error saving msg', data);
        }
      });
    });
    this.client.addListener('+mode', function (channel, by, mode, argument, message) {
      var data = {
        type : '+mode',
        channel : channel,
        by : by,
        mode : mode,
        on : argument,
        message : message
      };
      db.insert(data, function (err, body) {
        if (!err) {
          console.log('%s set mode: +%s on %s'.blue, by, mode, argument);
        } else {
          console.log('error saving +mode', data);
        }
      });
    });
    this.client.addListener('-mode', function (channel, by, mode, argument, message) {
      var data = {
        type : '-mode',
        channel : channel,
        by : by,
        mode : mode,
        on : argument,
        message : message
      };
      db.insert(data, function (err, body) {
        if (!err) {
          console.log('%s set mode: -%s on %s'.blue, by, mode, argument);
        } else {
          console.log('error saving -mode', data);
        }
      });
    });
    this.client.addListener('pm', function (from, message) {
      var data = {
        type : 'pm',
        from : from,
        message : message
      };
      db.insert(data, function (err, body) {
        if (!err) {
          console.log('%s => me: %s'.yellow, from, message);
        } else {
          console.log('error saving pm', data);
        }
      });
    });
    this.client.addListener('ctcp-version', function (from, to, message) {
      var data = {
        type : 'ctcp-version',
        from : from,
        to : to,
        message : message
      };
      db.insert(data, function (err, body) {
        if (!err) {
          console.log('%s => me: CTCP VERSION'.red, from);
        } else {
          console.log('error saving ctcp-version', data);
        }
      });
      self.client.ctcp(from, 'privmsg', versionMessageHexChat);
    });
    this.client.addListener('error', function (message) {
      console.log('error: ', message);
    });
  }
}
