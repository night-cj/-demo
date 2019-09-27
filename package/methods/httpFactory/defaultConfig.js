import {getObjectType} from "../utils/methods";

/**
 * 处理error信息
 * @param err
 * @returns {string|string|string|string|string|string|*}
 */
export function transError(err) {
  if (err.code === 'ECONNABORTED') {
    err.msg = '请求超时';
  }
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.msg = '请求错误';
        break;
      case 401:
        err.msg = '未授权，请登录';
        break;
      case 403:
        err.msg = '拒绝访问';
        break;
      case 404:
        err.msg = `请求地址出错: ${err.response.config.url}`;
        break;
      case 408:
        err.msg = '请求超时';
        break;
      case 500:
        err.msg = '服务器内部错误';
        break;
      case 501:
        err.msg = '服务未实现';
        break;
      case 502:
        err.msg = '网关错误';
        break;
      case 503:
        err.msg = '服务不可用';
        break;
      case 504:
        err.msg = '网关超时';
        break;
      case 505:
        err.msg = 'HTTP版本不受支持';
        break;
      default:
        err.msg = '连接出错';
    }
  }
  return err;
}

const execOn = {
  onResponse(res) { //后端返回数据时执行（不管success时true还是false）
    console.log("defaultExecOn --> onResponse");
  },
  onError(msg) { //请求没有连接上后端时执行
    console.log("defaultExecOn --> onError");
  },
  onFailure(data) { //请求没有连接上后端和success为false时执行
    console.log("defaultExecOn --> onFailure");
    if (data.code === '10001302') {
      if (data.data) {
        setTimeout(() => {
          window.location.href = data.data.loginUrl;
        }, 1000);
      }
    }
  },
};

/**
 * 执行传入的配置项中的on前缀的默认方法
 * @param functionName
 * @param res
 */
export function defaultExecOn(functionName, res) {
  execOn[functionName](res);
}
