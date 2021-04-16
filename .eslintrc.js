module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
  ],
  rules: {
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
      ],
    }],
    'import/prefer-default-export': 0,
    'vue/max-attributes-per-line': 0,
    'max-len': ['error', {
      code: 200,
      ignoreComments: true,
      ignoreTemplateLiterals: true,
      ignoreStrings: true,
      ignorePattern: 'd="([\\s\\S]*?)"',
      ignoreRegExpLiterals: true,
    }],
    'vue/order-in-components': ['error', {
      order: [
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['props', 'propsData'],
        'mixins',
        ['components', 'directives', 'filters'],
        'data',
        'computed',
        'methods',
        'extends',
        'inheritAttrs',
        'model',
        'watch',
        'LIFECYCLE_HOOKS',
        ['template', 'render'],
        'renderError',
      ],
    }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  settings: {
    'import/resolver': {
      'import/extensions': [
        '.js',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ],
    },
  },
};
