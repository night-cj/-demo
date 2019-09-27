import HttpFactory from './httpFactory';

export default function djService(httpConfig, modelConfig) {
  const apiService = new HttpFactory(httpConfig);
  function baseApi(service, value = {}, method = 'post') {
    let { cancelToken } = value;
    delete value.cancelToken;
    return apiService[method](service, value, cancelToken);
  }
  function baseService(base) {
    return (url, param, method) => {
      let service = base + url;
      return baseApi(service, param, method);
    };
  };
  return modelConfig.reduce((sum, item) => {
    sum[item.name] = baseService(item.url);
    return sum;
  }, {});
}
