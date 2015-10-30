#!/usr/bin/env node
var
  bot = require('./bot.js'),
  nano = require('nano')('http://localhost:5984'),
  test = null;

if (process.argv[2] != undefined) {
  if (process.argv[2] == 'setup') { //if command = setup
    nano.db.destroy('kdr_bot_dev', function () {
      console.log('destroyed db');
      nano.db.create('kdr_bot_dev', function () {
        console.log('created db');
      });
    });
  } else { //when command not recognized
    test = new bot.Bot('chat.freenode.net', 'meatboy', 'meatboy', 'meatboy', ['##arguments']);
    test.connect();
  }
} else { //default start
  test = new bot.Bot('chat.freenode.net', 'meatboy', 'meatboy', 'meatboy', ['##arguments']);
  test.connect();
}
