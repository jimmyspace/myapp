var mysql = require('mysql'); //导入数据库
var dbConfig = require('../db/db_config'); //链接数据库
var articleSql = require('../db/article_sql'); //数据库增删改查

var pool = mysql.createPool(dbConfig.mysql); //创建连接池
//定义一个错误的返回结果
var responseJSON = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: -200,
      mes: '操作失败'
    });
  } else {
    res.json(ret);
  }
}

module.exports = {
  add: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      if (err) {
        result = {
          code: -200,
          msg: '数据库连接失败'
        };
        responseJSON(res, result);
        connection.release();
        return;
      }
      var ctime = createTime();
      connection.query(articleSql.insert, [req.body.title, req.session.user.id, req.body.content, req.body.type, ctime, ctime, 'xxx', 0], function(err, result) {
        console.log(err)
        if (err) {
          result = {
            code: -200,
            msg: '数据库处理失败'
          };
          responseJSON(res, result);
          connection.release();
          return;
        }
        if (result) {
          result = {
            code: 200,
            msg: '发表成功'
          };
        } else {
          result = {
            code: -200,
            msg: '发表失败'
          };
        }
        responseJSON(res, result);
        connection.release();
      });
    });
  },
  queryArticle: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      if (err) {
        result = {
          code: -200,
          msg: '数据库连接失败'
        };
        responseJSON(res, result);
        connection.release();
        return;
      }
      connection.query(articleSql.queryArticle, [parseInt(req.body.nowPage) - 1, parseInt(req.body.limit)], function(err, result) {
        console.log(err)
        if (err) {
          result = {
            code: -200,
            msg: '数据库处理失败'
          };
          responseJSON(res, result);
          connection.release();
          return;
        }
        if (result.length > 0) {
          result.forEach(function(item) {
            item.content = item.content.slice(0, 1);
          });
          var list = result;
          result = {
            code: 200,
            msg: '查询成功',
            nowPage: parseInt(req.body.nowPage),
            list: list
          };
        } else if (result.length === 0) {
          result = {
            code: 200,
            msg: '查询成功',
            nowPage: parseInt(req.body.nowPage),
            list: []
          };
        } else {
          result = {
            code: -200,
            msg: '查询失败'
          };
        }
        responseJSON(res, result);
        connection.release();
      });
    });
  },
  queryArticleByType: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      if (err) {
        result = {
          code: -200,
          msg: '数据库连接失败'
        };
        responseJSON(res, result);
        connection.release();
        return;
      }
      connection.query(articleSql.queryArticleByType, [req.body.type, parseInt(req.body.nowPage) - 1, parseInt(req.body.limit)], function(err, result) {
        console.log(err)
        if (err) {
          result = {
            code: -200,
            msg: '数据库处理失败'
          };
          responseJSON(res, result);
          connection.release();
          return;
        }
        if (result.length > 0) {
          result.forEach(function(item) {
            item.content = item.content.slice(0, 1);
          });
          var list = result;
          result = {
            code: 200,
            msg: '查询成功',
            nowPage: parseInt(req.body.nowPage),
            list: list
          };
        } else if (result.length === 0) {
          result = {
            code: 200,
            msg: '查询成功',
            nowPage: parseInt(req.body.nowPage),
            list: []
          };
        } else {
          result = {
            code: -200,
            msg: '查询失败'
          };
        }
        responseJSON(res, result);
        connection.release();
      });
    });
  },
  updateFavorite: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      if (err) {
        result = {
          code: -200,
          msg: '数据库连接失败'
        };
        responseJSON(res, result);
        connection.release();
        return;
      }
      connection.query(articleSql.updateFavorite, [req.body.id], function(err, result) {
        console.log(err)
        if (err) {
          result = {
            code: -200,
            msg: '数据库处理失败'
          };
          responseJSON(res, result);
          connection.release();
          return;
        }
        if (result) {
          result = {
            code: 200,
            msg: '点赞成功'
          };
        } else {
          result = {
            code: -200,
            msg: '点赞失败'
          };
        }
        responseJSON(res, result);
        connection.release();
      });
    });
  },
  queryArticleById: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      if (err) {
        result = {
          code: -200,
          msg: '数据库连接失败'
        };
        responseJSON(res, result);
        connection.release();
        return;
      }
      connection.query(articleSql.queryArticleById, [req.body.id], function(err, result) {
        console.log(err)
        if (err) {
          result = {
            code: -200,
            msg: '数据库处理失败'
          };
          responseJSON(res, result);
          connection.release();
          return;
        }
        console.log(result);
        if (result.length > 0) {
          var article = result[0];
          result = {
            code: 200,
            msg: '查询成功',
            article: article
          };
        } else {
          result = {
            code: -200,
            msg: '查询失败'
          };
        }
        responseJSON(res, result);
        connection.release();
      });
    });
  },
  queryArticleByUserId: function(req, res, next) {
    pool.getConnection(function(err, connection) {
      if (err) {
        result = {
          code: -200,
          msg: '数据库连接失败'
        };
        responseJSON(res, result);
        connection.release();
        return;
      }
      connection.query(articleSql.queryArticleByUserId, [req.body.user_id], function(err, result) {
        console.log(err)
        if (err) {
          result = {
            code: -200,
            msg: '数据库处理失败'
          };
          responseJSON(res, result);
          connection.release();
          return;
        }
        console.log(req.body.user_id);
        if (result.length > 0) {
          result.forEach(function(item) {
            item.content = item.content.slice(0, 1);
          });
          var list = result;
          result = {
            code: 200,
            msg: '查询成功',
            list: list
          };
        } else {
          result = {
            code: -200,
            msg: '查询失败'
          };
        }
        responseJSON(res, result);
        connection.release();
      });
    });
  }
}
//生成毫秒字符串
function createTime() {
  var date = new Date().getTime()
  date = parseInt(date / 1000)
  return date
}