#!/usr/bin/env node

//declare variables
var irc = require('irc'),
    colors = require('colors');

function Bot(server, nick, channels) {
  this.server = server;
  this.nick = nick;
  this.channels = channels;
}

Bot.prototype = {
  constructor: Bot, 
  connect: function () {
    this.client = new irc.Client(this.server, this.nick, {
      channels: this.channels
    });
  }
}
