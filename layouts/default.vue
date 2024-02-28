<template>
    <div class="layout-defaut">
        <AppHeader :is-auth="isAuthView" class="layout-defaut__header" />
        <main class="layout-defaut__content">
            <nuxt />
        </main>
        <AppFooter class="layout-defaut__footer" />
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
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

export default {
    components: { AppHeader, AppFooter },
    head() {
        return {
            title: `${this.authorName} is listening - A Musical App`,
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css?family=Bungee+Hairline|Oswald'
                }
            ]
        }
    },
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

    .page-enter-active,
    .page-leave-active {
        transition: opacity 0.5s;
    }
    .page-enter,
    .page-leave-active {
        opacity: 0;
    }
}
</style>
