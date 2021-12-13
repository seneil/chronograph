const path = require('path');
const webpack = require('webpack');
const initElectronReloadPlugin = require('webpack-electron-reload');

const root = path.join(__dirname, '../');

const main = path.join(root, 'main');
const output = path.join(root, 'public');

const ElectronReloadPlugin = initElectronReloadPlugin({
  path: path.join(output, 'main.bundle.js'),
});

module.exports = {
  context: main,
  target: 'electron-main',
  entry: {
    main: [
      path.join(main, 'index'),
    ],
    preload: [
      path.join(main, 'preload'),
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    path: output,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    ElectronReloadPlugin(),
  ],
  node: {
    __dirname: false,
  },
};
