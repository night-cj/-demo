const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const config = require('./config');
const fileName = `djweb.common.css`;

const commonConfig = {
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: fileName,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', "postcss-loader"]
        })
        // loader: ExtractTextPlugin.extract("style-loader","css-loader", "postcss-loader")
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', "sass-loader"]
        })
        // loader: ExtractTextPlugin.extract("style-loader","css-loader", "sass-loader")
        // loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', "less-loader"]
        })
        // loader: ExtractTextPlugin.extract("style-loader","css-loader", "less-loader")
        // loaders: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('fonts', '[name].[ext]')
        }
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // new UglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       // 在UglifyJs删除没有用到的代码时不输出警告
    //       warnings: false,
    //       // 删除所有的 `console` 语句，可以兼容ie浏览器
    //       drop_console: true,
    //       // 内嵌定义了但是只用到一次的变量
    //       collapse_vars: true,
    //       // 提取出出现多次但是没有定义成变量去引用的静态值
    //       reduce_vars: true,
    //     },
    //     output: {
    //       // 最紧凑的输出
    //       beautify: false,
    //       // 删除所有的注释
    //       comments: false,
    //     }
    //   },
    //   parallel: true
    // }),
    // new ExtractTextPlugin({
    //   filename: path.posix.join('', fileName),
    //   allChunks: true,
    // }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true }
    }),
  ]
};

const builds = {
  'djweb': {
    entry: './package/components/theme-chalk/src/index.scss',
    outputFilename: 'djweb.common.css'
  },
  'theme': {
    entry: './package/components/theme-element/src/index.scss',
    outputFilename: 'theme.css'
  }
};

function getConfig(name) {
  let config = builds[name];
  commonConfig.entry = config.entry;
  commonConfig.output.filename = config.outputFilename;
  commonConfig.plugins.push(new ExtractTextPlugin({
    filename: path.posix.join('', config.outputFilename),
    allChunks: true,
  }));
  return commonConfig;
}

module.exports = getConfig(process.env.TARGET || 'djweb');
