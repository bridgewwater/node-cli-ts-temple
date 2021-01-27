const process = require('process');

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
    semi: ['error', 'never'],
    'no-console': 'off',
    'camelcase': [
      2,
      {
        'properties': 'never'
      }
    ]
    // let can use any
    // '@typescript-eslint/no-explicit-any': ['off']
  }
};
