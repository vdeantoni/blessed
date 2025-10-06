module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // Must be last to override other configs
  ],
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    // Allow require() in .js files
    '@typescript-eslint/no-var-requires': 'off',

    // Allow any type during migration
    '@typescript-eslint/no-explicit-any': 'warn',

    // Allow unused vars with _ prefix
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // Allow console (it's a CLI tool)
    'no-console': 'off',

    // Disable some rules for legacy code during migration
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    'no-prototype-builtins': 'off',
  },
  overrides: [
    {
      // Stricter rules for new TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-var-requires': 'error',
      },
    },
    {
      // Relaxed rules for test files
      files: ['**/__tests__/**/*', '**/*.test.js', '**/*.test.ts'],
      env: {
        jest: true,
        node: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      // Ignore legacy test and example files
      files: ['test/**/*', 'example/**/*', 'benchmarks/**/*'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
};