const js = require('@eslint/js');
const ts = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const { default: preact } = require('eslint-config-preact');
const imports = require('eslint-plugin-import');
const jest = require('eslint-plugin-jest');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const prettier = require('eslint-plugin-prettier/recommended');

const sourceFiles = ['src_js/**/*.{ts,tsx}'];

module.exports = [
  ...[
    js.configs.recommended,
    ...preact,
    imports.flatConfigs.recommended,
    imports.flatConfigs.typescript,
    jsxA11y.flatConfigs.recommended,
    prettier,
  ].map((config) => ({ ...config, files: sourceFiles })),
  {
    files: sourceFiles,
    languageOptions: { parser: tsParser },
    plugins: { '@typescript-eslint': ts },
    rules: {
      ...ts.configs['eslint-recommended'].overrides[0].rules,
      ...ts.configs.recommended.rules,
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
  {
    ...jest.configs['flat/recommended'],
    files: ['src_js/**/__tests__/**/*.ts'],
  },
];
