import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  // Ignore patterns
  {
    ignores: [
      ".docusaurus/**",
      "build/**",
      "node_modules/**",
      "coverage/**",
      ".turbo/**",
    ],
  },

  // JavaScript files
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        fetch: "readonly",
        Request: "readonly",
        Response: "readonly",
        Headers: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        // Node.js globals for scripts
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        jsx: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        fetch: "readonly",
        Request: "readonly",
        Response: "readonly",
        Headers: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        // React globals
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // Relaxed rules for docs site
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_|^e$",
        },
      ],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // Prettier (must be last)
  prettier,
];
