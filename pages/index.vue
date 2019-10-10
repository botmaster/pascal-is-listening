<template>
    <div
        class="container mx-auto px-container md:px-container-md flex items-center"
    >
        <NowPlaying
            v-if="showTrack"
            :now-playing="track"
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
</template>

<script>
import NowPlaying from '~/components/NowPlaying.vue'

export default {
    components: { NowPlaying },
    computed: {
        showTrack() {
            return this.isConnected && this.track
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
        track() {
            return this.nowPlaying
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
