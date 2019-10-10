require('dotenv').config()
export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
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
        '@nuxtjs/tailwindcss'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/dotenv',
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        '@nuxtjs/google-analytics'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    robots: {
        UserAgent: '*',
        Disallow: ['/Grid', '/Typo']
    },
    sitemap: {
        hostname: 'https://pascal-is-listening.herokuapp.com',
        exclude: ['/Grid', '/Typo']
    },
    googleAnalytics: {
        id: 'UA-143785757-2'
    },
    /*
     ** Build configuration
     */
    build: {
        extractCSS: {
            spitChunks: true
        },
        watch: ['api'],
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
