import { resolve } from 'node:path';

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  parserOptions: {
    project,
  },
  rules: {
    'eslint-comments/require-description': 0,
    'import/no-default-export': 0,
    'unicorn/filename-case': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-uses-react': 0,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  'jsx-runtime': {
    plugins: ['react'],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      jsxPragma: null, // for @typescript/eslint-parser
    },
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/jsx-uses-react': 0,
    },
  },
};
