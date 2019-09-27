<style>
  .demo-custom {
    margin-bottom: 10px;
    margin-left: 10px;
  }
</style>
<script>
import { djForm } from '../../../../package/index';
const { rules } = djForm;
  export default {
    data() {
      return {
        formData: {
          edu: ['chu'],
          name: 'aaa',
          hobby: [1],
          birthday: new Date(),
          sexy: '3'
        },
        formOptions: [
          {
            type: 'input',
            formItem: { 
              prop: 'name',
              label: '姓名',
              rules: []
            },
            attrs: {
              type: 'textarea',
              height: 135
            }
          }, 
          {
            type: 'select',
            formItem: {
              prop: 'edu',
              label: '学历',
              rules: []
            },
            attrs: {
              type: 'multiple',
              default: ['chu','gao','da'],
              options: [{
                label: '初中',
                value: 'chu'
              }, {
                label: '高中',
                value: 'gao'
              }, {
                label: '大学',
                value: 'da'
              }]
            }
          },
          {
            type: 'date',
            formItem: {
              prop: 'birthday',
              label: '生日',
              rules: []
            },
            attrs: {
              type: 'date'
            }
          },
          {
            type: 'checkbox',
            formItem: {
              prop: 'hobby',
              label: '爱好',
              rules: []
            },
            attrs: {
              keyMap: {
                label: 'name'
              },
              options: [{
                name: '打篮球',
                value: 1
              }, {
                name: '打游戏',
                value: 2
              }, {
                name: '看电视',
                value: 3
              }]
            }
          },
          {
            type: 'radio',
            formItem: {
              prop: 'sexy',
              label: '性别',
              rules: []
            },
            attrs: {
              options: [{
                label: '男',
                value: '1'
              }, {
                label: '女',
                value: '2'
              }, {
                label: '秀吉',
                value: '3'
              }]
            }
          },
          {
            type: 'switch',
            formItem: {
              prop: 'switch',
              label: '开关'
            }
          }
        ],
        formData2: {},
        formOptions2: [
          {
            type: 'input',
            formItem: { 
              prop: 'name',
              label: '姓名',
              rules: [rules.required('姓名不能为空')]
            }
          },
          {
            type: 'input',
            formItem: {
              prop: 'phone',
              label: '手机',
              rules: [{required: true, message: '手机不能为空', trigger: 'change'}, rules.phone]
            },
          },
          {
            type: 'input',
            formItem: {
              prop: 'numberTest',
              label: '数字框',
              rules: [{required: true, message: '输入为空', trigger: 'change'}, {type: 'number', message: '不是数字', trigger: 'change'}]
            },
            attrs: {
              type: 'number'
            }
          }
        ],
        formData3: {},
        formOptions3: [
          {
            type: 'custom',
            formItem: {
              prop: 'inputGroup',
              label: '输入框组',
              rules: []
            },
            component: {
              props: {
                value: {
                  type: Object,
                  default: () => ({})
                }
              },
              data() {
                return {
                  value1: '',
                  value2: '',                  
                };
              },
              render(h) {
                const handleChange = (val, name) => {
                  this[name] = val;
                  this.$emit('input', {
                    value1: this.value1,
                    value2: this.value2
                  });
                };
                return (
                  <div>
                    <el-input class="demo-custom" value={this.value1} on-input={(val)=>handleChange(val, 'value1')}></el-input>
                    <el-input class="demo-custom" value={this.value2} on-input={(val)=>handleChange(val, 'value2')}></el-input>
                  </div>
                );
              }
            }
          },
          {
            type: 'custom',
            formItem: {
              prop: 'selectGroup',
              label: '选择框组',
              rules: []
            },
            component: {
              props: {
                value: {
                  type: Array,
                  default: () => []
                }
              },
              data() {
                return {
                  value1: '',
                  value2: '',                  
                };
              },
              render(h) {
                const handleChange = (val, name) => {
                  this[name] = val;
                  this.$emit('input', [this.value1, this.value2]);
                };
                return (
                  <div>
                    <el-select class="demo-custom" value={this.value1} on-change={(val)=>handleChange(val, 'value1')}>
                      <el-option value="1" label="1"></el-option>
                      <el-option value="2" label="2"></el-option>
                      <el-option value="3" label="3"></el-option>
                    </el-select>
                    <el-select class="demo-custom" value={this.value2} on-change={(val)=>handleChange(val, 'value2')}>
                      <el-option value="4" label="4"></el-option>
                      <el-option value="5" label="5"></el-option>
                      <el-option value="6" label="6"></el-option>
                    </el-select>
                  </div>
                );
              }
            }
          },
          {
            type: 'base-table',
            formItem: {
              prop: 'table',
              label: '表格',
              rules: []
            },
            attrs: {
              data: [[1,2,3],[4,5,6],[7,8,9]],
              columns: [{
                prop: '0',
                label: '0'
              },{
                prop: '1',
                label: '1'
              },{
                prop: '2',
                label: '2'
              }]
            }
          },
          {
            type: 'custom',
            formItem: {
              prop: 'button',
              label: '按钮',
              rules: []
            },
            render(){
              return (
                <div>
                  <el-button type="primary" size="medium">按钮1</el-button>
                  <el-button type="primary" size="medium">按钮2</el-button>
                </div>
              );
            }
          }
        ],
        formData4: {},
        formData5: {},
        formOptions5: [
          {
            type: 'input',
            formItem: {
              prop: 'name',
              label: '姓名'
            },
            linkListeners: {
              edu: {
                input(nameValue, currentComponent) {
                  console.log('edu改变值：' + nameValue);
                  console.log('当前监听组件：', currentComponent);
                  console.log('当前监听组件：', this);
                }
              }
            }
          },
          {
            type: 'select',
            formItem: {
              prop: 'edu',
              label: '学历'
            },
            attrs: {
              type: 'single',
              options: [{
                label: '初中',
                value: 'chu'
              }, {
                label: '高中',
                value: 'gao'
              }, {
                label: '大学',
                value: 'da'
              }]
            },
            linkListeners: {
              name: {
                input: [
                  function(nameValue, currentComponent) {
                   console.log('name改变值：' + nameValue);
                   console.log('当前监听组件：', currentComponent);
                   console.log('当前监听组件：', this);
                  },
                  function(nameValue, currentComponent) {
                    console.log('-----');
                  }
                ]
              }
            },
            listeners: {
              input() {
                console.log(this);
              }
            }
          }
        ],
        formData6: {},
        formOptions6: [
          {
            type: 'input',
            formItem: {
              prop: 'surname',
              label: '姓'
            }
          },
          {
            type: 'input',
            formItem: {
              prop: 'name',
              label: '名'
            }
          },
          {
            type: 'input',
            formItem: {
              prop: 'fullName',
              label: '全名(自动生成)'
            },
            attrs: {
              disabled: true
            },
            computed() {
              let {surname = '', name = ''} = this.formData;
              return surname + name;
            }
          }
        ],
        disabled: false,
      }
    },
    computed: {
      formOptions4() {
        return [
          {
            type: 'input',
            formItem: { 
              prop: 'name',
              label: '姓名'
            }
          }, 
          {
            type: 'select',
            formItem: {
              prop: 'edu',
              label: '学历'
            },
            attrs: {
              disabled: this.disabled,
              keyMap: {
                label: 'name'
              },
              options: [{
                name: '初中',
                value: 'chu'
              }, {
                name: '高中',
                value: 'gao'
              }, {
                name: '大学',
                value: 'da'
              }]
            }
          },
          {
            type: 'select',
            formItem: {
              prop: 'face',
              label: '政治面貌',
              rules: []
            },
            attrs: {
              disabled: this.disabled,
              keyMap: {
                label: 'name'
              },
              options: [{
                name: '群众',
                value: '1'
              }, {
                name: '团员',
                value: '2'
              }, {
                name: '党员',
                value: '3'
              }]
            }
          },
        ];
      }
    },
    methods: {
      validate() {
        this.$refs.form2.validate();
      },
      getFormData() {
        console.log(this.formData);
      },
      changeDisabled() {
        this.disabled = !this.disabled;
      }
    }
  }
