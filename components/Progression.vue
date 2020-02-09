<template>
    <div
        :style="{ transform: 'scaleX(' + percent + ')' }"
        class="progression absolute inset-x-0 bottom-0 h-px bg-white"
        aria-hidden="true"
        style="transform-origin: left;"
    ></div>
</template>

<script>
export default {
    props: {
        progressPercent: {
            type: Number,
            default: 0
        },
        image: {
            type: String,
            default: null
        }
    },
    computed: {
        percent() {
            return this.progressPercent / 100
        }
    }
}
</script>

<style scoped lang="scss">
.progression {
    //
}
</style>
