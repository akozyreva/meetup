<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h2>{{ getLoadedOneMeetup(id).title }}</h2>
                        <template v-if="true">
                            <v-spacer>
                                <app-edit-meetup-details-dialog></app-edit-meetup-details-dialog>
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
                        <v-btn>Register</v-btn>
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
            userIsAuthenticated() {
                return undefined;
            }
        }
    }
</script>

<style scoped>

</style>