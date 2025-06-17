import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      // ✅ EXISTING RULES
      'space-infix-ops': ['error'],
      'brace-style': ['error', '1tbs'],
      'space-before-blocks': ['error', 'always'],

      // ✅ ADDITIONAL RECOMMENDED RULES
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // eslint-disable-next-line no-undef
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },
  {
    // ✅ IGNORE PATTERNS
    ignores: ['dist/', 'node_modules/', 'coverage/', '*.min.js', 'webpack.*.js'],
  },
];
