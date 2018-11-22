module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  extends: [
    'plugin:react/recommended',
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended'
  ],

  rules: {
    'max-len': [
      'error',
      {
        code: 80,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTrailingComments: false
      }
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'prettier/prettier': 'error'
  },
  settings: {
    react: {
      version: '16'
    }
  }
};
