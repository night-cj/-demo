import BaseApi from './baseApi';
import configCheck from './configCheck';
import {transError, defaultExecOn} from './defaultConfig';
import {getObjectType, checkType} from '../utils/methods';

/**
 * 向option中加入传参
 * @param option
 * @param method
 * @param param
 */
function addParams(option, method, param) {
  /get|delete|head/.test(method) && (option.params = param);
  /post|put|patch/.test(method) && (option.data = param);
}

/**
 * 执行传入的配置项中的on前缀的方法
 * @param config
 * @param functionName
 * @param res
 */
function execOnFunction(config = {}, functionName, res) {
  defaultExecOn(functionName, res);
  let func = config[functionName];
  if (getObjectType(func) === '[object Function]') {
    func(res);
  }
}

/**
 * 请求处理逻辑
 * @param baseApi
 * @param method
 * @param config
 * @returns {function(*, *, *=, *=, *)}
 */
function createHttpFn(baseApi, method, config) {
  return (url, param, source) => {
    return new Promise((resolve, reject) => {
      let option = {
        ...config,
        url,
        method,
        cancelToken: source ? source.token : null,
      };
      addParams(option, method, param);
      baseApi(option).then(res => {
        execOnFunction(config, 'onResponse', res, option);
        // 当接口返回的数据中没有success字段时，返回data整体，为了兼容文件下载
        if (checkType(res.data, 'Blob')) {
          resolve(res.data);
        } else {
          try {
            if (res.data.success) {
              resolve(res.data.data);
            } else {
              execOnFunction(config, 'onFailure', res.data, option);
              reject(res.data);
            }
          } catch (e) {
            console.error('-- 后端数据返回出错：' + e);
            reject(res);
          }
        }
      }).catch(e => {
        if (e.response || e.code === 'ECONNABORTED') {
          // then解析出错时，会被catch捕获
          let err = transError(e);
          execOnFunction(config, 'onError', err, option);
          // execOnFunction(config, 'onFailure', err, option);
          reject(e);
        }
      });
    });
  };
}

/**
 * http请求对象
 * @param config
 */
function HttpFactory(config = {}) {
  configCheck(config);
  const baseApi = new BaseApi(config);
  return {
    post: createHttpFn(baseApi, 'post', config),
    get: createHttpFn(baseApi, 'get', config),
    put: createHttpFn(baseApi, 'put', config),
    'delete': createHttpFn(baseApi, 'delete', config),
    head: createHttpFn(baseApi, 'head', config),
    patch: createHttpFn(baseApi, 'patch', config),
    download_post: createHttpFn(baseApi, 'post', {...config, responseType: 'blob'}),
    download_get: createHttpFn(baseApi, 'get', {...config, responseType: 'blob'}),
    // post_upload: createHttpFn(baseApi, 'post_upload', config),
  };
}

export default HttpFactory;

