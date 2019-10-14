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
                'gutter-md': '16px',
                '1/1': '100%'
            },
            lineHeight: {
                'neg-tight': 0.75,
                none: 1,
                tight: 1.25,
                snug: 1.375,
                normal: 1.5,
                relaxed: 1.625,
                loose: 2
            }
        }
    },
    variants: {},
    plugins: []
}
