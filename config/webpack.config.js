const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const root = path.join(__dirname, '../');
const application = path.join(root, 'application');
const html = path.join(application, 'html');
const output = path.join(root, 'public');

module.exports = ({ mode }) => {
  const config = {
    mode,
    context: application,
    entry: {
      application: [
        'react-hot-loader/patch',
        path.join(root, 'application/index'),
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
  };

  config.module = {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  };

  if (mode === 'development') {
    config.devtool = 'eval-source-map';
    config.devServer = {
      hot: true,
      https: true,
      static: {
        directory: output,
      },
    };
  }

  config.plugins = [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['application'],
      inject: true,
      favicon: path.join(html, 'favicon.ico'),
      title: 'Chronograph Electron Application',
      template: path.join(html, 'index.html'),
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
  ];

  return config;
};
