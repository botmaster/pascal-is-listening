<template>
    <transition name="fade">
        <section
            class="md:flex bg-black text-white shadow-2xl overflow-hidden rounded-lg w-full"
        >
            <figure
                class="md:w-1/2 m-2  md:mr-8 rounded-lg overflow-hidden relative"
            >
                <div class="relative pb-1/1">
                    <img
                        v-if="image"
                        class="absolute h-full w-full object-cover"
                        :src="image"
                        alt="Album Artwork"
                    />
                </div>

                <Progression
                    :class="className"
                    :progress-percent="progress"
                    :image="image"
                />
            </figure>
            <div
                class="relative md:w-1/2 metadata p-6 md:pl-0 md:pt-2 md:pb-2 md:flex flex-col"
            >
                <p class="uppercase" aria-live="polite">{{ artistsList }}</p>
                <div class="mb-4">
                    <h2 class="inline leading-neg-tight" aria-live="polite">
                        {{ name }}
                    </h2>
                    <a
                        class="uppercase"
                        :href="albumUrl"
                        target="_blank"
                        title="Album Infos"
                        >{{ albumName }}</a
                    >
                </div>
                <!-- <p aria-live="polite">{{ albumName }}</p> -->

                <p :class="statusClass" class="mt-auto">
                    <span
                        >{{ this.$store.state.authorName }} {{ status }}.</span
                    >
                    <a v-if="href" :href="href">Listen?</a>
                </p>
            </div>
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
        albumName() {
            return this.nowPlaying.album.name || '???'
        },
        albumUrl() {
            const { external_urls } = this.nowPlaying.album
            return external_urls ? external_urls.spotify : null
        },
        status() {
            return this.isPlaying
                ? `is playing this track with ${Math.round(
                      this.$store.state.trackProgress
                  )}% complete`
                : 'has paused this track'
        },
        percent() {
            return Math.floor(this.$store.state.trackProgress)
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
                `/api/spotify/now-playing/`,
                {
                    progress: true
                }
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

<style scoped>
.fade-enter-active {
    transition: opacity 600ms ease-out;
}
.fade-leave-active {
    opacity: 0;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
