/* eslint-env node */
module.exports = {
  presets: [
    // plugin-transform-runtime, preset-env, and compatibility settings for Vue 3
    '@vue/babel-preset-app',
    '@babel/preset-typescript',
    'babel-core@7.0.0-bridge.0' // for Jest
  ]
}
