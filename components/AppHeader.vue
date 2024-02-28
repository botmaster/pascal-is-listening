<template>
    <header>
        <div class="container mx-auto px-container md:px-container-md">
            <div class="text-white py-4 md:py-6">
                <h1 ref="title" class="flex items-baseline">
                    {{ $store.state.authorName }}
                    is Listening
                    <nuxt-link
                        :aria-current="isAuth"
                        class="icon-spotify w-6 ml-4"
                        to="/auth"
                        name="auth"
                        aria-label="Login"
                    >
                        <img
                            width="24"
                            height="24"
                            src="~/assets/images/spotify.svg"
                            alt="spotify"
                        />
                    </nuxt-link>
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
    },
    mounted() {}
}
</script>

<style scoped lang="scss">
.icone-spotify {
    //
}
</style>
