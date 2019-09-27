/* eslint-disable no-new-object */
/**
 * （组件内的http请求策略）
 * 给其他组件提供dj_api_extend, dj_post, dj_get方法，调用dj_api_extend, dj_post和dj_get方法进行请求数据时，
 * 连续发送相同地址的请求时，只会发送一个请求。在上一个同地址的请求未结束时
 * 发送新请求，上个请求将被取消。在组件销毁时未结束的请求也会被取消。
 */
// import apiService from "@/http";
import { CancelToken } from "../httpFactory";
export default {
  data() {
    return {
      CancelTokenMap: new Map()
    };
  },
  destroyed() {
    this.cancel_all_request();
  },
  activated() {
    // console.log('activated');
    // this.reset_cancel_token();
  },
  deactivated() {
    // console.log('deactivated');
    // this.cancel_all_request();
  },
  methods: {
    dj_api_extend(fn, value = {}) {
      let cancelToken = CancelToken.source();
      this.cancel_token(fn);
      this.CancelTokenMap.set(fn, cancelToken);
      value = new Object(value);
      value.cancelToken = cancelToken;
      return fn(value);
      // if (fn) {
      //   let temp = fn(...argv);
      //   if (typeof temp === 'function') {
      //     let cancelToken = CancelToken.source();
      //     this.cancel_token(fn);
      //     this.CancelTokenMap.set(fn, cancelToken);
      //     return temp(cancelToken);
      //   } else {
      //     return temp;
      //   }
      // }
    },
    // /**
    //  * 组件内post请求
    //  * @param url 必传
    //  * @param param
    //  * @param callback
    //  * @param service
    //  * @returns {Promise<any>|*}
    //  */
    // dj_post(obj) {
    //   /**
    //    * 连续发送相同地址的请求时，只会发送一个请求。
    //    * 在上一个同地址的请求未结束时发送新请求，上个请求将被取消
    //    */
    //   if (obj && obj.url) {
    //     let cancelToken = CancelToken.source();
    //     let key = obj.url + '-post';
    //     this.cancel_token(key);
    //     this.CancelTokenMap.set(key, cancelToken);
    //     return apiService.djPost(obj.url, obj.param, obj.callback, obj.service, cancelToken);
    //   }
    // },
    // /**
    //  * 组件内get请求
    //  * @param url 必传
    //  * @param param
    //  * @param callback
    //  * @param service
    //  * @returns {Promise<any>|*}
    //  */
    // dj_get(obj) {
    //   /**
    //    * 连续发送相同地址的请求时，只会发送一个请求。
    //    * 在上一个同地址的请求未结束时发送新请求，上个请求将被取消
    //    */
    //   if (obj && obj.url) {
    //     let cancelToken = CancelToken.source();
    //     let key = obj.url + '-get';
    //     this.cancel_token(key);
    //     this.CancelTokenMap.set(key, cancelToken);
    //     return apiService.djGet(obj.url, obj.param, obj.callback, obj.service, cancelToken);
    //   }
    // },
    /**
     * 取消请求
     * @param url
     */
    cancel_token(key) {
      if (key !== undefined || key !== null) {
        let source = this.CancelTokenMap.get(key);
        if (source) {
          source.cancel();
          this.CancelTokenMap.delete(key);
        }
      }
    },
    /**
     * 取消所有请求
     */
    cancel_all_request() {
      this.CancelTokenMap.forEach((cancelToken)=>{
        cancelToken.cancel();
      });
      this.CancelTokenMap.clear();
      // Object.keys(this.CancelTokenMap).forEach(key=>{
      //   this.CancelTokenMap[key].cancel();
      // });
      // this.CancelTokenMap = {};
    },
    // /**
    //  * 重置CancelToken
    //  * @param url
    //  */
    // reset_cancel_token(url) {
    //   delete this.CancelTokenMap[url];
    //   this.CancelTokenMap[url] = CancelToken.source();
    // }
  }
};
