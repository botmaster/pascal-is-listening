<template>
    <section
        :style="{ backgroundColor: trackColor }"
        class="bg-white h-full flex items-center section"
    >
        <div class="container mx-auto px-container md:px-container-md">
            <NowPlaying
                v-if="showTrack"
                :now-playing="nowPlaying"
                :is-playing="isPlaying"
                class="my-4 md:my-12"
            />
            <p
                v-if="!isConnected"
                class="rounded-lg p-4 bg-black text-white shadow-card overflow-hidden"
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
        },
        trackColor() {
            return this.$store.state.trackColor.hex
                ? this.$store.state.trackColor.hex
                : '#FFFFFF'
        }
    }
}
</script>

<style scoped lang="scss">
.section {
    transition: background-color 3s linear;
}
</style>
