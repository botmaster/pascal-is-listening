<template>
    <div
        v-if="loading"
        class="container mx-auto px-container md:px-container-md absolute left-0 top-0 right-0"
    >
        <app-loading></app-loading>
    </div>
</template>

<script>
import AppLoading from './AppLoading'

export default {
    name: 'AppMainLoading',
    components: { AppLoading },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        start() {
            this.loading = true
        },
        async finish() {
            await new Promise((resolve) => setTimeout(resolve, 1200))
            this.loading = false
        }
    }
}
</script>

<style scoped></style>
