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
            },
            boxShadow: {
                default:
                    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                md:
                    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                lg:
                    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                xl:
                    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                card: '0 5px 50px -12px rgba(0, 0, 0, 0.45)',
                inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
                none: 'none'
            }
        }
    },
    variants: {},
    plugins: [],
    future: {
        purgeLayersByDefault: true
    }
}
