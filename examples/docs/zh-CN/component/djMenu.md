<script>
  export default {
    data() {
      return {
        menus: [
          {
            "path": "/home/k8s-resource",
            "children": [
              {
                "path": "/home/k8s-resource/manageApp",
                "children": [],
                "icon": "el-icon-edit",
                "title": "应用管理",
                "collected": false
              },
              {
                "path": "/home/k8s-resource/manageTemp",
                "children": [],
                "icon": "el-icon-tickets",
                "title": "模板管理",
                "collected": false
              }
            ],
            "icon": "el-icon-document",
            "title": "K8s应用"
          },
          {
            "path": "/home/dbEnvironment",
            "children": [
              {
                "path": "/home/dbEnvironment/appEnv",
                "children": [],
                "icon": "el-icon-menu",
                "title": "应用管理",
                "collected": false
              },
              {
                "path": "/home/dbEnvironment/createEnv",
                "children": [],
                "icon": "el-icon-edit-outline",
                "title": "创建环境",
                "collected": false
              },
              {
                "path": "/home/dbEnvironment/syncData",
                "children": [],
                "icon": "el-icon-refresh",
                "title": "数据同步",
                "collected": false
              }
            ],
            "icon": "el-icon-share",
            "title": "DB环境"
          },
          {
            "path": "/home/basejob",
            "children": [
              {
                "path": "/home/basejob/environment/baseEnv",
                "children": [],
                "icon": "el-icon-tickets",
                "title": "基础环境",
                "collected": false
              },
              {
                "path": "/home/basejob/project/projectType",
                "children": [],
                "icon": "el-icon-setting",
                "title": "工程类型",
                "collected": false
              },
              {
                "path": "/home/basejob/service/servicetype",
                "children": [],
                "icon": "el-icon-service",
                "title": "服务类型",
                "collected": false
              },
              {
                "path": "/home/basejob/autoDeploy",
                "children": [],
                "icon": "el-icon-view",
                "title": "自动化部署",
                "collected": false
              }
            ],
            "icon": "el-icon-share",
            "title": "持续集成"
          },
          {
            "path": "/home/systemSetup",
            "children": [
              {
                "path": "/home/systemSetup/roleManage",
                "children": [],
                "icon": "el-icon-menu",
                "title": "角色管理",
                "collected": false
              },
              {
                "path": "/home/systemSetup/userManage",
                "children": [],
                "icon": "el-icon-document",
                "title": "用户管理",
                "collected": false
              }
            ],
            "icon": "el-icon-setting",
            "title": "系统设置"
          },
          {
            "path": "/home/assetsMange",
            "children": [
              {
                "path": "/home/assetsMange/assetsList",
                "children": [],
                "icon": "el-icon-menu",
                "title": "资产列表",
                "collected": false
              },
              {
                "path": "/home/assetsMange/proxyList",
                "children": [],
                "icon": "el-icon-document",
                "title": "代理列表",
                "collected": false
              },
              {
                "path": "/home/assetsMange/sysUserList",
                "children": [],
                "icon": "el-icon-document",
                "title": "系统用户",
                "collected": false
              }
            ],
            "icon": "el-icon-setting",
            "title": "资产管理"
          }
        ]
      }
    },
  }
</script>
<style lang="less" scoped>
.dj-menu {
  position: relative;
  width: 1200px;
  height: 700px;
}
</style>
## djMenu
基础菜单组件
### 基础菜单
:::demo左侧菜单点击展开和收起交互。收藏常用菜单功能，瀑布流菜单
```html
<template>
  <div class="dj-menu">
    <dj-menu :menus="menus"></dj-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menus: [
          {
            "path": "/home/k8s-resource",
            "children": [
              {
                "path": "/home/k8s-resource/manageApp",
                "children": [],
                "icon": "el-icon-edit",
                "title": "应用管理",
                "collected": false
              },
              {
                "path": "/home/k8s-resource/manageTemp",
                "children": [],
                "icon": "el-icon-tickets",
                "title": "模板管理",
                "collected": false
              }
            ],
            "icon": "el-icon-document",
            "title": "K8s应用"
          },
          {
            "path": "/home/dbEnvironment",
            "children": [
              {
                "path": "/home/dbEnvironment/appEnv",
                "children": [],
                "icon": "el-icon-menu",
                "title": "应用管理",
                "collected": false
              },
              {
                "path": "/home/dbEnvironment/createEnv",
                "children": [],
                "icon": "el-icon-edit-outline",
                "title": "创建环境",
                "collected": false
              },
              {
                "path": "/home/dbEnvironment/syncData",
                "children": [],
                "icon": "el-icon-refresh",
                "title": "数据同步",
                "collected": false
              }
            ],
            "icon": "el-icon-share",
            "title": "DB环境"
          },
          {
            "path": "/home/basejob",
            "children": [
              {
                "path": "/home/basejob/environment/baseEnv",
                "children": [],
                "icon": "el-icon-tickets",
                "title": "基础环境",
                "collected": false
              },
              {
                "path": "/home/basejob/project/projectType",
                "children": [],
                "icon": "el-icon-setting",
                "title": "工程类型",
                "collected": false
              },
              {
                "path": "/home/basejob/service/servicetype",
                "children": [],
                "icon": "el-icon-service",
                "title": "服务类型",
                "collected": false
              },
              {
                "path": "/home/basejob/autoDeploy",
                "children": [],
                "icon": "el-icon-view",
                "title": "自动化部署",
                "collected": false
              }
            ],
            "icon": "el-icon-share",
            "title": "持续集成"
          },
          {
            "path": "/home/systemSetup",
            "children": [
              {
                "path": "/home/systemSetup/roleManage",
                "children": [],
                "icon": "el-icon-menu",
                "title": "角色管理",
                "collected": false
              },
              {
                "path": "/home/systemSetup/userManage",
                "children": [],
                "icon": "el-icon-document",
                "title": "用户管理",
                "collected": false
              }
            ],
            "icon": "el-icon-setting",
            "title": "系统设置"
          },
          {
            "path": "/home/assetsMange",
            "children": [
              {
                "path": "/home/assetsMange/assetsList",
                "children": [],
                "icon": "el-icon-menu",
                "title": "资产列表",
                "collected": false
              },
              {
                "path": "/home/assetsMange/proxyList",
                "children": [],
                "icon": "el-icon-document",
                "title": "代理列表",
                "collected": false
              },
              {
                "path": "/home/assetsMange/sysUserList",
                "children": [],
                "icon": "el-icon-document",
                "title": "系统用户",
                "collected": false
              }
            ],
            "icon": "el-icon-setting",
            "title": "资产管理"
          }
        ]
      }
    }
  }
</script>
```
:::

### 组件配置项
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| menus | 传入菜单数据源 | Array | - | [] |

### menus Attributes
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| icon | 菜单图标 | String | - | null |
| path | 菜单调用路由路径，唯一值，不能与其他菜单名重复 | String | - | null |
| title | 菜单显示的标签名 | String | - | null |
| children | 菜单子菜单属性，子菜单数据和menus格式相同 | Array | - | []或为空 |

### baseTable 事件
| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| switch-menu | 点击菜单时触发 | menu: Object |
