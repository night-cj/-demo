// 默认配置
export const NOT_FINED_URL = '/404';
export const SERVICE_ERROR_URL = '/500';
export const _isLogin = function() {
  return true;
};
export const _login = function() {
  return Promise.reject(SERVICE_ERROR_URL);
};
export const _whiteListing = [NOT_FINED_URL, SERVICE_ERROR_URL];
