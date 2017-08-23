/**
 * 验证密码是否为6-16位
 * @param pwd
 * @returns {boolean}
 */
var isPassword = function (pwd) {
  let len = pwd.length;
  if (len < 6 || len > 16) {
    return false;
  } else {
    return true;
  }
}
module.exports = isPassword