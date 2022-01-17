const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const root = path.join(__dirname, '../');

const application = path.join(root, 'application');
const html = path.join(application, 'html');
const output = path.join(root, 'public');

module.exports = {
  context: application,
  target: 'web',
  entry: {
    application: [
      'react-hot-loader/patch',
      path.join(application, 'index'),
    ],
  },
  resolve: {
    alias: {
      application,
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: output,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          { loader: '@linaria/webpack-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
  watchOptions: {
    ignored: ['**/main', '**/node_modules'],
  },
  devServer: {
    hot: true,
    https: true,
    historyApiFallback: true,
    port: 8080,
    static: {
      directory: output,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['application'],
      inject: true,
      favicon: path.join(html, 'favicon.ico'),
      title: 'Chronograph Electron Application',
      template: path.join(html, 'index.html'),
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles-[contenthash].css',
    }),
  ],
};
