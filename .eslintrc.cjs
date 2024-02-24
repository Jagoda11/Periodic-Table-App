/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module', // Allows for the use of imports
    project: ['./tsconfig.eslint.json'],
    extraFileExtensions: ['.vue']
  },
  overrides: [
    {
      // Apply these rules specifically to Jest configuration files
      files: ['jest.config.js'],
      env: {
        node: true // This ensures that ESLint understands Node.js global variables and Node.js scoping
      },
      rules: {
        // Example rule override: turn off the 'no-undef' rule for Jest config
        'no-undef': 'off'
      }
    }
  ]
}
