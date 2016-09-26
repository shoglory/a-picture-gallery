// 动态插入 bundle 好的 .js 到 .index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/src/index.html`, //__dirname在nodejs中是根目录的意思
  filename: 'index.html',
  inject: 'body', //这句话的意思将生成的script标签放到body下面
});

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'index_bundle.js',
  },
  module: {
    preLoaders: [{
      test: /\.jsx$|\.js$/,
      loader: 'eslint-loader',
      include: `${__dirname}/src`,
      exclude: /bundle\.js$/
    }],
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        }
      }, {
        test: /\.scss$/,
        loader: "style!css!sass"
      }, {
        test: /\.woff$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot$/,
        loader: "file-loader"
      }, {
        test: /\.svg$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }

      // }, {
      //   test: /\.css$/,
      //   loader: 'style-loader!css-loader'
      // }
    ],
  },
  // 启动开发测试用server设定（不能用在 production）
  devServer: {
    inline: true,
    port: 8008,
  },
  plugins: [HTMLWebpackPluginConfig],
};