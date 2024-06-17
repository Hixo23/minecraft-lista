const { resolve } = require('node:path');

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
     "eslint-comments/require-description": 0,
     "import/no-default-export": 0,
     "unicorn/filename-case": 0
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
};