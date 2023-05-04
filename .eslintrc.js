module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'max-len': [2, 100],
    'max-params': [2, 3],
    'no-console': 'off',
    'eol-last': 0,
    'linebreak-style': 0,
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
};
