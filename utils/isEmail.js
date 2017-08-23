/**
 * 正则验证邮箱
 * @param email
 * @returns {boolean}
 */

var isEmail = function(email) {
  let re = /^([a-z0-9A-Z]+[-|_|.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?.)+[a-zA-Z]{2,}$/;
  if (!re.test(email)) {
    return false;
  } else {
    return true;
  }
}
module.exports = isEmail