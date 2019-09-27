## renderBase
render渲染组件的辅助混入

### 作用
为使用render函数渲染的vue组件提供通用方法   
在render函数内不能使用vue的指令，所以某些方法需要自己写，如阻止事件冒泡，取消默认事件，这些方法一般是通用的可以添加到这个文件中做统一管理。

### 用法
通过vue的mixins混入组件中，组件下就能调用这些方法。目前只提供三个方法‘emit’,‘emit_stop’，‘emit_prevent’,用于触发事件的三种方法。（后续可能会加新内容）

### 例子
```javascript
import { renderBase } from 'djweb';
var com = {
    //使用mixins混入后才能使用renderBase的方法
    mixins: [renderBase],
    props: ['row'],
    render() {
      return (
        <div>
          <el-button type="mini" onClick={()=>this.emit($event, 'click1', this.row)}>emit</el-button>
          <el-button type="mini" onClick={()=>this.emit_stop($event, 'click2', '1')}>emit_stop</el-button>
          <el-button type="mini" onClick={()=>this.emit_prevent($event, 'click3', '2', this.disabled)}>emit_prevent</el-button>
        </div> 
      );
    },
    created() {
      this.$on('on-event' , (eventName, params)=>{
        // eventName为 'click1', 'click2'或 'click3'
        // params为 this.row对象, '1'或 '2'
        console.log(eventName, params);
      })
    },
    computed: {
      disabled() {
        return this.row.val !== '2';
      }
    }
  };
```

### renderBase 方法
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| emit | 触发一个'on-event'事件，事件接收事件名称和参数 | event(事件对象)，eventName(事件名称)，params(事件传参), disabled(控制是否触发事件，默认false) |
| emit_stop | 增加事件监听 | 同上 |
| emit_prevent | 取消监听事件 | 同上 |
