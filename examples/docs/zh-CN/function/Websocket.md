## Websocket
websocket封装对象

### 作用
创建websocket连接
自动开启断线重连功能
自动发送心跳保持连接不中断

### 要求
后端发送消息时需要固定格式为
```javascript
{
  //type存放事件名
  type: 'eventName',
  //存放数据，不止可以放字符串
  data: '消息内容'
}
```

### 例子

```javascript
import { Websocket } from 'djweb';
//生成实例时需要传入配置项，
let config = {
  //socket连接地址，必填
  wsurl: 'ws://192.168.2.168:8001',
  //socket名称，必填
  name: 'socket',
  // keyMap用于修改消息监听所取的字段，以下为keyMap的默认值
  keyMap: {
    type: 'type',
    data: 'data'
  }
};
let ws = new Websocket(config);
// 设置socket对应消息监听,当后端返回下面这种格式的消息时，就会触发下面的方法，参数msg的值为'xxxx'
// {type: 'cancelApple', data: 'xxxx'}
ws.on('cancelApple', (msg) => {
  console.log('get socket message!', msg);
});
```

### Websocket 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| websock | 原生websocket实例 | WebSocket | - | - |
| socketName | socket名称 | String | - | - |
| createTime | 创建时间 | Date | - | - |
| state | socket状态（控制断连后是否重连） | String | 'alive' / 'dead' | 'alive' |

### Websocket 方法
方法名 | 说明 | 参数
-|-|-
on | 设置socket对应消息监听 | name(自定义事件名)，fn(自定义方法)
removeAllListeners | 移除所有socket消息监听 | -
removeListeners | 移除特定socket消息的特定触发方法或移除特定socket消息的所有触发方法 | name(自定义事件名)，fn(触发方法，可不传)
close | 关闭websocket连接（不会再重连） | -
send | 发送消息 | msg
getList | 获取监听列表 | -


