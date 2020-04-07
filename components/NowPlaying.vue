<template>
    <section
        class="md:flex bg-black text-white shadow-card overflow-hidden rounded-lg w-full"
    >
        <figure
            class="md:w-1/2 m-2  md:mr-8 rounded-lg overflow-hidden relative"
        >
            <div class="relative pb-1/1">
                <img
                    v-show="imageIsLoaded"
                    id="myImage"
                    ref="image"
                    :src="image"
                    class="absolute h-full w-full object-cover"
                    alt="Album Artwork"
                />
                <div
                    v-show="!imageIsLoaded"
                    class="absolute h-full w-full flex justify-center items-center"
                >
                    <app-loading></app-loading>
                </div>
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
            <p ref="artist" class="uppercase" aria-live="polite">
                {{ artistsList }}
            </p>

            <div ref="title" class="mb-4">
                <h2
                    ref="name"
                    class="inline leading-neg-tight"
                    aria-live="polite"
                >
                    {{ name }}
                </h2>
                <span ref="albumName" class="inline">
                    <a
                        :href="albumUrl"
                        rel="noopener"
                        class="uppercase inline"
                        target="_blank"
                        title="Album Infos"
                        >{{ albumName }}</a
                    >
                </span>
            </div>

            <!-- <p aria-live="polite">{{ albumName }}</p> -->

            <p ref="status" :class="statusClass" class="mt-auto">
                <span>{{ this.$store.state.authorName }} {{ status }}.</span>
                <a v-if="href" :href="href" rel="noopener">Listen?</a>
            </p>
        </div>
    </section>
</template>

<script>
/* eslint-disable camelcase */
import { TweenMax } from 'gsap'
import imagesLoaded from 'imagesloaded'
import FastAverageColor from 'fast-average-color'
import Progression from './Progression.vue'
import AppLoading from './AppLoading'

// eslint-disable-next-line no-unused-vars
const plugins = [TweenMax]

export default {
    components: { AppLoading, Progression },
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
        return {
            staleTimer: '',
            trackTimer: '',
            imageIsLoaded: false,
            track: {}
        }
    },
    computed: {
        className() {
            return this.isPlaying ? '' : 'is-paused'
        },
        statusClass() {
            return this.isPlaying ? 'is-playing status' : 'status'
        },
        image() {
            const { album, image } = this.track
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
            const { artists } = this.track
            return artists
                ? artists.map((artist) => artist.name).join(', ')
                : null
        },
        href() {
            const { external_urls } = this.track
            return external_urls ? external_urls.spotify : null
        },
        name() {
            return this.track.name
        },
        albumName() {
            return this.track.album.name || '???'
        },
        albumUrl() {
            const { external_urls } = this.track.album
            return external_urls ? external_urls.spotify : null
        },
        status() {
            return this.isPlaying
                ? `is playing this track with ${Math.round(
                      this.$store.state.trackProgress
                  )}% complete`
                : 'has paused this track'
        }
    },
    watch: {
        nowPlaying: {
            handler(newValue, oldValue) {
                if (newValue && oldValue && newValue.name !== oldValue.name) {
                    // console.log('newvalue: ', newValue)

                    if (process.client) {
                        TweenMax.set(
                            [
                                this.$refs.artist,
                                this.$refs.name,
                                this.$refs.albumName,
                                this.$refs.status
                            ],
                            {
                                opacity: 0,
                                immediateRender: true,
                                onComplete: () => {
                                    this.track = newValue
                                }
                            }
                        )

                        TweenMax.staggerTo(
                            [
                                this.$refs.artist,
                                this.$refs.name,
                                this.$refs.albumName,
                                this.$refs.status
                            ],
                            1,
                            {
                                opacity: 1,
                                delay: 0.2,
                                onStart: () => {}
                            },
                            0.3
                        )

                        imagesLoaded(this.$refs.image, () => {
                            // this.imageIsLoaded = true
                            TweenMax.from(this.$refs.image, 1, {
                                opacity: 0
                            })

                            this.getTrackColor()
                        })
                    }
                }
            },
            immediate: false
        }
    },
    created() {
        this.getNowPlaying()
        this.track = this.nowPlaying
        this.staleTimer = setInterval(() => {
            this.getNowPlaying()
        }, 10000)
    },
    beforeDestroy() {
        clearInterval(this.staleTimer)
        clearInterval(this.trackTimer)
    },
    mounted() {
        imagesLoaded(this.$refs.image, () => {
            this.imageIsLoaded = true
            TweenMax.from(this.$refs.image, 1, {
                opacity: 0
            })

            this.getTrackColor()
        })
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
        },

        getTrackColor() {
            const fac = new FastAverageColor()
            const color = fac.getColor(document.getElementById('myImage'))

            this.$store.dispatch('updateTrackColor', color)
            console.log('color', color)
        }
    }
}
</script>

<style scoped lang="scss"></style>
