## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i djweb -S
```
在项目中可以全部引入也可以按需引入
```javascript
import Vue from 'Vue';
import djweb, { baseMenu } from 'djweb';
// 全部引入（全局）
Vue.use(djweb);
// 按需引入（全局）
Vue.use(baseMenu);
```

