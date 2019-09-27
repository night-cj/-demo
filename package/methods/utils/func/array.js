/**
 * 判断数组是否有值
 * @param value
 * @returns {boolean}
 */
function hasValue_arr(value) {
  if (value) {
    if (value.length > 0) {
      return true;
    }
  }
  return false;
}

/**
 * 数组内元素交换
 * @param arr
 * @param index1
 * @param index2
 */
function swapItems(arr, index1, index2) {
  if (index1 !== index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  }
  // return arr;
}

/**
 * 数组内元素位置移动
 * @param arr
 * @param index1
 * @param index2
 */
function moveItems(arr, index1, index2) {
  if (index1 > index2) {
    arr.splice(index2, 0, arr[index1]);
    arr.splice(index1 + 1, 1);
  } else if (index1 < index2) {
    arr.splice(index2, 0, arr[index1]);
    arr.splice(index1, 1);
  }
  // return arr;
}

/**
 * 当前序号的数组内元素，与前一个元素交换
 * @param arr
 * @param $index
 */
function upRecord(arr, $index) {
  if ($index === 0) {
    return;
  }
  this.swapItems(arr, $index, $index - 1);
}

/**
 * 当前序号的数组内元素，与下一个元素交换
 * @param arr
 * @param $index
 */
function downRecord(arr, $index) {
  if ($index === arr.length - 1) {
    return;
  }
  this.swapItems(arr, $index, $index + 1);
}

/**
 * 找出两个数组的差集
 * @param arr1
 * @param arr2
 * @param key
 * @returns {Array}
 */
function differenceSet_Arr(arr1, arr2, key) {
  if (!arr1 || !arr2) {
    return [].concat(arr2 || []).concat(arr1 || []);
  }
  let result = [];
  let map = {};
  const setMap = key ? (item) => {
    map[item[key]] = true;
  } : (item) => {
    map[item] = true;
  };
  const getMapitem = key ? (item) => {
    return map[item[key]];
  } : (item) => {
    return map[item];
  };
  for (let i = 0, len = arr1.length; i < len; i++) {
    setMap(arr1[i]);
  }
  for (let i = 0, len = arr2.length; i < len; i++) {
    if (!getMapitem(arr2[i])) {
      result.push(arr2[i]);
    }
  }
  return result;
}
/**
 * 找出两个数组的并集,按arr1的顺序排
 * @param arr1
 * @param arr2
 * @param key
 * @returns {Array}
 */
function sameSet_Arr(arr1, arr2, key) {
  if (!arr1 || !arr2) {
    return [];
  }
  let result = [];
  let map = {};
  const setMap = key ? (item) => {
    map[item[key]] = true;
  } : (item) => {
    map[item] = true;
  };
  const getMapitem = key ? (item) => {
    return map[item[key]];
  } : (item) => {
    return map[item];
  };
  for (let i = 0, len = arr2.length; i < len; i++) {
    setMap(arr2[i]);
  }
  for (let i = 0, len = arr1.length; i < len; i++) {
    if (getMapitem(arr1[i])) {
      result.push(arr1[i]);
    }
  }
  return result;
}

/**
 * 根据对象的属性寻找对象数组中的对象
 * @param {*} array   传入对象数组
 * @param {*} key     对象属性键
 * @param {*} val     对象属性值
 * @returns {object}
 */
function array_find(array, key, val) {
  return array.find(item => item[key] === val);
}

/**
 * 根据对象的属性对对象数组进行排序
 * @param {*} array         传入对象数组
 * @param {*} key           对象属性键
 * @param {true} isForward     是否正向排序，默认正向
 */
function array_sort(array, key, isForward = true) {
  return array.sort(isForward ? (a, b) => a[key] - b[key] : (a, b) => b[key] - a[key]);
}

/**
 * 判断两个数组中的值是否一致
 * @param a
 * @param b
 * @returns {boolean}
 */
function valueEquals(a, b) {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * 将对象数组中每个对象值为null转化成 ''
 * @param dataSource
 */
function dealDataSource(dataSource) {
  for (let item of dataSource) {
    for (let key of Object.keys(item)) {
      // if (/(undefined|null)/g.test(item[key])) {
      if (item[key] === null) {
        item[key] = '';
      }
    }
  }
}

// TODO: use native Array.find, Array.findIndex when IE support is dropped
const arrayFindIndex = function(arr, pred) {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i], i)) {
      return i;
    }
  }
  return -1;
};

const arrayFind = function(arr, pred) {
  const idx = arrayFindIndex(arr, pred);
  return idx !== -1 ? arr[idx] : undefined;
};

export {
  hasValue_arr, //判断数组是否有值
  swapItems, //数组内元素交换
  moveItems, //数组内元素位置变更
  upRecord, //当前序号的数组内元素，与前一个元素交换
  downRecord, //当前序号的数组内元素，与下一个元素交换
  differenceSet_Arr, //找出两个数组的差集
  sameSet_Arr, //找出两个数组的并集,按arr1的顺序排
  array_find, //根据对象的属性寻找对象数组中的对象
  array_sort, //根据对象的属性对对象数组进行排序
  valueEquals, //判断两个数组中的值是否一致
  dealDataSource, //将对象数组中每个对象值为null转化成 ''
  arrayFindIndex, //同Array.findIndex
  arrayFind, //Array.find
};
