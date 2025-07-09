import vueEslintParser from 'vue-eslint-parser';
import eslintPluginVue from 'eslint-plugin-vue';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import typescriptEslintParser from '@typescript-eslint/parser';

export default [
  {
    files: ['*.vue'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueEslintParser,
      parserOptions: {
        extraFileExtensions: ['.vue']
      }
    },
    plugins: {
      vue: eslintPluginVue,
      prettier: eslintPluginPrettier,
      '@typescript-eslint': typescriptEslintPlugin
    },
    rules: {
      ...(eslintPluginVue.configs && eslintPluginVue.configs['vue3-recommended']
        ? eslintPluginVue.configs['vue3-recommended'].rules
        : {}),
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      eqeqeq: 'error',
      curly: 'error',
      semi: ['error', 'always']
    }
  },
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptEslintParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json']
      }
    },
    plugins: {
      typescript: typescriptEslintPlugin,
      prettier: eslintPluginPrettier,
      '@typescript-eslint': typescriptEslintPlugin
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
      eqeqeq: 'error',
      curly: 'error',
      semi: ['error', 'always']
    }
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      'public/',
      '*.min.js',
      'coverage/',
      'playwright-tests/extractFailedTests.cjs',
      'playwright-tests/extractFailedTests.ts'
    ]
  }
];
