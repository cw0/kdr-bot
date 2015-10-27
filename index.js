#!/usr/bin/env node

//declare variables
var irc = require('irc'),
    client,
    versionMessageIrssi,
    versionMessageHexChat;

versionMessageIrssi = 'irssi v0.8.12 - running on CYGWIN_NT-6.1-WOW64 i686';
versionMessageHexChat = 'VERSION HexChat 2.9.1 [x86] / Windows 8.1 [1.46GHz]';

//initialize the client and connect to a channel
client = new irc.Client('chat.freenode.net', 'kdrt', {
  channels: ['##arguments']
});

//log successful connection to server
client.addListener('registered', function (message) {
  console.log(message);
});

//log kick messages
client.addListener('kick', function (channel, nick, by, reason, message) {
  //TODO track statistics
});

//log any mode changes (+)
client.addListener('+mode', function (channel, by, mode, argument, message) {
  //TODO track statistics
});

//log any mode changes (-)
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
  client.ctcp(from, 'privmsg', versionMessageHexChat);
});

//handle errors
client.addListener('error', function(message) {
    console.log('error: ', message);
});
