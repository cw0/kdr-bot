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

module.exports = router;
