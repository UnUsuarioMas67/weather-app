import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];
