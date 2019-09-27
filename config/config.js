var path = require('path');
// var fs = require('fs');
var nodeExternals = require('webpack-node-externals');
var Components = require('../components.json');
// var saladConfig = require('./salad.config.json');

// var utilsList = fs.readdirSync(path.resolve(__dirname, '../src/utils'));
// var mixinsList = fs.readdirSync(path.resolve(__dirname, '../src/mixins'));
// var transitionList = fs.readdirSync(path.resolve(__dirname, '../src/transitions'));
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`djcpsweb/package/${key}`] = `djcpsweb/lib/${key}`;
});

// externals['djcpsweb/src/locale'] = 'djcpsweb/lib/locale';
// utilsList.forEach(function(file) {
//   file = path.basename(file, '.js');
//   externals[`element-ui/src/utils/${file}`] = `element-ui/lib/utils/${file}`;
// });
// mixinsList.forEach(function(file) {
//   file = path.basename(file, '.js');
//   externals[`element-ui/src/mixins/${file}`] = `element-ui/lib/mixins/${file}`;
// });
// transitionList.forEach(function(file) {
//   file = path.basename(file, '.js');
//   externals[`element-ui/src/transitions/${file}`] = `element-ui/lib/transitions/${file}`;
// });

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;

exports.alias = {
  'vue$': 'vue/dist/vue.esm.js',
  '@': path.resolve(__dirname, '../src')
  // main: path.resolve(__dirname, '../src'),
  // package: path.resolve(__dirname, '../package'),
  // examples: path.resolve(__dirname, '../examples'),
  // 'djcpsweb': path.resolve(__dirname, '../')
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date.\js/;

// exports.postcss = function(webapck) {
//   saladConfig.features.partialImport = {
//     addDependencyTo: webapck
//   };
//   return [
//     require('postcss-salad')(saladConfig)
//   ];
// };
