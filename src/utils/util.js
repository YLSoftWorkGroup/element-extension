/*
 * @Description: 未描述
 * @Author: danielmlc
 * @Date: 2019-08-22 11:35:09
 * @LastEditTime: 2019-10-24 18:54:59
 */
export default {
  // eslint-disable-next-line complexity
  turnDX: function (money) {
    var cnNums = new Array(
      "零",
      "壹",
      "贰",
      "叁",
      "肆",
      "伍",
      "陆",
      "柒",
      "捌",
      "玖"
    ); //汉字的数字
    var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
    var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
    var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
    //var cnInteger = "整"; //整数金额时后面跟的字符
    var cnIntLast = "元"; //整型完以后的单位
    var maxNum = 999999999999999.9999; //最大处理的数字

    var IntegerNum; //金额整数部分
    var DecimalNum; //金额小数部分
    var ChineseStr = ""; //输出的中文金额字符串
    var parts; //分离金额后用的数组，预定义
    if (money == "") {
      return "";
    }
    money = parseFloat(money);
    if (money >= maxNum) {
      $.alert("超出最大处理数字");
      return "";
    }
    if (money == 0) {
      //ChineseStr = cnNums[0]+cnIntLast+cnInteger;
      ChineseStr = cnNums[0] + cnIntLast;
      //document.getElementById("show").value=ChineseStr;
      return ChineseStr;
    }
    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
      IntegerNum = money;
      DecimalNum = "";
    } else {
      parts = money.split(".");
      IntegerNum = parts[0];
      DecimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(IntegerNum, 10) > 0) {
      // 获取整型部分转换
      let zeroCount = 0;
      let IntLen = IntegerNum.length;
      for (let i = 0; i < IntLen; i++) {
        let n = IntegerNum.substr(i, 1);
        let p = IntLen - i - 1;
        let q = p / 4;
        let m = p % 4;
        if (n == "0") {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            ChineseStr += cnNums[0];
          }
          zeroCount = 0; //归零
          ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m === 0 && zeroCount < 4) {
          ChineseStr += cnIntUnits[q];
        }
      }
      ChineseStr += cnIntLast;
      // 整型部分处理完毕
    }
    if (DecimalNum != "") {
      //小数部分
      decLen = DecimalNum.length;
      for (let i = 0; i < decLen; i++) {
        let n = DecimalNum.substr(i, 1);
        if (n != "0") {
          ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (ChineseStr == "") {
      //ChineseStr += cnNums[0]+cnIntLast+cnInteger;
      ChineseStr += cnNums[0] + cnIntLast;
    }
    return ChineseStr;
  }
};