var nodemailer = require('nodemailer');

var sendEmail = function(email) {
  return new Promise(function(resolve, reject) {
    var code = randomNum();
    var transporter = nodemailer.createTransport({
      service: 'qq',
      port: 465,
      secureConnection: true,
      auth: {
        user: 'jimmy-space@qq.com',
        pass: 'ofmrbncscoexbeeh'
      }
    })
    var mailOptions = {
      from: 'jimmy-space@qq.com', // 发件地址
      to: email, // 收件列表
      subject: 'jimmy-space 验证信息', // 标题
      //text和html两者只支持一种
      text: 'jimmy-space提醒：您的验证码为' + code + '，请于5分钟内正确输入。', // 标题
      html: '<p>jimmy-space提醒：您的验证码为' + code + '，请于5分钟内正确输入。</p>' // html 内容
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        reject();
      } else {
        console.log('Message sent: ' + info.response);
        resolve(code);
      }
    });
  });
}
//随机生成6位验证吗
function randomNum() {
  var len = 6;　　
  var $chars = '0123456789';　　
  var maxPos = $chars.length;　　
  var code = '';　　
  for (i = 0; i < len; i++) {
    code += $chars.charAt(Math.floor(Math.random() * maxPos));　　
  }　　
  return code;
}
module.exports = sendEmail;