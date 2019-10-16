<template>
    <div class="layout-defaut">
        <Header class="layout-defaut__header" :is-auth="isAuthView" />
        <main class="layout-defaut__content">
            <nuxt />
        </main>
        <Footer class="layout-defaut__footer" />
        <!--<nuxt-link
            v-if="isAuthView"
            class="area-close"
            aria-hidden="true"
            to="/"
            name="index"
            >dsfdsfsdfsd</nuxt-link
        >-->
    </div>
</template>

<script>
import Header from '~/components/AppHeader.vue'
import Footer from '~/components/AppFooter.vue'

export default {
    components: { Header, Footer },
    computed: {
        authorName() {
            return this.$store.state.authorName
        },
        titleShort() {
            return 'is Listening'
        },
        isAuthView() {
            return this.$route.name === 'auth'
        },
        ariaCurrent() {
            return this.isAuthView ? 'page' : false
        },
        rootClass() {
            return this.isAuthView ? 'auth base' : 'base'
        }
    },
    head() {
        return {
            title: `${this.authorName} is listening ·X· A Musical App`,
            link: [
                {
                    rel: 'stylesheet',
                    href:
                        'https://fonts.googleapis.com/css?family=Bungee+Hairline|Oswald'
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.layout-defaut {
    position: relative;
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        'banner'
        'main'
        'footer';
    min-height: 100vh;

    &__header {
        grid-area: banner;
    }

    &__content {
        grid-area: main;
    }

    &__footer {
        grid-area: footer;
    }
}
</style>
