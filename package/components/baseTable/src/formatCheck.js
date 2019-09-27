/**
 * 判断对象中是否有特定属性
 * @param obj 判断对象
 * @param paths 属性路径
 * @returns {boolean}
 */
function getAttr(obj, paths) {
  let val = obj;
  paths.forEach(path=>{
    val = val[path];
  });
  return val;
}

/**
 * 判断对象中是否有特定属性
 * @param obj 判断对象
 * @param paths 属性路径
 * @returns {boolean}
 */
function hasAttr(obj, paths) {
  try {
    let val = obj;
    paths.forEach(path=>{
      val = val[path];
    });
    return val !== undefined && val !== null
  } catch (e) {
    return false;
  }
}

function checkRequired(arr, paths) {
  for (let obj of arr) {
    if (!hasAttr(obj, paths)) {
      return false;
    }
  }
  return true;
}

/**
 * 判断某对象数组中每个对象的特定属性是否是唯一的
 * @param arr
 * @param paths
 */
function checkUnique(arr, paths) {
  let map = {};
  for (let obj of arr) {
    if (hasAttr(obj, paths)) {
      let val = getAttr(obj, paths);
      if (map[val]){
        return false;
      } else {
        map[val] = true;
      }
    }
  }
  return true;
}


function columnsValidator(arr, name = 'columns') {
  if (!checkRequired(arr, ['prop'])) {
    console.warn(`${name}:缺少'prop'属性`);
    return false;
  }
  if (!checkUnique(arr, ['prop'])) {
    console.warn(`${name}:'prop'属性的值必须唯一`);
    return false;
  }
  return true;
}
function mergeColumnsValidator(arr, name = 'merge-columns') {
  if (columnsValidator(arr, name)) {
    let flag = arr.some(obj=>{
      if (Array.isArray(obj.merge)) {
        if (obj.merge.includes(obj.prop)) {
          console.warn(`${name}:'merge'属性的值不能包含自身`, obj);
          return true;
        }
      }
    });
    if (!flag) {
      return true;
    }
  }
}

module.exports = {
  columnsValidator,
  mergeColumnsValidator
};
