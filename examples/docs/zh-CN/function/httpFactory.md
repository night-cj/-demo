## httpFactory
对axios的进一步封装

### 要求
要求后端返回一个对象，对象包含code、msg、data、success四个属性
```javascript
// 请求成功
{
  // 响应code码
  code: 10000,
  // 数据存放位置
  data: {
    list: [{},{},{}],
    total: 100
  },
  // 成功或错误提示
  msg: null,
  // 请求成功（true）还是失败(false)
  success: true
}

// 请求失败
{
  // 响应code码
  code: 10000,
  // 数据存放位置
  data: null,
  // 成功或错误提示
  msg: '操作失败',
  // 请求成功（true）还是失败(false)
  success: false
}
```

### 作用
1.对后端的返回做初步的处理筛选出有用的数据，只有在后端返回的数据的success为true时才能使Promise.then中的方法触发（省去了每次写请求都要对success做判断的麻烦），Promise.then中的方法的参数是处理过的数据，即data属性里的数据。  
2.提供取消请求功能（取消了的请求不会触发Promise后续的.then,.catch,.finally方法，阻止无用代码的执行）  
3.自动处理请求参数，删除值为''或null的对象属性  
4.允许通过formData传文件

### 用法
使用httpFactory对象传入配置项，new一个实例，该实例提供post、get、put、delete、head、patch方法

### 例子
httpConfig.js
```javascript
import { Message } from 'element-ui';
//config中可以设置axios的所有配置属性，如baseUrl、timeout
var config = {
    timeout: 10000, //请求超时时间,axios的配置属性
    onResponse(res) { //后端返回数据时执行（不管success时true还是false）
        return res;
    },
    onError(msg) { //请求没有连接上后端时执行
        Message({message: msg, type: 'error', showClose: true});
    },
    onFailure(msg) { //请求没有连接上后端和success为false时执行
        Message(Object.assign({}, {message: msg, type: 'error'}));
    }
};

export default config;
```

apiService.js
```javascript
import { HttpFactory } from 'djweb';
import httpConfig from './httpConfig';
var apiService = new HttpFactory(httpConfig);
export default apiService;
```

apiServiceTest.js
```javascript
import apiService from './apiService';
/**
 * url: url地址
 * params: 参数
 * cancelToken: 取消请求对象，想了解该对象，就去看axios的cancelToken属性，此处不做说明
**/
apiService.post(url, params, cancelToken);
apiService.get(url, params, cancelToken);

//请求在还没返回时被取消，则then、catch、finally内的方法都不会被执行
//参数中只有id会被保留，name和age因为值为''和null，所以在发送请求前会被自动删除
apiService.get('/order/getList.do', {id: 1, name: '', age: null}).then(res=>{
  //success返回true时，进入这里，res为data的值
  console.log(res);
}).catch(e=>{
  //success返回false或http请求直接报错时，进入这里，e为报错信息对象
  //以上两种情况的报错信息对象是不同的，但是都有msg属性，里面存放报错信息
  console.log(e);
}).finally(()=>{
  //除了请求取消的情况，此处都会触发
});
```
