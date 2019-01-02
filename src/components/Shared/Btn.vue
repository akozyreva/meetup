<!-- btn for sign up and sign in -->
<template>
    <div>
        <v-btn type="submit" :disabled="loading" :loading="loading">{{ text }}
            <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
            </span>
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "Btn",
        props: ['text'],
        computed: {
            loading() {
                return this.$store.getters.getLoading
            }
        }
    }
</script>

<style scoped>

</style>