module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    // "prettier/prettier": "error",
    "import/order": [
      "off",
      {
        groups: [["builtin", "external", "internal"]],
      },
    ],
    "import/extensions": [
      "off", // Уровень серьезности: 0 = off, 1 = warn, 2 = error
      "ignorePackages", // Опции: "never" | "always" | "ignorePackages"
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
  },
};
