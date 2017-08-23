var express = require('express');
var router = express.Router();

/* GET users listing. url路由*/
router.get('/', function(req, res, next) {
  res.render('users', { title: '个人中心' });
});

module.exports = router;