module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'vue'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '.*\\.(vue)$': '@vue/vue3-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/playwright-tests/']
}
