module.exports = {
    root: true,
    extends: ['plugin:@typescript-eslint/recommended', 'next/core-web-vitals'],
    parserOptions: {
        parser: require.resolve('@typescript-eslint/parser'),
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    rules: {
        'linebreak-style': ['error', 'unix'],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true
            }
        ],
        semi: ['error', 'never'],
        quotes: ['warn', 'single'],
        curly: ['error', 'multi', 'consistent'],
        'comma-dangle': ['error', 'never'],
        'prefer-promise-reject-errors': 'off',
        'multiline-ternary': ['error', 'never'],
        'brace-style': [
            'error',
            '1tbs',
            {
                allowSingleLine: false
            }
        ],
        // 'array-element-newline': ['error', { multiline: true, minItems: 3 }],
        // 'array-bracket-newline': ['error', { multiline: true }],
        'object-curly-spacing': ['error', 'always'],
        'no-irregular-whitespace': [
            'error',
            {
                skipComments: true
            }
        ],
        'no-trailing-spaces': [
            'error',
            {
                skipBlankLines: true,
                ignoreComments: true
            }
        ],

        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/indent': ['warn', 4],

        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/ban-types': 'off'
    }
}