</script>

## djForm
基础表单组件

### 基础表单
:::demo  `formData`在传入时可以带默认值，也可以在`formOptions`的`attrs`属性的`default`下配置默认值，第二种方法的优先级低于第一种。`formOptions`中的`formItem`内的属性将会添加到`<el-form-item>`组件中，`attrs`内的属性会添加到`<el-form-item>`组件下的组件中，如`<el-input>`、`<el-select>`、`<el-checkbox-group>`等等，`subAttrs`内的属性会添加到`<el-form-item>`组件下的组件下的组件中，如`<el-option>`、`<el-radio>`、`<el-checkbox>`等等, `keyMap`可以改变`<djForm>`组件的关键字映射，如当前案例爱好栏的`subList`中使用`name`作为关键字，所以要在`keyMap`中将`lable`属性映射为`name`,否则无法显示`name`中的值
```html
<template>
  <div>
    <dj-form ref="form" :form-data="formData" :form-options="formOptions"></dj-form>
    <el-button type="primary" @click="getFormData">get formData</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData: {
          edu: ['chu'],
          name: 'aaa',
          hobby: [1],
          birthday: new Date(),
          sexy: '3'
        },
        formOptions: [
          {
            type: 'input',
            formItem: { 
              prop: 'name',
              label: '姓名',
              rules: []
            },
            attrs: {
              type: 'textarea'
            }
          }, 
          {
            type: 'select',
            formItem: {
              prop: 'edu',
              label: '学历',
              rules: []
            },
            attrs: {
              type: 'multiple',
              default: ['chu','gao','da'],
              options: [{
                label: '初中',
                value: 'chu'
              }, {
                label: '高中',
                value: 'gao'
              }, {
                label: '大学',
                value: 'da'
              }]
            }
          },
          {
            type: 'date',
            formItem: {
              prop: 'birthday',
              label: '生日',
              rules: []
            },
            attrs: {
              type: 'date'
            }
          },
          {
            type: 'checkbox',
            formItem: {
              prop: 'hobby',
              label: '爱好',
              rules: []
            },
            attrs: {
              keyMap: {
                label: 'name'
              },
              options: [{
                name: '打篮球',
                value: 1
              }, {
                name: '打游戏',
                value: 2
              }, {
                name: '看电视',
                value: 3
              }]
            }
          },
          {
            type: 'radio',
            formItem: {
              prop: 'sexy',
              label: '性别',
              rules: []
            },
            attrs: {
              options: [{
                label: '男',
                value: '1'
              }, {
                label: '女',
                value: '2'
              }, {
                label: '秀吉',
                value: '3'
              }]
            }
          },
          {
            type: 'switch',
            formItem: {
              prop: 'switch',
              label: '开关'
            }
          }
        ]
      }
    },
    methods: {
      getFormData() {
        console.log(this.formData);
      }
    }
  }
</script>
```
:::

