import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default tseslint.config({
  files: ["**/*.{js,mjs,cjs,ts}"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
    parser: tseslint.parser,
    parserOptions: {
      project: true,
    },
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
    prettier: prettier,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        trailingComma: "all",
        semi: true,
        printWidth: 80,
        tabWidth: 2,
        endOfLine: "lf",
        arrowParens: "always",
        bracketSpacing: true,
      },
    ],

    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    indent: "off",
    semi: "error",
    quotes: "error",
    "space-before-function-paren": "off",
    "space-before-blocks": "off",
    "object-curly-spacing": "off",
    "no-unused-vars": "warn",
  },
});
