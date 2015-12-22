var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var bot = req.app.get('bot');

  //console.log('bot: ', bot);

  res.render('index', {
    title: 'KDR BOT',
    nick: 'meatboy',
    realName: 'meatboy',
    userName: 'meatboy',
    server: 'chat.freenode.net',
    channels: '##arguments',
    status: bot.isOnline
  });
});

/* POST connect */
router.post('/connect', function(req, res, next) {
  var bot = req.app.get('bot');

  bot.nick = req.body['nick-input'];
  bot.realName = req.body['real-name-input'];
  bot.userName = req.body['user-name-input'];
  bot.server = req.body['server-input'];
  bot.channels = req.body['channels-input'].split(',');

  bot.connect();
  //console.log(req.body);

  res.json({
    title: 'KDR BOT',
    status: bot.isOnline,
    nick: bot.nick,
    realName: bot.realName,
    userName: bot.userName,
    server: bot.server,
    channels: bot.channels
  });
});

router.post('/disconnect', function(req, res, next) {
  var bot = req.app.get('bot');

  bot.disconnect();

  res.json({
    title: 'KDR BOT',
    status: bot.isOnline,
    nick: bot.nick,
    realName: bot.realName,
    userName: bot.userName,
    server: bot.server,
    channels: bot.channels
  });
});

module.exports = router;
