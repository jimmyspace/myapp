var express = require('express');
var router = express.Router();
var sendEmail = require('../mid_handler/send_email')
var isEmail = require('../utils/isEmail');
var isPassword = require('../utils/isPassword');

var userHandler = require('../mid_handler/user_handler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign', { title: '注册登录' });
});

//注册接口，邮箱和密码
router.post('/api/signUp', function(req, res, next) {
  if (!isEmail(req.body.email)) {
    res.send({
      code: -200,
      msg: '邮箱格式不正确'
    });
  } else if (!isPassword(req.body.password)) {
    res.send({
      code: -200,
      msg: '请输入6-16位密码'
    });
  } else {
    if (req.session.emailCode && (req.session.emailCode == req.body.code)) {
      userHandler.add(req, res, next);
    } else {
      res.send({
        code: -200,
        msg: '邮箱验证码不正确'
      });
    }
  }
});

//登录接口
router.post('/api/signIn', function(req, res, next) {
  if (!isEmail(req.body.email)) {
    res.send({
      code: -200,
      msg: '邮箱格式不正确'
    });
  } else if (!isPassword(req.body.password)) {
    res.send({
      code: -200,
      msg: '请输入6-16位密码'
    });
  } else {
    userHandler.queryByEmail(req, res, next);
  }
});

//忘记密码接口
router.post('/api/forget', function(req, res, next) {
  if (!isEmail(req.body.email)) {
    res.send({
      code: -200,
      msg: '邮箱格式不正确'
    });
  } else if (!isPassword(req.body.password)) {
    res.send({
      code: -200,
      msg: '请输入6-16位密码'
    });
  } else {
    if (req.session.emailCode && (req.session.emailCode == req.body.code)) {
      userHandler.updatePassword(req, res, next);
    } else {
      res.send({
        code: -200,
        msg: '邮箱验证码不正确'
      });
    }
  }
});
//发送邮箱验证吗
router.post('/api/sendEmail', function(req, res, next) {
  if (!isEmail(req.body.email)) {
    res.send({
      code: -200,
      msg: '邮箱格式不正确'
    });
  } else {
    //promise回调
    sendEmail(req.body.email).then(function(code) {
      req.session.cookie.maxAge = 1000 * 60 * 5
      req.session.emailCode = code; //设置session
      res.send({
        code: 200,
        msg: '邮箱验证码发送成功'
      });
    }, function(error) {
      res.send({
        code: -200,
        msg: '邮箱验证码发送失败'
      });
    });
  }
});

module.exports = router;