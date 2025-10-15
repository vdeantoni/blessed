import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

export default [
  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '.turbo/**',
      'vendor/**',
      'usr/**'
    ]
  },

  // JavaScript files (config files and tests only)
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js globals
        Buffer: 'readonly',
        process: 'readonly',
        console: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly'
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      // Terminal libraries use control characters (escape sequences)
      'no-control-regex': 'off'
    }
  },

  // TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // Allow 'any' when needed
      '@typescript-eslint/no-explicit-any': 'off',
      // Warn on unused vars (TypeScript compiler handles this better)
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_|^e$'
      }],
      // Allow @ts-ignore and similar comments when needed
      '@typescript-eslint/ban-ts-comment': 'off',
      // Legacy pattern: 'const self = this' - common in older codebases
      '@typescript-eslint/no-this-alias': 'off',
      // Allow Function type (used extensively in callbacks)
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      // Allow empty interfaces (used for extension)
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  },

  // Test files - more lenient
  {
    files: ['__tests__/**/*.js', '__tests__/**/*.ts'],
    languageOptions: {
      globals: {
        // Vitest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
        // Node.js test utilities
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly'
      }
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off'
    }
  },

  // Prettier (must be last to override formatting rules)
  prettier
];
