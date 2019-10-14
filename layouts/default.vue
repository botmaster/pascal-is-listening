<template>
    <div class="flex flex-col min-h-screen relative">
        <Header :is-auth="isAuthView" />
        <div class="flex-1 bg-white flex">
            <nuxt />
        </div>
        <Footer />
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

<style></style>
