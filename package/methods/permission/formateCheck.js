// import { getObjectType } from "../utils/methods";
import {checkType} from "../utils/methods";

const requireKeys = ['router', 'login', 'getPermission', 'isLogin', 'asyncRouter'];
// const typeKeys = [
//   {
//     key: 'login',
//     type: 'Promise'
//   },
//   {
//     key: 'getPermission',
//     type: 'Promise'
//   }
// ];

function checkRequired(obj, key) {
  if (!obj || !obj[key]) {
    console.error(`${key}为必填项！`);
    return false;
  }
  return true;
}

// function checkType(obj, key, type) {
//   if (obj[key] !== undefined) {
//     if (getObjectType(obj[key]) === `[object ${type}]`) {
//       console.error(`${key}不是${type}类型！`);
//       return false;
//     }
//   }
//   return true;
// }

export function formatCheck(obj) {
  let flag = true;
  requireKeys.forEach(key=>{
    flag = checkRequired(obj, key) && flag;
  });
  // typeKeys.forEach(keyObj=>{
  //   flag = checkType(obj, keyObj.key, keyObj.type) && flag;
  // });
  return flag;
}

export function checkPermissionList(list) {
  let flag = Array.isArray(list) ? list.every(str=>checkType(str, 'String')) : false;
  if (!flag) {
    console.warn('permission: getPermission方法返回的值必须是一个字符串数组');
  }
  return flag;
}
