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
    project: ['**/tsconfig.json'],
    tsconfigRootDir: __dirname,
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
    "@typescript-eslint/no-for-in-array": "warn",
    "@typescript-eslint/no-misused-new": "warn",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/unified-signatures": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "error",
    eqeqeq: ["warn", "smart"],
  },
  ignorePatterns: ["dist", ".eslintrc.js"],
};



