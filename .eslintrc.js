module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parser: 'vue-eslint-parser',
    extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended'],
    // add your custom rules here
    rules: {
        'no-console': 'off'
    }
}
