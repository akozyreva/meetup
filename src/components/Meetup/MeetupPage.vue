<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h2>My Meetup</h2>
                    </v-card-title>
                    <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
                            height="400px"
                    ></v-img>
                    <v-card-text>
                        <div>17th July 2019</div>
                        <div>
                            lorem ipsumCannabis raptus calcaria est.Ionic cannon at the cosmos was the ellipse of powerdrain, yearned to an evasive machine.
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
    export default {
        name: "MeetupPage"
    }
</script>

<style scoped>

</style>