<template>
    <v-container >
        <v-layout v-for="item in getFeaturedMeetaps" :key="item.id" class="mb-2">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card class="info">
                    <v-container>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <!-- in order to bind img dynamically, add :src, npt src -->
                                <v-img
                                        :src="item.imageUrl"
                                        height="125px"
                                ></v-img>
                            </v-flex>
                            <v-flex xs5 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h2>{{ item.title }}</h2>
                                        <div>{{ item.date }}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn :to="`/meetups/${item.id}`" small>
                                        <v-icon left >arrow_forward</v-icon>
                                        View Meetup
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            // mix the getters into computed with object spread operator
            ...mapGetters([
                'getFeaturedMeetaps'
            ])
        }
    }
</script>

<style scoped>

</style>