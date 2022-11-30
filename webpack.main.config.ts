// eslint-disable-next-line @typescript-eslint/no-var-requires
const relocateLoader = require('@vercel/webpack-asset-relocator-loader');

import type { Compiler, Compilation, Configuration } from 'webpack';

import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  entry: './application/main.ts',
  module: { rules },
  plugins: [
    {
      apply(compiler: Compiler): void  {
        compiler.hooks.compilation.tap('webpack-asset-relocator-loader', (compilation: Compilation) => {
            relocateLoader.initAssetCache(compilation, 'native_modules');
          },
        );
      },
    },
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.sass', '.json'],
  },
};
