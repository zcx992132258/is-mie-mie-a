module.exports = {
    parser: 'vue-eslint-parser',

    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    ignorePatterns: [
        'src/assets/iconfont',
        'src/views/Login/components/ThreeBg.vue',
    ],
    rules: {
        // override/add rules settings here, such as:
        'vue/no-multiple-template-root': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        'no-console': ['error', { allow: ['error'] }],
        'no-invalid-this': 'error',
        'no-implicit-globals': 'error',
        'no-eval': 1, //禁止使用eval
        'no-implied-eval': 2, //禁止使用隐式eval
        'vue/multi-word-component-names': [
            'error',
            {
                ignores: ['index'], //需要忽略的组件名
            },
        ],
    },
};
