## utils
公用方法

### 结构
```json
- common(存放通用方法，在任何项目都能用的公共方法、对象和全局常量)
  - customObject(自定义对象)            
  - func(各种方法)
    - array (对数组的各种处理方法)     
    - object (对对象的各种处理方法)
    - boolean (对布尔值的各种处理方法)
    - date (对日期对象的各种处理方法)
    - dom (对dom的各种处理方法)
    - storage (对浏览器缓存的各种处理方法)
    - special (不属于上面任何一类的通用方法，如金额转大写，文件下载，限流等)
- system(存放系统方法，当前项目特有的公共方法、对象和全局常量)
  - constant (保存常量，如网站客服电话、正则表达式等)
  - enum (保存枚举)
  - func (系统特有公用方法)
- index.js(整合common和system内的内容作统一输出);
```

### 设计思路
- 统一出口，避免utils内部结构发生改变会影响到调用了公用方法的组件；
- 对各种方法、对象和常量做了分类方便管理与维护；

### array 方法
方法名 | 说明 | 参数
-|-|-
hasValue_arr | 判断数组是否有值 | value（Array类型）
swapItems | 数组内元素交换 | arr（Array类型）, index1（位置1）, index2（位置2）
moveItems | 数组内元素位置移动 | arr（Array类型）, index1（移动位置）, index2（目标位置）
upRecord | 当前序号的数组内元素，与前一个元素交换 | arr（Array类型）, index（移动目标位置）
downRecord | 当前序号的数组内元素，与下一个元素交换 | arr（Array类型）, index（移动目标位置）
differenceSet_Arr | 找出两个对象数组的差集 | arr1（对象数组）, arr2（对象数组）, key(对象用于唯一标识的属性)
sameSet_Arr | 找出两个数组的并集,按arr1的顺序排 | arr1（对象数组）, arr2（对象数组）, key(对象用于唯一标识的属性)
array_find | 根据对象的属性寻找对象数组中的对象 | array（对象数组）, key（对象属性）, val（属性值）
array_sort | 根据对象的属性对对象数组进行排序 | array（对象数组）, key（对象属性）, isForward(true正向排序，false反向排序)
valueEquals | 判断两个数组中的值是否一致 | array1（Array类型）, array2（Array类型）
dealDataSource | 将对象数组中每个对象值为null转化成 '' | dataSource（对象数组）
arrayFindIndex | 同Array.findIndex | arr（数组）, fn（处理方法）
arrayFind | 同Array.find | arr（数组）, fn（处理方法）

### object 方法
方法名 | 说明 | 参数
-|-|-
hasOwn | 判断对象是否有某个原型属性 | obj（对象）, key（属性）
toObject | 将数组内对象合并成一个对象 | arr（对象数组）
isObject | 判断是否时对象 | obj
getValueByPath | 取对象中对应属性的值 | object（对象）, path(属性路径以'.'分隔，如'children.groups.id')
deepClone | 深拷贝 | obj(拷贝对象)，ignoreKeyList（不拷贝的属性列表）
getObjKeyValue | 生成对象的标识字符串 | obj(对象), keyList(用于合成唯一值的属性数组)

### boolean 方法
方法名 | 说明 | 参数
-|-|-
coerceBoolean | 变量转boolean | val

### date 方法
方法名 | 说明 | 参数
-|-|-
timeFormat | 格式化时间 | time（规范的时间字符串或时间对象）, format(格式模板，如'yyyy-MM-dd HH:mm:ss')

### dom 方法
方法名 | 说明 | 参数
-|-|-
on | 注册监听事件 | element(dom元素), event（事件名,不加on）, handler（处理方法）
off | 取消监听事件 | element(dom元素), event（事件名,不加on）, handler（处理方法）
once | 注册一个只触发一次的监听事件 | element(dom元素), event（事件名,不加on）, handler（处理方法）
hasClass | 判断dom元素是否含有某个类名 | el(dom元素), cls（类名）
addClass | 给元素添加类名 | el(dom元素), cls（类名）
removeClass | 移除某dom元素的类名 | el(dom元素), cls（类名）
getStyle | 获取dom元素样式 | element(dom元素), styleName(样式名)
setStyle | 给元素设置样式 | element(dom元素), styleName(样式名)， value（样式值）
stopPropagation | 取消冒泡 | evt(事件)
preventDefault | 阻止默认事件 | evt(事件)
addResizeObserverListener | 注册响应式监听（被注册元素的宽高等变化时触发） | el(dom元素),handler(处理方法)
removeResizeObserverListener | 移除ResizeObserver监听 | el(dom元素),handler(处理方法)

### storage 方法
方法名 | 说明 | 参数
-|-|-
getSessionItem | 获取sessionitem，并解析 | key
setSessionItem | 设置sessionitem，若值为空，则删除当前item | key， val
deleteSessionItem | 删除sessionitem | key
getCookiesItem | 获取Cookiesitem，并解析 | key
setCookiesItem | 设置Cookiesitem，若值为空，则删除当前item | key， val
deleteCookiesItem | 删除Cookiesitem | key
clearSession | 清空sessionStorage | -
getLocalStorageItem | 获取localstorage，并解析 | key
setLocalStorageItem | 设置localstorage，并解析 | key， val
removeLocalStorageItem | 移除localstorage，并解析 | key
clearLocalStorage | 清空localstorage，并解析件) | -

### special 方法
方法名 | 说明 | 参数
-|-|-
changeMoney | 数字金额转换中文大写 | val(Number或String类型)
fileDownload | 下载文件方法 | url(下载地址)
base64ToFile | 将base64转换为文件 | base64(base64数据字符串), filename(生成的文件名)
fileToBase64 | 将文件转换为base64（异步），返回一个Promise | file（文件对象）
imgCompress | 图片压缩（异步），返回一个Promise | data(文件对象或base64字符串), type = 'file'(文件数据类型 'file'文件对象，'base64'base64字符串), opt(压缩配置项，如{rate(压缩率): 0.92,maxWidth: 1920,maxHeight: 1080, fileName: 'sss'})
getObjectType | 获取变量的类型 | val
handleUploadParam | 将参数转成FormData | obj（对象）
throttle | 限流 | delay(限流时间), callback（执行函数）
debounce | 防抖 | delay(防抖时间), callback（执行函数）
client | 获取当前环境（浏览器，系统） | —
md | 简单加密、解密 | str(需要加密的内容), boolean = false(false加密，true解密), num = 1(加密层数，数字越大，生成的内容越多), handleErrorFn(报错回调函数)
