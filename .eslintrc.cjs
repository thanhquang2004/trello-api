
module.exports = {
    env: { es2020: true, node: true },
    extends: [
      'eslint:recommended'
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      requireConfigFile: false,
      allowImportExportEverywhere: true
    },
    plugins: [],
    rules: {
      // Common
      "no-console": 1,
      "no-lonely-if": 1,
      "no-unused-vars": 1,
      "no-extra-boolean-cast": 0,
      "no-trailing-spaces": 1,
      "no-multi-spaces": 1,
      "no-multiple-empty-lines": 1,
      "space-before-blocks": ["error", "always"],
      "object-curly-spacing": [1, "always"],
    }
  }