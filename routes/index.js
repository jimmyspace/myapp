var express = require('express');
var router = express.Router();
var articleHandler = require('../mid_handler/article_handler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//全部文章
router.post('/articles', function(req, res, next) {
  articleHandler.queryArticle(req, res, next);
});
//分类筛选
router.post('/selectArticles', function(req, res, next) {
  articleHandler.queryArticleByType(req, res, next);
});
//点赞
router.post('/favourite',function(req,res,next){
	articleHandler.updateFavorite(req, res, next);
});
//查询文章详情
router.post('/article',function(req,res,next){
	articleHandler.queryArticleByUserId(req, res, next);
});

module.exports = router;