### 表单校验
:::demo `djForm`中自带了一些校验规则供用户使用，当然也按照`<el-form>`中的校验规则写自定义规则
```html
<template>
  <div>
    <dj-form ref="form2" :form-data="formData2" :form-options="formOptions2"></dj-form>
    <el-button type="primary" @click="validate">表单校验</el-button>
  </div>
</template>
<script>
import { djForm } from '../../../../package/index';
const { rules } = djForm;
  export default {
    data() {
      return {
        formData2: {},
        formOptions2: [
          {
            type: 'input',
            formItem: { 
              prop: 'name',
              label: '姓名',
              rules: [rules.required('姓名不能为空')]
            }
          },
          {
            type: 'input',
            formItem: {
              prop: 'phone',
              label: '手机',
              rules: [{required: true, message: '手机不能为空', trigger: 'change'}, rules.phone]
            }
          }，
          {
            type: 'input',
            formItem: {
              prop: 'numberTest',
              label: '数字框',
              rules: [{required: true, message: '输入为空', trigger: 'change'}, {type: 'number', message: '不是数字', trigger: 'change'}]
            },
            attrs: {
              type: 'number'
            }
          }
        ]
      }
    },
    methods: {
      validate() {
        this.$refs.form2.validate();
      }
    }
  }
</script>
```
:::

