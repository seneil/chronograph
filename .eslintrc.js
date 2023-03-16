// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/electron',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [
    '/**/node_modules/*',
    'out/',
    '.git/',
    '.github/',
    '.idea/',
    '.webpack/',
    '.coverage/',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json'],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: {
          resolve: {
            alias: {
              '@frontend': path.resolve(__dirname, './frontend'),
              '@application': path.resolve(__dirname, './application'),
              '@constants': path.resolve(__dirname, './constants'),
              '@assets': path.resolve(__dirname, './assets'),
            },
            extensions: ['.ts', '.tsx'],
          },
        },
      },
    },
    'react': {
      version: '18.2',
    },
  },
  rules: {
    'jsx-quotes': ['error', 'prefer-double'],
    'no-console': 'error',
    'no-mixed-operators': 'error',
    '@typescript-eslint/no-misused-promises': ['error', {
      'checksVoidReturn': false,
    }],
  },
};
