<template>
    <div aria-hidden="true">
        <svg
            class="album"
            viewBox="0 0 24.5 24.5"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
        >
            <defs>
                <pattern
                    id="image"
                    x="0%"
                    y="0%"
                    height="100%"
                    width="100%"
                    patternUnits="userSpaceOnUse"
                >
                    <image
                        x="0%"
                        y="0%"
                        width="100%"
                        height="100%"
                        v-bind="{ 'xlink:href': image }"
                    ></image>
                </pattern>
            </defs>
            <rect height="25.5" width="25.5" class="image" x="0" y="0"></rect>
        </svg>
        <svg
            class="progress"
            viewBox="0 0 25 25"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#333642"></stop>
                    <stop
                        offset="25%"
                        stop-color="rgba(0, 112, 255, 0.8)"
                    ></stop>
                    <stop
                        offset="90%"
                        stop-color="rgba(118, 120, 224, 0.5)"
                    ></stop>
                    <stop
                        offset="100%"
                        stop-color="rgba(255, 255, 255, .5)"
                    ></stop>
                </linearGradient>
            </defs>
            <rect
                class="bar"
                :stroke-dasharray="`${progressPercent} 100`"
                fill="none"
                x="0"
                y="0"
                height="25"
                width="25"
            ></rect>
        </svg>
    </div>
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
    }
}
</script>

<style scoped></style>