### 自定义组件
:::demo 在自定义组件中需要使用`this.$emit('input', value)`将值更新到表单中，否则不管自定义组件中的值如何改变，表单中的值都不会发生变化。
```html
<template>
  <div>
    <dj-form :form-data="formData3" :form-options="formOptions3"></dj-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData3: {},
        formOptions3: [
          {
            type: 'custom',
            formItem: {
              prop: 'inputGroup',
              label: '输入框组',
              rules: []
            },
            component: {
              props: {
                value: {
                  type: Object,
                  default: () => ({})
                }
              },
              data() {
                return {
                  value1: '',
                  value2: '',                  
                };
              },
              render(h) {
                const handleChange = (val, name) => {
                  this[name] = val;
                  this.$emit('input', {
                    value1: this.value1,
                    value2: this.value2
                  });
                };
                return (
                  <div>
                    <el-input class="demo-custom" value={this.value1} on-change={(val)=>handleChange(val, 'value1')}></el-input>
                    <el-input class="demo-custom" value={this.value2} on-change={(val)=>handleChange(val, 'value2')}></el-input>
                  </div>
                );
              }
            }
          },
          {
            type: 'custom',
            formItem: {
              prop: 'selectGroup',
              label: '选择框组',
              rules: []
            },
            component: {
              props: {
                value: {
                  type: Array,
                  default: () => []
                }
              },
              data() {
                return {
                  value1: '',
                  value2: '',                  
                };
              },
              render(h) {
                const handleChange = (val, name) => {
                  this[name] = val;
                  this.$emit('input', [this.value1, this.value2]);
                };
                return (
                  <div>
                    <el-select class="demo-custom" value={this.value1} on-change={(val)=>handleChange(val, 'value1')}>
                      <el-option value="1" label="1"></el-option>
                      <el-option value="2" label="2"></el-option>
                      <el-option value="3" label="3"></el-option>
                    </el-select>
                    <el-select class="demo-custom" value={this.value2} on-change={(val)=>handleChange(val, 'value2')}>
                      <el-option value="4" label="4"></el-option>
                      <el-option value="5" label="5"></el-option>
                      <el-option value="6" label="6"></el-option>
                    </el-select>
                  </div>
                );
              }
            }
          },
          {
            type: 'base-table',
            formItem: {
              prop: 'table',
              label: '表格',
              rules: []
            },
            attrs: {
              data: [[1,2,3],[4,5,6],[7,8,9]],
              columns: [{
                prop: '0',
                label: '0'
              },{
                prop: '1',
                label: '1'
              },{
                prop: '2',
                label: '2'
              }]
            }
          },
          {
            type: 'custom',
            formItem: {
              prop: 'button',
              label: '按钮',
              rules: []
            },
            render(){
              return (
                <div>
                  <el-button size="medium" type="primary">按钮1</el-button>
                  <el-button size="medium" type="primary">按钮2</el-button>
                </div>
              );
            }
          }
        ]
      }
    }
  }
</script>
```
:::

