<template>
    <section class="bg-white h-full flex items-center">
        <div class="container mx-auto px-container md:px-container-md">
            <NowPlaying
                v-if="showTrack"
                class="my-4 md:my-12"
                :now-playing="nowPlaying"
                :is-playing="isPlaying"
            />
            <p
                v-if="!isConnected"
                class="rounded-lg p-4 bg-black text-white shadow-2xl overflow-hidden"
            >
                😭 {{ this.$store.state.authorName }} hasn't connected yet. 😭
                <a href="http://twitter.com/botmaster">Nudge him</a>
            </p>
        </div>
    </section>
</template>

<script>
import NowPlaying from '~/components/NowPlaying.vue'

export default {
    components: { NowPlaying },
    computed: {
        showTrack() {
            return this.isConnected && this.nowPlaying
        },
        nowPlaying() {
            if (
                this.$store.state.nowPlaying &&
                Object.keys(this.$store.state.nowPlaying).length !== 0
            ) {
                this.$store.dispatch('updateConnection', true)
                return this.$store.state.nowPlaying
            }
            return this.$store.state.recentlyPlayed
        },
        isPlaying() {
            return this.$store.state.isPlaying
        },
        isConnected() {
            return this.$store.state.isConnected
        }
    }
}
</script>

<style scoped></style>
