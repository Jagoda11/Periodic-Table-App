import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        diagnostics: false,
        isolatedModules: true,
        tsconfig: '<rootDir>/tsconfig.jest.json'
      }
    ],
    '.*\\.(vue)$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/playwright-tests/', '/cypress-tests/', '/dist/'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons']
  }
};

export default config;