### 自定义布局
:::demo 用法与djGridBox一致
```html
<template>
  <div>
    <h1>分列</h1>
    <dj-form ref="form" :form-data="formData" :form-options="formOptions" :column-num="2"></dj-form>
    <h1>控宽</h1>
    <dj-form ref="form" :form-data="formData" :form-options="formOptions" :col-rule="()=>12"></dj-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData: {
          edu: ['chu'],
          name: 'aaa',
          hobby: [1],
          birthday: new Date(),
          sexy: '3'
        },
        formOptions: [
          {
            type: 'input',
            formItem: { 
              prop: 'name',
              label: '姓名',
              rules: []
            },
            attrs: {
              type: 'textarea'
            }
          }, 
          {
            type: 'select',
            formItem: {
              prop: 'edu',
              label: '学历',
              rules: []
            },
            attrs: {
              type: 'multiple',
              default: ['chu','gao','da'],
              options: [{
                label: '初中',
                value: 'chu'
              }, {
                label: '高中',
                value: 'gao'
              }, {
                label: '大学',
                value: 'da'
              }]
            }
          },
          {
            type: 'date',
            formItem: {
              prop: 'birthday',
              label: '生日',
              rules: []
            },
            attrs: {
              type: 'date'
            }
          },
          {
            type: 'checkbox',
            formItem: {
              prop: 'hobby',
              label: '爱好',
              rules: []
            },
            attrs: {
              keyMap: {
                label: 'name'
              },
              options: [{
                name: '打篮球',
                value: 1
              }, {
                name: '打游戏',
                value: 2
              }, {
                name: '看电视',
                value: 3
              }]
            }
          },
          {
            type: 'radio',
            formItem: {
              prop: 'sexy',
              label: '性别',
              rules: []
            },
            attrs: {
              options: [{
                label: '男',
                value: '1'
              }, {
                label: '女',
                value: '2'
              }, {
                label: '秀吉',
                value: '3'
              }]
            }
          },
          {
            type: 'switch',
            formItem: {
              prop: 'switch',
              label: '开关'
            }
          }
        ]
      }
    }
  }
</script>
```
:::

### 表单配置项动态改变
:::demo 如果表单配置项需要动态改变，建议使用计算属性去定义`formOptions`，如果想直接修改`formOptions`内的属性，请使用`this.$set()`方法修改，否则可能出现数据改变视图不改变的问题。
```html
<template>
  <div>
    <dj-form :form-data="formData4" :form-options="formOptions4"></dj-form>
    <el-button type="primary" @click="changeDisabled">改变置灰状态</el-button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData4: {},
        disabled: false,
      }
    },
    computed: {
      formOptions4() {
        return [
          {
            type: 'input',
            formItem: { 
              prop: 'name',
              label: '姓名'
            }
          }, 
          {
            type: 'select',
            formItem: {
              prop: 'edu',
              label: '学历'
            },
            attrs: {
              disabled: this.disabled,
              keyMap: {
                label: 'name'
              },
              options: [{
                name: '初中',
                value: 'chu'
              }, {
                name: '高中',
                value: 'gao'
              }, {
                name: '大学',
                value: 'da'
              }]
            }
          },
          {
            type: 'select',
            formItem: {
              prop: 'face',
              label: '政治面貌',
              rules: []
            },
            attrs: {
              disabled: this.disabled,
              keyMap: {
                label: 'name'
              },
              options: [{
                name: '群众',
                value: '1'
              }, {
                name: '团员',
                value: '2'
              }, {
                name: '党员',
                value: '3'
              }]
            }
          },
        ];
      }
    },
    methods: {
      changeDisabled() {
        this.disabled = !this.disabled;
      }
    }
  }
</script>
```
:::




