<template>
    <section class="bg-white h-full flex items-center">
        <div class="container mx-auto px-container md:px-container-md">
            <p
                class="rounded-lg p-4 bg-black text-white shadow-card overflow-hidden"
                aria-live="polite"
            >
                <span>{{ message }}</span>
                <nuxt-link
                    :aria-current="'/' === $nuxt.$route.path ? 'page' : false"
                    to="/"
                    name="index"
                    >Close</nuxt-link
                >
            </p>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        isConnected() {
            return this.$store.state.isConnected
        },
        message() {
            return this.$store.state.message
        }
    },
    asyncData(data) {
        console.log('asyncData(data)')
        const {
            env: { spotifyId, clientUrl },
            query
        } = data
        console.log('spotifyId', spotifyId)
        console.log('clientUrl', clientUrl)
        const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyId}&response_type=code&scope=user-read-currently-playing,user-read-recently-played&redirect_uri=${clientUrl}/api/spotify/callback`
        return {
            spotifyUrl,
            query
        }
    },
    mounted() {
        console.log('mounted()')
        console.log('this.query', this.query)
        console.log('this.isConnected', this.isConnected)
        if (!(this.query.success || this.query.error) && !this.isConnected) {
            console.log('mounted() this.spotifyUrl', this.spotifyUrl)
            console.log('mounted() change window.location!!!')
            window.location = this.spotifyUrl
        } else if (Object.keys(this.query).length !== 0) {
            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            )
            this.$store.commit(
                'updateMessage',
                this.query.success || this.query.error
            )
            if (this.query.success) {
                this.$store.dispatch('updateConnection', true)
            }
        }
        if (this.isConnected) {
            this.$store.commit('updateMessage', "⚡ We're Connected ⚡")
        }
    }
}
</script>

<style scoped lang="scss"></style>
