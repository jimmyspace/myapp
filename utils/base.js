//常量身份证 省份编号
const vcity = {
  11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
  21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
  33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
  42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
  51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
  63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
}

/**
 *正则验证手机号
 * @param mobile
 * @returns {boolean}
 */
export function isMobile(mobile) {
  let re = /^(1[0-9]{10})$/;
  if (!re.test(mobile)) {
    return false;
  } else {
    return true;
  }
}
/**
 * 正则验证邮箱
 * @param email
 * @returns {boolean}
 */
export function isEmail(email) {
  let re = /^([a-z0-9A-Z]+[-|_|.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?.)+[a-zA-Z]{2,}$/;
  if (!re.test(email)) {
    return false;
  } else {
    return true;
  }
}
/**
 * 正则验证6位手机验证码
 * @param code
 * @returns {boolean}
 */
export function isCode(code) {
  let re = /^([0-9]{6})$/;
  if (!re.test(code)) {
    return false;
  } else {
    return true;
  }
}
/**
 * 验证4位图形验证码
 * @param imgCode
 * @returns {boolean}
 */
export function isImgCode(imgCode) {
  let len = imgCode.length;
  if (len != 4) {
    return false;
  } else {
    return true;
  }
}
/**
 * 验证密码是否为6-16位
 * @param pwd
 * @returns {boolean}
 */
export function isPassWord(pwd) {
  let len = pwd.length;
  if (len < 6 || len > 16) {
    return false;
  } else {
    return true;
  }
}
/**
 * 名字长度1-12
 * @param name
 * @returns {boolean}
 */
export function isName(name) {
  let len = name.length;
  if (len < 1 || len > 12) {
    return false;
  } else {
    return true;
  }
}
/**
 * function 定时器
 * @param f 定时执行的函数
 * @param start 开始时间
 * @param interval 循环时间间隔
 * @param end 结束时间
 */
export function invoke(f, start, interval, end) {
  if (!start) start = 0;
  if (arguments.length < 3) {
    setTimeout(f, start);
  } else {
    setTimeout(repeat, start);
    function repeat() {
      var h = setInterval(f, interval);
      if (end) setTimeout(function () {
        clearInterval(h);
      }, end)
    }
  }
}
/**
 * 检测身份证号
 * @param cardNum
 * @returns {boolean}
 */
export function checkIdCard(cardNum) {

  //是否为空
  if (cardNum === '') {
    return false;
  }
  //校验长度，类型
  if (isCardNo(cardNum) === false) {
    return false;
  }
  //检查省份
  if (checkProvince(cardNum) === false) {
    return false;
  }
  //校验生日
  if (checkBirthday(cardNum) === false) {
    return false;
  }
  //检验位的检测
  if (checkParity(cardNum) === false) {
    return false;
  }
  return true;
}
/**
 * 检测身份证号的出生日期
 * @param cardNum 输入的身份证号
 */
function checkBirthday(cardNum) {
  let len = cardNum.length
  //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
  if (len == '15') {
    let re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
    let arr_data = cardNum.match(re_fifteen);
    let year = arr_data[2];
    let month = arr_data[3];
    let day = arr_data[4];
    let birthday = new Date('19' + year + '/' + month + '/' + day);
    return verifyBirthday('19' + year, month, day, birthday);
  }
  //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
  if (len == '18') {
    let re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
    let arr_data = cardNum.match(re_eighteen);
    let year = arr_data[2];
    let month = arr_data[3];
    let day = arr_data[4];
    let birthday = new Date(year + '/' + month + '/' + day);
    return verifyBirthday(year, month, day, birthday);
  }
  return false;
}
/**
 * 验证出生日期 函数checkBirthday()返回
 * @param year
 * @param month
 * @param day
 * @param birthday
 */
function verifyBirthday(year, month, day, birthday) {
  let now = new Date();
  let now_year = now.getFullYear();
  //年月日是否合理
  if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
    //判断年份的范围（3岁到100岁之间)
    let time = now_year - year;
    if (time >= 3 && time <= 100) {
      return true;
    }
    return false;
  }
  return false;
}
/**
 * 检测省份去输入身份证号前两位
 * @param cardNum
 */
function checkProvince(cardNum) {

  let province = cardNum.substr(0, 2);

  if (vcity[province] == undefined) {
    return false;
  }
  return true;
}
/**
 * 检查号码是否符合规范，包括长度，类型
 * 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
 * @param cardNum
 */
function isCardNo(cardNum) {
  let reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
  if (reg.test(cardNum) === false) {
    return false;
  }
  return true;
}
/**
 * 将15位身份证号转成18位
 * @param cardNum
 * @returns {*}
 */
function fifteenToEighteen(cardNum) {
  if (cardNum.length == 15) {
    let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    let cardTemp = 0
    cardNum = cardNum.substr(0, 6) + '19' + cardNum.substr(6, cardNum.length - 6);
    for (let i = 0; i < 17; i++) {
      cardTemp += cardNum.substr(i, 1) * arrInt[i];
    }
    cardNum += arrCh[cardTemp % 11];
    return cardNum;
  }
  return cardNum;
}
/**
 * 身份证校验位检测
 * @param cardNum
 * @returns {boolean}
 */
function checkParity(cardNum) {
  //15位转18位
  cardNum = fifteenToEighteen(cardNum);
  let len = cardNum.length;

  if (len == 18) {
    let arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    let arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    let cardTemp = 0
    let valnum = null
    for (let i = 0; i < 17; i++) {

      cardTemp += cardNum.substr(i, 1) * arrInt[i];
    }

    valnum = arrCh[cardTemp % 11];
    if (valnum == cardNum.substr(17, 1)) {
      return true;
    }
    return false;
  }
  return false;
}
/**
 * 银行卡Luhn算法校验的过程：
 *1、从卡号最后一位数字开始，逆向将奇数位(1、3、5等等)相加。
 *2、从卡号最后一位数字开始，逆向将偶数位数字，先乘以2（如果乘积为两位数，则将其减去9），再求和。
 *3、将奇数位总和加上偶数位总和，结果应该可以被10整除。
 * @param cardNum
 * @returns {boolean}
 */
export function checkBankCard(cardNum) {
  if (cardNum == '') {
    return false
  }
  //最低16位
  if (cardNum.length < 15) {
    return false
  }

  let newCardNum = []//倒叙
  let sunOddProduct = 0//奇数位集合累加值
  let sumEvenProduct = 0//偶数位的集合累加值
  let sunTotal = 0 //总和

  for (let i = cardNum.length - 1; i > -1; i--) {
    newCardNum.push(parseInt(cardNum[i]))
  }
  newCardNum.forEach(function (item, index) {
    if ((index + 1) % 2 == 1) {
      sunOddProduct += item
    } else {
      let temp = item * 2
      if (temp < 10) {
        sumEvenProduct += temp
      } else {
        temp = temp - 9
        sumEvenProduct += temp
      }
    }
  })
  sunTotal = sunOddProduct + sumEvenProduct
  if (sunTotal % 10 == 0) {
    return true
  } else {
    return false
  }
}


