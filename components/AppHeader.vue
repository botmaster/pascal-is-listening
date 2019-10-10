<template>
    <header>
        <div class="container mx-auto px-container md:px-container-md">
            <div class="text-white py-4 md:py-6">
                <h1>
                    {{ this.$store.state.authorName }}
                    is Listening
                    <nuxt-link
                        to="/auth"
                        name="auth"
                        aria-label="Login"
                        :aria-current="isAuth"
                    />
                </h1>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        isAuth: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped></style>
