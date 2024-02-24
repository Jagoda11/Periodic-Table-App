module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1'
  },
  moduleFileExtensions: ['js', 'json', 'ts', 'vue', 'spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transforms TypeScript files using ts-jest
    '.*\\.(vue)$': '@vue/vue3-jest', // Transforms Vue files using @vue/vue3-jest
    '^.+\\js$': 'babel-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/playwright-tests/', '/cypress-tests/', '/dist/']
}
