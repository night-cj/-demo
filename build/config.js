var path = require('path');
var nodeExternals = require('webpack-node-externals');

var externals = [Object.assign({
  vue: 'vue'
}), nodeExternals()];

exports.externals = externals;

exports.alias = {
  'vue$': 'vue/dist/vue.esm.js',
  '@': path.resolve(__dirname, '../src')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date.\\js/;
