var express = require('express');
var router = express.Router();
var articleHandler = require('../mid_handler/article_handler');

/* GET users listing. url路由*/
router.get('/', function(req, res, next) {
  res.render('users', { title: '个人中心' });
});

router.post('/api/userArticle', function(req, res, next) {
	console.log(req.body.user_id);
  articleHandler.queryArticleByUserId(req, res, next);
})

module.exports = router;