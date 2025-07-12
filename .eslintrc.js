module.exports = {
    env: {
        node: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    rules: {
        'no-console': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'prefer-const': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-arrow-callback': 'error',
        'prefer-template': 'error',
        'template-curly-spacing': 'error',
        'arrow-spacing': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'indent': ['error', 4],
        'no-trailing-spaces': 'error',
        'eol-last': 'error',
    },
};
