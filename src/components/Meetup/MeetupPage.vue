<template>
    <v-container>
        <app-loader></app-loader>
        <v-layout row wrap v-if="!this.$store.getters.getLoading">
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h2>{{ getLoadedOneMeetup(id).title }}</h2>
                        <template v-if="userIsCreator">
                            <v-spacer>
                                <app-edit-meetup-details-dialog :meetup="getLoadedOneMeetup(id)"></app-edit-meetup-details-dialog>
                            </v-spacer>
                        </template>
                    </v-card-title>
                    <v-img
                            :src="getLoadedOneMeetup(id).imageUrl"
                            height="400px"
                    ></v-img>
                    <v-card-text>
                        <div>{{ getLoadedOneMeetup(id).date }} - {{ getLoadedOneMeetup(id).location }}</div>
                        <div>
                           {{ getLoadedOneMeetup(id).description }}
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <!-- add space in order to put btn right -->
                        <v-spacer></v-spacer>
                       <app-register-dialog :meetupId="id" v-show="!userIsCreator"></app-register-dialog>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "MeetupPage",
        props: ['id'],
        computed: {
            // mix the getters into computed with object spread operator
            ...mapGetters([
                'getLoadedOneMeetup'
            ]),
            userIsCreator () {
                if (this.$store.getters.getUserOnPage === null || this.$store.getters.getUserOnPage === undefined) {
                    return false;
                }
                return this.$store.getters.getUserOnPage.id === this.$store.getters.getLoadedOneMeetup(this.id).uid

            }
        }
    }
</script>

<style scoped>

</style>