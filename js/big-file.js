
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "phoneValidate", function() { return phoneValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "phoneOrTelValidate", function() { return phoneOrTelValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moneyValidate", function() { return moneyValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postCodeValidate", function() { return postCodeValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailValidate", function() { return emailValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "idCardValidate", function() { return idCardValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postalCode", function() { return postalCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numValidate", function() { return numValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cellPhoneValid", function() { return cellPhoneValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "passwordValid", function() { return passwordValid; });
// 手机号校验规则
var phoneValidate = new RegExp(/^0?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/); // 手机号或者固话校验规则

var phoneOrTelValidate = new RegExp(/(010\d{8})|(0[2-9]\d{9})|(1[2-9]\d{9})/); // 校验金额

var moneyValidate = /^-?\d{1,5}(?:\.\d{1,2})?$/; // 邮编校验

var postCodeValidate = /^[0-9]{6}$/; // 邮箱校验

var emailValidate = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/; // 身份证校验

var idCardValidate = function idCardValidate() {
  var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
  var parityBit = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
  var varArray = new Array();
  var lngProduct = 0;
  var intCheckDigit;
  var intStrLen = num.length;
  var idNumber = num; // initialize

  if (intStrLen != 18) {
    return false;
  } // check and set value


  for (var i = 0; i < intStrLen; i++) {
    varArray[i] = idNumber.charAt(i);

    if ((varArray[i] < '0' || varArray[i] > '9') && i != 17) {
      return false;
    } else if (i < 17) {
      varArray[i] = varArray[i] * factorArr[i];
    }
  }

  if (intStrLen == 18) {
    // check date
    var date8 = idNumber.substring(6, 14);

    if (isDate8(date8) == false) {
      return false;
    } // calculate the sum of the products


    for (var i = 0; i < 17; i++) {
      lngProduct = lngProduct + varArray[i];
    } // calculate the check digit


    intCheckDigit = parityBit[lngProduct % 11]; // check last digit

    if (varArray[17] != intCheckDigit) {
      return false;
    }
  } //  else {
  //     // length is 15
  //     // check date
  //     var date6 = idNumber.substring(6, 12)
  //     if (isDate6(date6) == false) {
  //         return false
  //     }
  // }


  return true;
}; // function isDate6(sDate) {
//     if (!/^[0-9]{6}$/.test(sDate)) {
//         return false
//     }
//     var year, month
//     year = sDate.substring(0, 4)
//     month = sDate.substring(4, 6)
//     if (year < 1700 || year > 2500) return false
//     if (month < 1 || month > 12) return false
//     return true
// }

function isDate8(sDate) {
  if (!/^[0-9]{8}$/.test(sDate)) {
    return false;
  }

  var year, month, day;
  year = sDate.substring(0, 4);
  month = sDate.substring(4, 6);
  day = sDate.substring(6, 8);
  var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year < 1700 || year > 2500) return false;
  if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) iaMonthDays[1] = 29;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > iaMonthDays[month - 1]) return false;
  return true;
} // 邮政编码


var postalCode = /^[0-9][0-9]{5}$/; // 有数字组成

var numValidate = /^\d+(\.\d+)?$/;
/**
 * 手机号 校验
 * @param value
 */

function cellPhoneValid(value) {
  return /^0?(12[0-9]|13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/.test(value);
}
/**
 * 密码校验(校验规则 8-20位数字加字母)
 * @param value
 */

function passwordValid(value) {
  return /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(value);
}

/*!********************************!*\
  !*** ./util.inspect (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 7
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 8
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
//Hello, world!