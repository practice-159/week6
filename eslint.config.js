import js from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      perfectionist,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      eqeqeq: [2],
      "perfectionist/sort-jsx-props": [
        "error",
        {
          type: "line-length",
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          type: "line-length",
        },
      ],
      "perfectionist/sort-object-types": [
        "error",
        {
          type: "line-length",
        },
      ],
      "perfectionist/sort-named-imports": [
        "error",
        {
          type: "line-length",
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          type: "line-length",
        },
      ],
    },
  },
]);
