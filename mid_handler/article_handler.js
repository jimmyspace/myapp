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
      connection.query(articleSql.insert,[req.body.title,req.session.user.id,req.body.content,req.body.type,ctime,ctime,'xxx',0],function(err,result){
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
        }else{
          result = {
            code: -200,
            msg: '发表失败'
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