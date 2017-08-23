var mysql = require('mysql'); //导入数据库
var dbConfig = require('../db/db_config'); //链接数据库
var userSql = require('../db/user_sql'); //数据库增删改查

var pool = mysql.createPool(dbConfig.mysql); //创建连接池
//临时头像
var head_img = 'http://www.fengke.club/head_image/geek_default_team_headpic.png'
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

//用户增，查
module.exports = {
  //增加用户
  add: function(req, res, next) {
    //从连接池获取链接
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
      connection.query(userSql.getUserByEmail, req.body.email, function(err, result) {
        if (err) {
          result = {
            code: -200,
            msg: '数据库处理失败'
          };
          responseJSON(res, result);
          connection.release();
          return;
        }
        if (result.length !== 0) {
          result = {
            code: -200,
            msg: '用户已存在'
          };
          responseJSON(res, result);
        } else {
          var ctime = createTime();
          var nickName = randomNickname();
          connection.query(userSql.insert, [req.body.email, req.body.password, nickName, head_img, ctime, ctime], function(err, oresult) {
            if (err) {
              oresult = {
                code: -200,
                msg: '数据库处理失败'
              };
              responseJSON(res, oresult);
              return;
            }
            if (oresult) {
              oresult = {
                code: 200,
                msg: '注册成功'
              };
            }else{
              oresult = {
                code: -200,
                msg: '注册失败'
              };
            }
            responseJSON(res, oresult);
          })
        }
        connection.release();
      });
    });
  },
  queryByEmail: function(req, res, next) {
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
      var email = req.body.email; //登录名邮箱
      var password = req.body.password; //登录密码
      connection.query(userSql.getUserByEmail, email, function(err, result) {
        if (err) {
          result = {
            code: -200,
            msg: '数据库处理失败'
          };
          responseJSON(res, result);
          return;
        }
        if (result.length > 0) { //存在用户
          if (result[0].password === password) {
            req.session.user = result[0]; //设置session
            res.cookie('user', result[0].nickname, { maxAge: 1000 * 60 * 60 * 24 }); //设置cookie
            result = {
              code: 200,
              msg: '登录成功'
            }
          } else {
            result = {
              code: -200,
              msg: '密码错误'
            }
          }
        } else { //用户不存在
          result = {
            code: -200,
            msg: '用户不存在'
          }
        }
        responseJSON(res, result);
        connection.release();
      });
    });
  },
  updatePassword: function(req, res, next) {
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
      connection.query(userSql.getUserByEmail, req.body.email, function(err, result) {
        if (result.length === 0) {
          result = {
            code: -200,
            msg: '用户不存在'
          };
          responseJSON(res, result);
        } else {
          var utime = createTime();
          connection.query(userSql.update, [req.body.password, utime, req.body.email], function(err, sresult) {
            console.log(sresult);
            if (err) {
              sresult = {
                code: -200,
                msg: '数据库处理失败'
              };
              responseJSON(res, sresult);
              return;
            }

            if (sresult > 0) { //存在用户
              sresult = {
                code: 200,
                msg: '修改成功'
              };
            } else { //修改失败
              sresult = {
                code: -200,
                msg: '修改失败'
              };
            }
            responseJSON(res, sresult);
            connection.release();
          });
        }
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
//生成随机用户名
function randomNickname() {
  var len = 12;　　
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
  var maxPos = $chars.length;　　
  var nickName = '';　　
  for (i = 0; i < len; i++) {
    nickName += $chars.charAt(Math.floor(Math.random() * maxPos));　　
  }　　
  return nickName;
}