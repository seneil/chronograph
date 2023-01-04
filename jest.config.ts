import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  transformIgnorePatterns: ['node_modules/(?!variables/.*)'],
  testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@application(.*)$': '<rootDir>/application/$1',
    '^@frontend(.*)$': '<rootDir>/frontend/$1',
  },
};

export default config;
