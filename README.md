# djweb
展示页地址：[http://192.168.23.3:8080/](http://192.168.23.3:8080/)
## npm指令
npm仓库地址：[http://192.168.0.236:8081/repository/djcpsnpm-group/](http://192.168.0.236:8081/repository/djcpsnpm-group/) 

安装依赖包前，请先将npm仓库地址改成上面的地址，否则某些依赖包无法下载！！！
``` bash
# 安装依赖包
npm install

# 开启组件展示项目服务
npm run dev

# 打包组件展示项目
npm run build

# 打包组件
npm run build:common

# 打包组件（可通过script方式引入，需要前置依赖包vue,axios,element-ui）
npm run build:common-for-browers

# 发布版本（打包组件-》发布版本-》更新日志）
npm run release

# 代码规范检查（eslint,stylelint,htmlhint）
npm run lint

# js代码规范检查
npm run lint:js

# js代码规范自动修复
npm run fix:js

# style代码规范检查
npm run lint:style

# style代码规范自动修复
npm run fix:style

# html代码规范检查
npm run lint:html

# 单元测试（暂时没有使用，运行会报错）
npm run unit

# 端对端测试（暂时没有使用，运行会报错）
npm run e2e

# 更新日志
npm run updateJournal

# 更新源项目分支
npm run updateSource
```

## 代码提交规范(commit信息规范)
```bash
# 展示页项目修改提交commit规范,内容前加上'[examples]'前缀
[examples] XXXXXXXXXXXXXXX
例:
  [examples] 新增baseTable展示页
  [examples] 修复路由懒加载

# （需要记录到日志中的commit请使用这种规则）组件代码修改提交commit规范，内容前加上'组件名+: '前缀(注：这种类型的commit会在调用更新日志脚本时自动写入日志中)
组件名: XXXXXXXXXXXXXXX
例:
  baseDialog: 修复baseDialog 点击确认时触发了两次关闭方法的问题
  baseInput: 修复baseInput maxlength属性传入为空时，下标的显示问题
  djTable: 引入exportChildComponent混入

# （在以上两种都不适用的情况下才使用）不属于以上两者的提交，提供了6种前缀可供选择：add(添加代码或功能)，mod(修改代码或功能)，opt(优化代码或功能)，del(删除代码或功能)，fix(修复bug)，oth(其他)
[add | del | opt | mod | fix | oth]: XXXXXXXXXXXXXXX
例:
  mod: 修改项目logo，修改项目名
  mod: 修改脚本配置文件
  fix: 修复发布脚本报错问题
```

## 项目整体结构
- auto 脚本的集合（自动发布脚本，自动更新源项目分支脚本，更新日志自动更新脚本）
- examples 组件demo展示页项目
- package 组件、公共方法等输出内容的集合
- build、config webpack配置文件集合
