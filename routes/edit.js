var express = require('express');
var router = express.Router();

var articleHandler = require('../mid_handler/article_handler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('edit', { title: '编辑' });
});
//发表文章
router.post('/edit', function(req, res, next) {
  if (!req.session.user) {
    res.send({
      code: -200,
      msg: '未登录'
    });
  } else {
    articleHandler.add(req, res, next);
  }
})

module.exports = router;