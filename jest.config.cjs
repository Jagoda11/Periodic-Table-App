module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1'
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { diagnostics: false, isolatedModules: true }],
    '.*\\.(vue)$': '@vue/vue3-jest',
    '^.+\\js$': 'babel-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/playwright-tests/', '/cypress-tests/', '/dist/']
}
