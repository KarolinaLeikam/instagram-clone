import js from '@eslint/js';
import globals from 'globals';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['dist', 'node_modules'],
  },

  // Base JS recommended
  js.configs.recommended,

  // Airbnb plugin presets
  plugins.stylistic,
  plugins.importX,
  plugins.react,
  plugins.reactA11y,
  plugins.reactHooks,
  plugins.typescriptEslint,
  plugins.node,

  // Airbnb config presets (base + react + typescript)
  ...configs.base.recommended,
  ...configs.base.typescript,
  ...configs.react.recommended,
  ...configs.react.typescript,

  // Project language options
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // Vite react-refresh + project tweaks
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: { 'react-refresh': reactRefresh },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/function-component-definition': [
        2,
        { namedComponents: 'arrow-function' },
      ],
      // TS handles these — airbnb defaults redundant here
      'react/prop-types': 'off',
      // React 19 dropped defaultProps for fn components — use default args
      'react/require-default-props': [
        'error',
        { functions: 'defaultArguments' },
      ],
      'import-x/extensions': [
        'error',
        'ignorePackages',
        { ts: 'never', tsx: 'never' },
      ],
      'import-x/no-unresolved': ['error', { ignore: ['\\?react$'] }],
    },
  },

  // Prettier last — turn off conflicting rules, run prettier as a rule
  { rules: prettierConfigRules },
  {
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'error' },
  },
];
