#!/usr/bin/env node

//declare variables
var
  irc = require('irc'),
  colors = require('colors');

exports.Bot = Bot;

function Bot(server, nick, channels) {

  this.server = server;
  this.nick = nick;
  this.channels = channels;
  //this.fCount = 0;

  var
    versionMessageIrssi = 'irssi v0.8.12 - running on CYGWIN_NT-6.1-WOW64 i686',
    versionMessageHexChat = 'VERSION HexChat 2.9.1 [x86] / Windows 8.1 [1.46GHz]';

}

Bot.prototype = {
  constructor: Bot,
  connect: function () {
    var msgCount = 0;
    this.client = new irc.Client(this.server, this.nick, {
      channels: this.channels
    });
    this.client.addListener('registered', function (message) {
      console.log('kdr bot connected to server successfully');
      //console.log(message);
    });
    this.client.addListener('kick', function (channel, nick, by, reason, message) {
      //TODO track statistics
      console.log('%s kicked by: %s for: %s'.green, nick, by, reason);
    });
    this.client.addListener('message', function (from, to, message) {
      msgCount += 1;
      console.log('msgCount: %s'.rainbow, msgCount.toString());
      //console.log(from + ' => ' + to + ': ' + message);
    });
    this.client.addListener('+mode', function (channel, by, mode, argument, message) {
      //TODO track statistics
      console.log('%s set mode: +%s on %s'.blue, by, mode, argument);
    });
    this.client.addListener('-mode', function (channel, by, mode, argument, message) {
      //TODO track statistics
      console.log('%s set mode: -%s on %s'.blue, by, mode, argument);
    });
    this.client.addListener('pm', function (from, message) {
      console.log('%s => me: %s'.yellow, from, message);
    });
    this.client.addListener('ctcp-version', function (from, to, message) {
      console.log('%s => me: CTCP VERSION'.red, from);
      client.ctcp(from, 'privmsg', versionMessageHexChat);
    });
    this.client.addListener('error', function (message) {
      console.log('error: ', message);
    });
  }
}
