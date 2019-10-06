module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react'
  ],
  rules: {
    'linebreak-style': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'arrow-parens': 'off',
    'react/state-in-constructor': ['error', 'never'],
    'import/no-commonjs': 'error',
    'indent': [2, 'tab'],
    'no-tabs': 0,
    'react/jsx-indent': [2, 'tab'],
    'react/jsx-indent-props': [2, 'tab']
  },
};
