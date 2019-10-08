const HtmlWebpackPlugin = require('html-webpack-plugin') // html模板插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清空webpack打包的内容插件
console.log(CleanWebpackPlugin)

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js'
  },
  resolve: { // 引入时可省略配置中的后缀
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  devServer: {
    contentBase: './dist', // 打包的文件夹
    stats: 'errors-only',
    compress: false,
    host: 'localhost',
    port: 8089
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist']
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    })
  ]
}
