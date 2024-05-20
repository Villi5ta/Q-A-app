import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    languageOptions: { sourceType: "script" },
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
];