### 模块间事件监听
:::demo 在`linkListeners`下可以设置对其他模块的事件的监听，第一层级填写模块名(即prop的值)，第二层级填写事件名。如下例子`edu`为模块名,`input`为该模块的事件名。
```html
<template>
  <div>
    <dj-form :form-data="formData5" :form-options="formOptions5"></dj-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData5: {},
        formOptions5: [
          {
            type: 'input',
            formItem: {
              prop: 'name',
              label: '姓名'
            },
            linkListeners: {
              edu: {
                input: (nameValue, currentComponent)=>{
                  console.log('edu改变值：' + nameValue);
                  console.log('当前监听组件：', currentComponent);
                }
              }
            }
          },
          {
            type: 'select',
            formItem: {
              prop: 'edu',
              label: '学历'
            },
            attrs: {
              type: 'single',
              options: [{
                label: '初中',
                value: 'chu'
              }, {
                label: '高中',
                value: 'gao'
              }, {
                label: '大学',
                value: 'da'
              }]
            },
            linkListeners: {
              name: {
                input: [
                  function(nameValue, currentComponent) {
                   console.log('name改变值：' + nameValue);
                   console.log('当前监听组件：', currentComponent);
                  },
                  function(nameValue, currentComponent) {
                    console.log('-----');
                  }
                ]
              }
            },
            listeners: {
              input: () => {
                console.log(11111);
              }
            }
          }
        ]
      }
    }
  }
</script>
```
:::




### 动态取值
:::demo 
```html
<template>
  <div>
    <dj-form :form-data="formData6" :form-options="formOptions6"></dj-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formData6: {},
        formOptions6: [
          {
            type: 'input',
            formItem: {
              prop: 'surname',
              label: '姓'
            }
          },
          {
            type: 'input',
            formItem: {
              prop: 'name',
              label: '名'
            }
          },
          {
            type: 'input',
            formItem: {
              prop: 'fullName',
              label: '全名(自动生成)'
            },
            attrs: {
              disabled: true
            },
            computed() {
              let {surname = '', name = ''} = this.formData;
              return surname + name;
            }
          }
        ],
      }
    }
  }
</script>
```
:::




### djForm Attributes
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| form-data | 表单数据对象(可在里面设置默认值) | Object | - | {} |
| form-options | 表单配置项 | Array | - | [] |
| type-map | 修改`form-options`属性下`type`属性所对应的组件名 | Object | - | {} |
| column-num | 设置分成几列（传了`row-rule`后该参数失效） | Number | - | 1 |
| row-rule | 控制分行，参数（1:当前模块，2:当前模块在data的index序号），返回当前模块所在行数 | Function | - | - |
| col-rule | 控制占宽，参数（1:当前模块，2:当前模块在data的index序号，3:默认占宽，4:当前行的所有占宽），返回当前模块占宽 | Function | - | - |


### formOptions Attributes
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type(必填) | 表单子项类型（直接写组件名也能渲染出对应的组件） | String | input / select / checkbox / radio / switch / date / custom | - |
| formItem(必填) | 表单内el-form-item的属性配置(该对象中必须要有prop和label属性) | Object | - | - |
| attrs | 当前输入组件需要绑定的属性配置 | Object | - | - |
| listeners | 当前输入组件需要绑定的事件配置 | Object | - | - |
| linkListeners | 设置对其他模块的事件监听 | Object | - | - |
| component | 自定义组件对象（type为'custom'时生效） | Object | - | - |
| render | 自定义函数化组件方法（type为'custom'时生效，优先级比component高） | Function | - | - |
| typeMap | 修改type的值对应使用的组件名称 | Object | - | - |
| computed | 设置当前项的动态值,方法返回当前模块需要展示的值 | Function(obj) | - | - |

### djForm methods
| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| validate | 表单校验方法(校验成功时，执行传入的方法) | fn1(成功回调函数)，fn2（失败回调函数） |
| resetFields | 重置表单（与el-form的clearValidate方法一致）| - |
| clearValidate | 移除表单项的校验结果（与el-form的clearValidate方法一致） | props |
| modifyFormOption | 修改表单配置项属性 | prop: String(配置项的props属性), attrs: String(配置项的第一层属性) , subAttrs(配置项的第二层属性): String, value: any(将要覆盖的值) |
