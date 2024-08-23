/** @type {import('eslint').Linter.Config} */
module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'airbnb',
      'airbnb/hooks',
      'plugin:jsx-a11y/recommended',
      'plugin:react-hooks/recommended',
    ],
    plugins: [
      'react',
      '@typescript-eslint',
      'jsx-a11y',
      'react-hooks',
    ],
    rules: {
      // Add or modify any rules here
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
};
  