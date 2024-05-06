module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'react'],
  extends: [
    'prettier',
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'implicit-arrow-linebreak': 'off',
    'arrow-body-style': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    'import/extensions': 'off',
    'global-require': 'off',
    'object-curly-newline': 'off',
    'prettier/prettier': ['error'],
    'operator-linebreak': ['off'],
    'react/react-in-jsx-scope': 'off',
    'react/no-unescaped-entities': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never', propElementValues: 'always' },
    ],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    },
  },
  overrides: [
    // Limit TypeScript linting to TS/TSX
    // https://github.com/typescript-eslint/typescript-eslint/issues/1928
    {
      files: ['src/**/*.{ts,tsx}'],
      extends: ['airbnb-typescript'],
      rules: {
        'no-param-reassign': [
          'error',
          {
            props: false,
          },
        ],
        'prefer-destructuring': [
          'error',
          {
            array: false,
            object: true,
          },
        ],
        'react/jsx-sort-props': [
          'error',
          {
            shorthandFirst: true,
          },
        ],
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            variables: false,
            functions: false,
            classes: true,
          },
        ],
        'no-plusplus': 'off',
        'no-nested-ternary': ['off'],
        '@typescript-eslint/indent': ['off'],
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-non-null-assertion': ['off'],
        '@typescript-eslint/explicit-function-return-type': ['error'],
      },
      parser: '@typescript-eslint/parser',

      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
