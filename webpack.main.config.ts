import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const relocateLoader = require('@vercel/webpack-asset-relocator-loader');

import { IgnorePlugin } from 'webpack';
import type { Compiler, Compilation, Configuration } from 'webpack';

import { rules } from './webpack.rules';

const IGNORE_RESOURCES = [
  'pg',
  'pg-native',
  'pg-query-stream',
  'oracledb',
  'mysql2',
  'mysql',
  'tedious',
  'sqlite3',
  'nock',
  'aws-sdk',
  'mock-aws-s3',
];

export const mainConfig: Configuration = {
  entry: './application/main.ts',
  module: { rules },
  plugins: [
    new IgnorePlugin({
      checkResource(resource): boolean {
        return IGNORE_RESOURCES.includes(resource);
      },
    }),
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
    alias: {
      '@application': path.resolve(__dirname, './application'),
      '@constants': path.resolve(__dirname, './constants'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.sass', '.json'],
  },
};
