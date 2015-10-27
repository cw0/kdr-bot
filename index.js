#!/usr/bin/env node

//declare variables
var irc = require('irc'),
    client;

//initialize the client and connect to a channel
client = new irc.Client('chat.freenode.net', 'kdrt', {
  channels: ['##arguments']
});

//log successful connection to server
client.addListener('registered', function (message) {
  console.log(message);
});

client.addListener('kick', function (channel, nick, by, reason, message) {
  //TODO track statistics
});

client.addListener('+mode', function (channel, by, mode, argument, message) {
  //TODO track statistics
});

client.addListener('-mode', function (channel, by, mode, argument, message) {
  //TODO track statistics
});

//log messages
client.addListener('message', function (from, to, message) {
  console.log(from + ' => ' + to + ': ' + message);
});

//log private messages
client.addListener('pm', function (from, message) {
  console.log(from + ' => me: ' + message);
})

//spoof the version
client.addListener('ctcp-version' function (from, to, message) {
  client.say(from, 'VERSION HexChat 2.9.1 [x86] / Windows 8.1 [1.46GHz]');
});

//handle errors
client.addListener('error', function(message) {
    console.log('error: ', message);
});
