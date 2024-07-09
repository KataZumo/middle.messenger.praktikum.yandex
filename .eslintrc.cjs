module.exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.hbs'],
      },
    },
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-this-alias": "error",
    '@typescript-eslint/no-this-alias': 'off',
    "@typescript-eslint/no-unused-vars": ["warn", {
      argsIgnorePattern: "^_",
      ignoreRestSiblings: true,
    }],
    "@typescript-eslint/unified-signatures": "warn",
    eqeqeq: ["error", "smart"],
  },
  ignorePatterns: ["dist", ".eslintrc.js"],
};
