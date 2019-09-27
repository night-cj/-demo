/**
 * 表单校验-设置各种校验规则模板
 */
import { coerceBoolean, getObjectType } from './../../../methods/utils/methods';

/**
 * 必填项校验
 * @param msg 错误提示信息
 * @constructor
 */
function Re_required(msg) {
  this.msg = msg;
  this.validator = (rule, value, callback) => {
    let isEmptyArray = Array.isArray(value) && value.length === 0;
    let isEmptyObject = getObjectType(value) === '[object Object]' && JSON.stringify(value) === '{}';
    let isEmptyString = value === undefined || value === null || (typeof value === 'string' && value.replace(/[\r\n\s]+/, '') === '');
    if (isEmptyArray || isEmptyObject || isEmptyString) {
      callback(new Error(this.msg || '请填写必填项'));
    } else {
      callback();
    }
  };
}

//固定电话校验
const phone = (rule, value, callback) => {
  let regexp = /^(\d{3}-\d{8,11}|\d{4}-\d{7,10})$/;
  let exist = coerceBoolean(value);
  if (exist && !regexp.test(value)) {
    callback(new Error('固定电话格式不正确！'));
  } else {
    callback();
  }
};
//手机号校验
const telephone = (rule, value, callback) => {
  let regexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  let exist = coerceBoolean(value);
  if (exist && !regexp.test(value)) {
    callback(new Error('手机号格式不正确！'));
  } else {
    callback();
  }
};
//短号校验
const shortPhone = (rule, value, callback) => {
  let regexp = /^\d{6}$/;
  let exist = coerceBoolean(value);
  if (exist && !regexp.test(value)) {
    callback(new Error('联系短号需填写6位数字！'));
  } else {
    callback();
  }
};
//身份证号校验
const idCard = (rule, value, callback) => {
  // let regexp = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
  let regexp = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  let exist = coerceBoolean(value);
  if (exist && !regexp.test(value)) {
    callback(new Error('身份证号格式不正确！'));
  } else {
    callback();
  }
};
//邮箱校验
const email = (rule, value, callback) => {
  let regexp = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  let exist = coerceBoolean(value);
  if (exist && !regexp.test(value)) {
    callback(new Error('邮箱格式不正确！'));
  } else {
    callback();
  }
};
//正整数校验
const posInt = (rule, value, callback) => {
  let regexp = /^[1-9]\d*$/;
  let exist = coerceBoolean(value);
  if (exist && !regexp.test(value)) {
    callback(new Error('请填写正整数！'));
  } else {
    callback();
  }
};
//库位容积校验
const volume = (rule, value, callback) => {
  let regexp = /^\d{0,6}(\.|(\.\d{0,2}))?$/;
  let exist = coerceBoolean(value);
  if (exist && !regexp.test(value)) {
    callback(new Error('库位容积格式不正确！'));
  } else {
    callback();
  }
};
//库位承重校验
const weight = (rule, value, callback) => {
  let regexp = /^\d{0,5}(\.|(\.\d{0,2}))?$/;
  let exist = coerceBoolean(value);
  if (exist && !regexp.test(value)) {
    callback(new Error('库位承重格式不正确！'));
  } else {
    callback();
  }
};
//库位长宽高校验
const length = (rule, value, callback) => {
  let regexp = /^\d{0,2}(\.|(\.\d))?$/;
  let exist = coerceBoolean(value);
  if (exist && !regexp.test(value)) {
    callback(new Error('库位数值格式不正确！'));
  } else {
    callback();
  }
};

/**
 * 数字大小校验
 * @param symbol 比较的符号（如>、<、>=、<=等）
 * @param baseNum 比较的基准数字
 * @param msg 错误提示信息
 * @constructor
 */
function IntCompared(symbol, baseNum, msg) {
  this.symbol = symbol;
  this.baseNum = parseInt(baseNum, 10);
  this.msg = msg;
  this.validator = (rule, value, callback) => {
    let compare = false;
    switch (this.symbol) {
      case '>':
        compare = parseInt(value, 10) > this.baseNum;
        break;
      case '>=':
        compare = parseInt(value, 10) >= this.baseNum;
        break;
      case '<':
        compare = parseInt(value, 10) < this.baseNum;
        break;
      case '<=':
        compare = parseInt(value, 10) <= this.baseNum;
        break;
      default:
        compare = parseInt(value, 10) === this.baseNum;
    }
    if (!isNaN(value) && !compare) {
      callback(new Error(this.msg || '请填写符合要求的数字！'));
    } else {
      callback();
    }
  };
}

//非法字符校验
const illegal = (rule, value, callback) => {
  let regexp = /[\s]/;
  let exist = coerceBoolean(value);
  if (exist && regexp.test(value)) {
    callback(new Error('禁止输入空格！'));
  } else {
    callback();
  }
};

export default {
  required(msg) {
    let requiredValid = new Re_required(msg);
    return {required: true, validator: requiredValid.validator, trigger: 'change'};
  },
  phone: {validator: phone, trigger: 'change'},
  telephone: {validator: telephone, trigger: 'change'},
  shortPhone: {validator: shortPhone, trigger: 'change'},
  idCard: {validator: idCard, trigger: 'change'},
  email: {validator: email, trigger: 'change'},
  posInt: {validator: posInt, trigger: 'change'},
  volume: {validator: volume, trigger: 'change'},
  weight: {validator: weight, trigger: 'change'},
  length: {validator: length, trigger: 'change'},
  intCompared(symbol, baseNum, msg) {
    let intComparedValid = new IntCompared(symbol, baseNum, msg);
    return {validator: intComparedValid.validator, trigger: 'change'};
  },
  illegal: {validator: illegal, trigger: 'change'}
};
