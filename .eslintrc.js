module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    quotes: ['error', 'single'], // only single qoutes are allowed
    'no-console': ['error', { allow: ['warn', 'error'] }], // no console logs
    // import order
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    // use '=>' instead of 'return' as needed
    // this will work with React components too
    // having only jsx
    'arrow-body-style': ['error', 'as-needed'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    // add spacing
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: 'multiline-expression', next: '*' },
    ],
    'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
  },
};
