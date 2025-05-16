import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.{js,ts}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
    },
  },
];
