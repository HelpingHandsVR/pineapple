module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:unicorn/recommended',
    'standard',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'unicorn/prevent-abbreviations': 0,
    'unicorn/no-null': 0,
    'operator-linebreak': [1, 'before', {
      overrides: {
        '=': 'after',
      },
    }],
    'unicorn/no-fn-reference-in-iterator': 0,
  },
}
