<template>
    <v-layout row wrap >
        <v-flex xs12 class="text-xs-center">
            <v-progress-circular
                    indeterminate
                    color="white"
                    :width="7"
                    :size="70"
                    v-if="this.$store.getters.getLoading"
            ></v-progress-circular>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style scoped>

</style>