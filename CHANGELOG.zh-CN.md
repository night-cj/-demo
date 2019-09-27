## 更新日志

### 0.2.15

*2019.09.05*

- baseTable:恢复高亮当前行
- djDialog: 弹框组件增加默认确认键是否禁用属性 loading
- djCollapseTransition: width改变时 bug 修复
- djIcon:新增document、Export图标
- djMultipleCheckbox:添加left-box-title类名及样式调整
- djTimePicker:添加connect-line类名及样式
- baseTable:修改表格高亮当前行状态

### 0.2.14

*2019.09.03*

- methods: 解决addResizeObserverListener方法在使用了removeResizeObserverListener移除了所有监听后，无法重新设置监听的bug

### 0.2.13

*2019.08.30*

- djCheckBox: 增加单个选框禁用功能
- djTable: 设置按钮点击确定后自动收回
- djCascader: 默认获取配置项链式调用promise接口
- djSelect: 删除配置项key属性，保证渲染数据正确
- djDialog:修改弹窗内容距底部或距按钮间距
- djIcon:添加带图标的按钮
- djCollapseTransition: 修复获取组件内容时节点未宽度有时为0的问题
- djCascader: 联级组件新增默认值自动获取配置项功能
- djButton: 新增基础按钮组件
- djInput: 新增'suffixLabel'属性用于直接设置输入框后缀文本
- djInput: 兼容el-input的插槽功能

### 0.2.12

*2019.08.27*



### 0.2.11

*2019.08.26*

- djInput: 输入组件禁用表情输入
- baseTable: 解决表格懒加载图标位置异常的bug
- baseTable: 解决表格在弹框里时省略内容的展示在弹框后面的bug
- djForm: 解决使用checkbox时表单初始化就自动校验的bug
- baseTable: 修改数据为空时的提示展示
- djInput: 修复input 默认长度为20的问题
- djIcon:更新icon图标列表
- djSearch:修改djSearch固定按钮类型及尺寸
- djDialog:1.侧边滚动条靠边，底部隐藏；2.表头间距
- djSearch: 提高遮罩层zLevel等级
- httpFactory: 新增get方式的下载文件
- djTimePicker: 解决input事件每次触发两次的bug

### 0.2.10

*2019.08.13*

- djCascader: 解决无法设置初始值的bug
- methods: fileDownload方法兼容Blob对象下载及文件名自定义
- baseTable: 自定义组件能直接接收到当前块的对应的值,'props'对应的属性为'cur'
- httpFactory: 新增下载方法
- djCascader: 修复checkStrictly 为false 时拿不到选中node项的问题
- djInput: 解决valueKey属性没有向下传递给el-select的bug
- djSelect: 解决开启多选且collapse-tags为true时，已选择tag内容永远显示省略号的bug
- baseTable: 操作列类名td-btn-group下的a标签之间插入空白span元素自动增加间距和竖线样式（#49 @hzk）
- djCascader: 暴露选中节点事件，传出选中节点

### 0.2.9

*2019.08.05*

- baseTable:修改禁用a标签样式
- button:修改不同尺寸的button按钮宽度
- baseTable: 判断是否滚动到底方法新增5px的容错
- baseTable: 解决使用maxHeight时无法使用滚动加载的问题
- djSelect: 开启多选时新增特殊类名select-ellipsis-multi-col、select-ellipsis-multi，防止内容超出
- djInput: type 为 float 时 不去转number
- httpFactory: onResponse,onFailure,onError新增第二参数（接口配置对象，包括请求类型，请求地址）
- baseTable: 解决height设置100%失效的bug
- djForm: formOptions新增computed属性用于设置自动取值
- djForm: 新增formOptions的对象不写type时默认显示文本功能
- djContentBox: 修复内容组件内容区内容超出后不出滚动条的问题

### 0.2.8

*2019.07.26*

- djItemBox:删除dj-input-content类的宽度，修改label行高
- button:修改button按钮组件不同属性时的样式
- djDialog:修改djDialog中el-col-类样式
- djSearch: 搜索组件样式微调整
- djSearch:更新djSearch.md对自定义组件新增size属性的说明
- djSearch:增加对custom组件是否为长元素的判断
- djSearch: 搜索框高度修改
- djSearch: mask position 改 absolute
- djCascader: 联级组件增加宽度width 传参
- djSearch: 添加遮罩层（无背景颜色）

### 0.2.7

*2019.07.25*

- permission: 所有通配符路径且不带重定向的路由均自动生成重定向
- djForm: 修改label的默认宽度为120px

### 0.2.6

*2019.07.24*

