<script>
  export default {
    data() {
      return {
        imgs: [
          'https://oa.djcps.com/DJOA/images/company/news.png', 
          'https://oa.djcps.com/DJOA/downloadFileCommon.do?fileUuid=995c8b3f-a846-463b-b206-31ea20ab27fc',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABXCAYAAABxyNlsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM3OTg1N0ZFRUFEMjExRTdBOENEQjUxNDNBM0QwNjlGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM3OTg1N0ZGRUFEMjExRTdBOENEQjUxNDNBM0QwNjlGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzc5ODU3RkNFQUQyMTFFN0E4Q0RCNTE0M0EzRDA2OUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc5ODU3RkRFQUQyMTFFN0E4Q0RCNTE0M0EzRDA2OUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5wSPa9AAAMQ0lEQVR42uxd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'
        ]
      };
    }
  };
</script>

<style lang="less" scoped>
  .wrapper {
    height: 400px;
  }
</style>

## djPicturePreview
图片预览组件,实现图片的缩放，旋转，拖动等功能

### 用法
所有图片初始时会居中，分辨率过大的图片的默认大小会被设置到刚好能显示全图片，分辨率过小的图片不会被放大到占满容器。
:::demo 
```html
<template>
  <div class="wrapper">
    <dj-picture-preview :imgs="imgs"></djPicturePreview>
  </div>
</template>
<script>
  export default {
      data() {
        return {
          imgs: [
            'https://oa.djcps.com/DJOA/images/company/news.png', 
            'https://oa.djcps.com/DJOA/downloadFileCommon.do?fileUuid=995c8b3f-a846-463b-b206-31ea20ab27fc',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABXCAYAAABxyNlsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM3OTg1N0ZFRUFEMjExRTdBOENEQjUxNDNBM0QwNjlGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM3OTg1N0ZGRUFEMjExRTdBOENEQjUxNDNBM0QwNjlGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzc5ODU3RkNFQUQyMTFFN0E4Q0RCNTE0M0EzRDA2OUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc5ODU3RkRFQUQyMTFFN0E4Q0RCNTE0M0EzRDA2OUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5wSPa9AAAMQ0lEQVR42uxd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'
          ]
        };
      }
    };
</script>
<style lang="less" scoped>
  .wrapper {
    height: 400px;
  }
</style>
```
:::

### djPicturePreview 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| imgs | 图片地址或base64数据组成的数组 | Array | —— | [] |
| max-rate | 最大缩放比 | Number | >1 | 5 |
| min-rate | 最小缩放比 | Number | >0 | 0.2 |
| enlarge-rate | 控制每次放大的比例 | Number | >0 | 0.2 |
| narrow-rate | 控制每次缩小的比例 | Number | >0 | 0.2 |
| wheel-rate | 控制滚轮的缩放比 | Number | >0 | 0.1 |
