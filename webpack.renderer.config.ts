import path from 'path';

import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  module: { rules },
  plugins,
  resolve: {
    alias: {
      '@frontend': path.resolve(__dirname, './frontend'),
      '@constants': path.resolve(__dirname, './constants'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.sass'],
  },
};