- permission: 修复router实例初始没有路由时permission方法内部报错的bug
- djSearch:格式修改满足eslint要求
- djcontentBox: 去除内边距属性
- djSearch: 优化searchHeight方法
- djSearch: 优化响应式调节search组件高度
- djCascader: 增加最后项判断，不再去调用下一次远程加载方法
- djForm: 1.修改el-form-item类样式 2.添加表单输入框样式 3.删除label-width 4.删除djform中el-form-item_content类样式
- djItemBox: 移除djItemBox行内样式，改为外部引入(#45 @crx)
- djDialog: 1.添加滚动条组件2.添加媒体查询功能
- djContentBox: 1.删除box-header组件2.添加底部版本及样式
- permission: 新增getPermission方法返回值格式校验，新增对通配符路由自动添加有权限的重定向路径
- djPaging: 修改page-size-list属性默认值，page-size属性默认值改为page-size-list的第一个值
- djGridBox: 解决使用快速分列时，最后一列数量不满时，会出现宽度与其他模块不同的问题
- baseTable: 解决内容省略后鼠标移上去tooltip不展示的bug（本质为table中包含了Vue对象的问题）

### 0.2.5

*2019.07.19*

- methods: 解决deepClone方法深拷贝对象时，如果对象中有属性的值为undefined或null，则会报错的bug
- djCascader: 联级组件升级
- djContentBox: 内容框去掉border-radius

### 0.2.4

*2019.07.19*

- djDialog: 解决点击取消按钮时触发两次关闭事件的问题
- djSearch: 搜索组件混入响应式布局mixin
- djContentBox: 根据ui修改内容框样式
- djItemBox: 根据ui修改label 宽度和控件宽度逻辑
- djTimePicker: 时间组件宽度修改为自适应
- baseTable: 基于element-ui@2.9.2的table更新组件
- methods: 新增公共方法arrayFindIndex，arrayFind，debounce
- djForm: 解决身份证校验不准确的bug
- djSelect: 修复select bindObject属性为false时 值为零或者'' 或者 false 时绑定值为对象的问题
- djSelect: 组件高度默认size 改 medium 适应ui组件规范36px高度
- baseTable: 新增merge-columns用于实现多级表头
- methods: 解决deepClone无法深拷贝的bug
- baseTable: 解决同时开启懒加载和滚动加载时，加载动画和最后一行有部分重合的bug
- baseTable: 解决出现懒加载动画时悬浮列与正常列错位的bug
- djPaging: 默认展示总条数和跳页布局
- mixins: 导出renderBase混入
- baseTable: 解决修改特殊列宽度后表格宽度计算时仍用默认宽度计算的bug

### 0.2.3

*2019.07.12*

- baseTable: 1.修改scroll样式位置并更名为djtable-scroll,2.删除对应组件样式
- djIcon: 新djIcon组件及样式
- baseTable: 删除scroll标签right定位
- djIcon: 引入common图标库图标
- djMultipleCheckbox: 解决开启远程获取时直接点击全选复选框无法全选的bug
- baseTable: 解决有横向滚动条时悬浮列的高度短了一个滚动条的高度的bug
- theme:element样式修改--1.djCascader样式错位2.djTimePicker选中背景色
- djTimePicker: 新增属性before-change用于拦截值的变化
- djTimePicker: picker-options属性的内部属性采用合并方式（#39 @hzk）
- djBaseTable: 树结构配置项folderIcon默认改为''
- djSelect: 新增bindObject属性用于绑定对象
- djSearch: config属性新增模块间事件监听属性linkListeners
- djItemBox: 支持插槽设置模块
- djForm: formOptions属性新增模块间事件监听属性linkListeners
- djMultipleCheckbox: 解决同时设置默认值和远程获取子项时，子项没有默认选中的bug（#41 @hzk）
- baseTable: 删除slotAppend，judgeScorll属性，新增lazyRemote、lazyTotal用于懒加载
- serviceInput: 修复不能使用输入值检索的问题
- serviceInput: 修复 serviceInput 组件不能绑定值的问题，新增自定义模板写法
- djSelect: 修复 option 改变时组件内不更新 options 选项的问题
- djInput: 文本域下标高度过高修复

### 0.2.2

*2019.07.04*

- djTable: 解决往data中新增数据时，新增数据表格不显示的bug
- baseTable: 解决滚动加载初始化渲染行数异常的bug
- djForm: validate方法新增错误回调方法参数
- baseTable: 解决复选框置灰时，点击全选仍能选中的bug(#38 @hzk)
- baseCss: 降低局部loading动画的堆叠权重（#35 @csl）
- baseTable: 解决部分情况下设置height后，列宽无限增加的bug(#35 @csl)
- djInput: 修复类型为 number 时，返回的是string类型的问题(issue: #37)
- djSelect: 修复select-item 事件传出值错误的问题
- djWaterfallBox: 修复data长度为0时 不重置的问题
- djSearch: 增加单个 item 项的listeners 配置，向下监听事件
- waterFallItem: 瀑布流容器 代码调整优化
- waterFallItem: 瀑布流容器 增加支持自适应分列功能
- djTable: 解决height:100%失效问题
- baseTable: 解决height:100%失效问题（#27 @hzk）
- djInput: 支持原生type类型（除number）（#34 @youxiang0411）
- djSearch: 修复搜索组件默认值为引用对象时，重置后不重新赋值的问题
- methods: 修复deepClone方法深拷贝数组后，生成的值是个对象的bug
- methods: checkType方法支持多类型判断
- djSelect: 解决无法赋默认值的问题（#32 @youxiang0411）
- methods: 新增checkType方法
- djForm: 支持自定义栅格布局（用法与djGridBox一致）（#24 @ysc）
- djGridBox: 新增栅格布局容器组件
- djTimePicker: 时间范围清空时返回空数组而不是null(#30 @hzk)
- djTimePicker: 时间范围选择新增默认快捷选择项(#28 @hzk)
- djSearch: 新增事件before-reset
- djTimePicker: 解决无法设置默认值的bug
- djRadio: 解决初始化时，如果绑定值为undefined且default设置了值时，绑定值没有更为默认值的bug
- djInput: 解决设置正则时如果默认值不符合正则，输入框无法再输入内容的bug
- djInput: default设置的默认值优先级比绑定时传入的默认值低
- djCheckbox: 解决无法设置默认值的bug
- djCascader: 新增 djCascader 控件
- djDialog: 样式优化
- djSearch: 修复搜索组件默认值为引用对象时，重置后不重新赋值的问题

### 0.2.1

*2019.06.26*

- djSelect: 下拉框组件增加 select-item 向外暴露当前选择项事件
- djDialog: 修复弹窗组件嵌套后遮罩层覆盖后一次弹窗的问题
- init：创建主题模块，组件库样式后续全部提取到该模块中
- djPaging: 解决页码过大时内容溢出的bug(#23 @骆亚南)
- baseTable: 使用‘tree’特殊列时产生默认缩进不再需要在数据中手动指明该行的缩进
- baseTable: 解决特殊列‘tree’展开时底部行图标消失的bug, 使用‘tree’特殊列时不再需要在数据中指明父的唯一值，即parentKey字段被废弃
- Websocket: 新增websocket封装类
- djSelect: 修复v-model为0时，初始化无法正常显示label（issue #17）
- djWaterfallBox: 瀑布流容器开放视图更新方法，重新渲染dom
- Subject: 固定方法内部this指向实例对象
- Subject: Observer改名为Subject,on方法改为listen，emit方法改为trigger,新增hasListen和getList方法
- permission: 新增默认配置isLogin默认返回true,login方法默认失败跳转/500路由
- baseTable: columns属性的每个对象的唯一标识符从label的值改为prop的值
- djSwitch: 修复switch 只能关不能开的问题

### 0.2.0

*2019.06.14*

- djInput: 优化input框输入限制逻辑
- djSearch: md 文档更新
- djInput: 文本域下标位置调整
- djSwitch: 修复开关组件绑定了input事件为undefined时报错的问题
- dateRange: 修复时间组件绑定了input事件为undefined时报错的问题
- djSelectBox: 优化下拉容器的下拉动画实现逻辑
- djSearch: 优化search组件样式
- djItemBox: type、component属性用法修改，新增render、typeMap、attrs属性，这些属性用法与djForm的formOptions属性内的type等属性用法一致
- djForm: formOptions属性下删除subAtrrs、subListeners、keyMap、subList，新增render
- djInput: 修复传入number属性时直接使用原生number的问题
- djSearch: 增加条件改变事件触发
- dateRange: 支持element原生事件绑定
- djSwitch: 组件代码优化，简化代码
- djInput: 组件代码优化
- all: 所有组件统一前缀dj(除baseTable)
- baseInput: textarea 富文本编辑器添加高度属性
- listenerPolicy: 修改事件监听策略的默认事件最短触发时间间隔为20ms
- paging: pageNow属性名称修改为pageNo
- paging: 解决部分内容没有水平对齐的问题
- paging: 兼容element方法和事件
- utils: 解决公共方法getSessionItem获得字符串时报错的bug
- baseTimePicker: 时间选择器组件改造，增加默认值功能，修改组件名
- baseSelect: 优化组件中placeholder选项功能，抽离options属性和keyMap属性到mixin中
- betterInput: 优化组件间调用逻辑
- radio: 新增单选框控件
- checkbox: 新增多选框组件
- baseDialog: bind属性改 $attrs
- djInput: 新增autoFormat属性
- search: 将默认使用的组件从baseInput改为itemBox
- baseInput: 移除该组件
- baseSelect: 移除该组件
- djInput: 合并baseSelect组件
- itemBox: 新增输入块容器组件
- permission: 新增配置项属性校验功能
- baseFrom: 优化自动添加placeholder属性的逻辑
- baseTable: 解决特殊列文字位置异常的问题
- djInput: 新增reg属性（正则表达式限制）
- baseDialog: 筛选组件中事件，不绑定到element
- baseDialog: 更新文档信息
- djInput: 新增输入组件（提取自baseInput）
- baseSelect: 增加 position: relative;
- search: 修改监听方法为 listenerPolicy
- baseTable: 解决columns属性中align和headerAlign失效的问题
- baseForm: 结构优化，formOptions内部属性修改bind->attrs,subBind->subAttrs，新增typeKeyMap属性
- baseSelect: 新增keyMap属性用作修改数据列表内对象的key值映射
- baseInput: 修改默认提示语（placeholder）
- permission: 开放getPermission方法报错时自定义跳转路径
- baseTable: el-table的fit属性默认false
- baseMenu: 修复iconfont引入时图标偏移的问题

### 0.1.8

*2019.05.20*

- baseTable: resizeObserver属性默认值改为true，删除对window的resize监听

### 0.1.7

*2019.05.17*

- baseTable: 新增resizeObserver属性，用于控制是否开启响应式监听
- listenerPolice: 引入响应式监听
- utils: 新增响应式监听和移除监听方法（addResizeObserverListener，removeResizeObserverListener）
- baseTable: 解决某些情况下滚动加载异常问题

### 0.1.6

*2019.05.16*

- baseSelect: 增加是否自动获取配置项属性
- multipleCheckBox: 新增multipleCheckBox联级复选框组件
- baseCss: 优化‘select-ellipsis-multi-col’类名下的样式
- baseTable: columns属性新增格式校验
- baseForm: 解决默认select组件内容可以超出问题

### 0.1.5

*2019.05.14*

- baseSelect: 增加must属性，修复多选时选择报错的问题
- baseInput: 修复baseInput 输入框默认值的问题
- baseInput: 增加 switch 组件
- baseDialog: 开放element组件事件
- baseForm: 新增baseForm表单组件

### 0.1.4

*2019.05.09*

- baseSelect: 增加可配置长度width属性
- baseInput: 增加可配置长度width属性
- betterInput: 优化布局样式

### 0.1.3

*2019.05.07*

- djTable: pageNow => pageNo
- baseTable: pageNow => pageNo
- baseSelect: 增加默认值初始化逻辑
- serviceInput: 修复选择项和值相同时不显示的bug
- betterInput: 优化初始化逻辑
- baseDialog: 增加单独替换确认按钮的插槽
- methods: 暴露所有公共方法
- baseSelect: 修复多选时单条内容过长时超出输入框的问题
- djTable: changePage，changeSize，updateData增加参数传递
- picturePreview: 新增图片预览组件
- listenerPolicy: 新增time_range变量用于控制节流时间，新增setTimeRange方法用于设置节流时间，addListener方法新增第四个参数用于设置个别事件的节流时间
- httpFactory: 移除值为null的入参
- methods: 新增公共方法getObjectType（判断变量的类型），handleUploadParam（对象转formData）
- httpFactory: 删除post_upload方法，逻辑优化，解决前端请求超时无法正常报错的问题，新增配置项类型校验

### 0.1.0

*2019.04.22*

- search: 修改组件调用路径
- baseSelect: 移动该组件文件位置
- search: 删除customConfig调用
- dateRange: 优化日期基础组件传参和默认值设定
- search: 组件开放rest-query 事件
- search: 组件支持config内传入component配置生成对应自定义组件，删除组件内slot插槽逻辑

### 0.0.38

*2019.04.10*

- baseDialog: 修复baseDialog 点击确认时触发了两次关闭方法的问题
- baseInput: 修复baseInput maxlength属性传入为空时，下标的显示问题
- djTable: 引入exportChildComponent混入
- mixins：新增组件实例向上级实例传递的混入(exportChildComponent)

### 0.0.37

*2019.04.01*

- baseSelect: 合并serviceSelect和staticSelect组件为baseSelect

### 0.0.35

*2019.03.29*

- permission: 增加权限缓存


### 0.0.34

*2019.03.25*

- 暂无更新内容#1 @gw
