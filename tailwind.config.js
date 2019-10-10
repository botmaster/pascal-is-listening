/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
    theme: {
        extend: {
            fontFamily: {
                display: ['rubik_lightregular', 'sans-serif'],
                body: ['rubikregular', 'sans-serif'],
                'rubik-black': ['rubik_blackregular', 'sans-serif'],
                'rubik-bold': ['rubikbold', 'sans-serif'],
                'rubik-medium': ['rubik_mediumregular', 'sans-serif'],
                'rubik-regular': ['rubikregular', 'sans-serif'],
                'rubik-light': ['rubik_lightregular', 'sans-serif']
            },

            spacing: {
                container: '16px',
                'container-md': '32px',
                gutter: '16px',
                'gutter-md': '16px'
            }
        }
    },
    variants: {},
    plugins: []
}
