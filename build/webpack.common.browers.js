const commonConfig = require('./webpack.common');
const output = Object.assign({}, commonConfig.output, {
  filename: `djweb.common.browers.js`,
  library: 'djweb',
  libraryTarget: 'umd',
  // umdNamedDefine: true
});
module.exports = Object.assign(commonConfig, {
  output,
  externals: [{
    'vue': 'Vue',
    // todo 可能出现外部引入的element组件库与当前组件库项目冲突的问题
    "element-ui": "ELEMENT",
    'axios': 'axios'
  }]
});
