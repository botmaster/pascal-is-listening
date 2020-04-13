require('dotenv').config()
export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        // this htmlAttrs you need
        htmlAttrs: {
            lang: 'fr-fr'
        },
        bodyAttrs: {
            /* id: 'js-scroll' */
        },
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                name: 'google-site-verification',
                content: 'gZ6qcLiAwi03UHOA4K7E-FQtPkVivNGYLRLUtktDZBo'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            },
            {
                name: 'msapplication-TileColor',
                content: '#da532c'
            },
            {
                name: 'theme-color',
                content: '#ffffff'
            }
        ],
        link: [
            {
                rel: 'apple-touch-icon',
                sizes: '180x180',
                href: '/apple-touch-icon.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '32x32',
                href: '/favicon-32x32.png'
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '16x16',
                href: '/favicon-16x16.png'
            },
            {
                rel: 'manifest',
                href: '/site.webmanifest'
            },
            {
                rel: 'mask-icon',
                href: '/safari-pinned-tab.svg',
                color: '#5bbad5'
            }
        ]
    },
    loading: '~/components/AppMainLoading.vue',
    /*
     ** Customize the progress-bar color
     */
    // loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: ['~/assets/scss/main.scss'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-analytics'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/dotenv',
        '@nuxtjs/robots',
        '@nuxtjs/sitemap'
    ],
    pageTransition: {
        name: 'page',
        mode: 'out-in',
        appear: true // Dont work
    },
    tailwindcss: {
        cssPath: '~/assets/css/lib/tailwind.css'
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    robots: {
        UserAgent: '*',
        Disallow: ['/Grid', '/Typo', '/auth']
    },
    sitemap: {
        hostname: 'https://pascal-is-listening.herokuapp.com',
        exclude: ['/Grid', '/Typo', '/auth'],
        cacheTime: 1000 * 60 * 30
    },
    googleAnalytics: {
        id: 'UA-143785757-2',
        debug: {
            sendHitTask: process.env.NODE_ENV === 'production'
        }
    },
    /*
     ** Build configuration
     */
    build: {
        extractCSS: {
            spitChunks: true
        },
        watch: ['api'],
        analyze: {
            analyzerMode: 'static'
        },
        transpile: ['gsap'],
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    },
    serverMiddleware: ['~/api'],
    env: {
        spotifyId: process.env.SPOTIFY_CLIENT_ID,
        clientUrl: process.env.CLIENT_URL,
        authorName: process.env.npm_package_author_name
    }
}
