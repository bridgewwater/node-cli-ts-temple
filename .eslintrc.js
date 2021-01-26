const process = require('process')
const overrideSettings = {
  files: ['*.ts'],
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base/legacy',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix'
    ],
    quotes: ['error', 'single'],
    'no-else-return': ['error', { allowElseIf: false }],
    semi: ['error', 'always'],
    'no-console': 'off'
  }
}

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base/legacy',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  rules: {
    indent: ['error', 2],
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix'
    ],
    quotes: ['error', 'single'],
    'no-else-return': ['error', { allowElseIf: false }],
    semi: ['error', 'always'],
    "no-console": "off"
  }
}
