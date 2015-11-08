var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var bot = req.app.get('bot');

  console.log('bot: ', bot);

  res.render('index', {
    title: 'KDR BOT',
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
  bot.channels = req.body['channels-input'];

  bot.connect();
  console.log(req.body);

  res.render('index', {
    title: 'KDR BOT',
    status: bot.isOnline
  });
});

module.exports = router;
