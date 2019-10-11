<template>
    <transition name="fade">
        <section
            class="md:flex bg-black text-white shadow-2xl overflow-hidden rounded-lg w-full"
        >
            <figure
                class="md:w-1/2 m-2  md:mr-8 rounded-lg overflow-hidden relative"
            >
                <img v-if="image" :src="image" alt="Album Artwork" />
                <Progression
                    :class="className"
                    :progress-percent="progress"
                    :image="image"
                />
            </figure>
            <figcaption class="md:w-1/2 metadata p-6 md:pl-0 md:pt-2">
                <h2 aria-live="polite">{{ name }}</h2>
                <p aria-live="polite">{{ artistsList }}</p>
                <p :class="statusClass">
                    <span
                        >{{ this.$store.state.authorName }} {{ status }}.</span
                    >
                    <a v-if="href" :href="href">Listen?</a>
                </p>
            </figcaption>
        </section>
    </transition>
</template>

<script>
/* eslint-disable camelcase */
import Progression from './Progression.vue'

export default {
    components: { Progression },
    props: {
        isPlaying: {
            type: Boolean,
            default: false
        },
        nowPlaying: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return { staleTimer: '', trackTimer: '' }
    },
    computed: {
        className() {
            return this.isPlaying ? '' : 'is-paused'
        },
        statusClass() {
            return this.isPlaying ? 'is-playing status' : 'status'
        },
        image() {
            const { album, image } = this.nowPlaying
            if (album) {
                const { url } = album.images[0]
                return url
            }
            return (
                image ||
                'https://developer.spotify.com/assets/branding-guidelines/icon2@2x.png'
            )
        },
        progress() {
            return this.$store.state.trackProgress
        },
        artistsList() {
            const { artists } = this.nowPlaying
            return artists
                ? artists.map((artist) => artist.name).join(', ')
                : null
        },
        href() {
            const { external_urls } = this.nowPlaying
            return external_urls ? external_urls.spotify : null
        },
        name() {
            return this.nowPlaying.name
        },
        status() {
            return this.isPlaying
                ? `is playing this track with ${Math.round(
                      this.$store.state.trackProgress
                  )}% complete`
                : 'has paused this track'
        }
    },
    created() {
        this.getNowPlaying()
        this.staleTimer = setInterval(() => {
            this.getNowPlaying()
        }, 10000)
    },
    beforeDestroy() {
        clearInterval(this.staleTimer)
        clearInterval(this.trackTimer)
    },
    methods: {
        updateProgress(progress = 0, duration = 0) {
            this.$store.dispatch('updateProgress', { progress, duration })
        },
        async getNowPlaying() {
            const { progress_ms, is_playing, item } = await this.$axios.$get(
                `/api/spotify/now-playing/`
            )
            if (item) {
                const progress = progress_ms
                const duration = item.duration_ms
                this.$store.dispatch('updateStatus', is_playing)
                clearInterval(this.trackTimer)
                if (is_playing) {
                    this.timeTrack(Date.now(), duration, progress)
                } else {
                    this.updateProgress(progress, duration)
                }
                const { id } = this.nowPlaying
                if (item.id !== id) {
                    this.$store.dispatch('updateTrack', item)
                }
            }
        },
        timeTrack(now, duration, progress) {
            const remainder = duration - progress
            const until = now + remainder
            this.trackTimer = setInterval(() => {
                const newNow = Date.now()
                if (newNow < until + 2500) {
                    const newRemainder = until - newNow
                    const newProgressMs = duration - newRemainder
                    this.updateProgress(newProgressMs, duration)
                } else {
                    this.updateProgress(1, 1)
                    clearInterval(this.trackTimer)
                    this.getNowPlaying()
                }
            }, 100)
        }
    }
}
</script>

<style scoped></style>
