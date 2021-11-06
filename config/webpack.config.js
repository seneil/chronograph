const path = require('path');

const root = path.join(__dirname, '../');
const application = path.join(root, 'application');
const output = path.join(root, 'public');

module.exports = ({ mode }) => {

  const config = {
    mode,
    context: application,
    entry: {
      application: [
        path.join(root, 'application/index'),
      ],
    },
    resolve: {
      alias: {
        application,
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
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  };

  return config;
};

