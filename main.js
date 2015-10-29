#!/usr/bin/env node
var bot = require('./bot.js');

var test = new bot.Bot('chat.freenode.net', 'itsyaboylol', ['##arguments']);
test.connect();
