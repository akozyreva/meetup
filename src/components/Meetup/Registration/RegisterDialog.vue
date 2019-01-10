<template>
    <v-dialog persistent v-model="registerDialog">
        <v-btn accent slot="activator">
            {{ userIsRegistered ? 'Unregister' : 'Register'}}
        </v-btn>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
                    <v-card-title v-else>Register from Meetup</v-card-title>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-text>You can always change your decision later on</v-card-text>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card-actions>
                        <v-btn @click="registerDialog=false">Cancel</v-btn>
                        <v-btn @click="onAgree">Confirm</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-dialog>
</template>

<script>
    export default {
        // send meetupId to component
        props: ['meetupId'],
        data () {
            return {
                registerDialog: false
            }
        },
        name: "RegisterDialog",
        computed: {
            userIsRegistered () {
                if(this.$store.getters.getUserOnPage === null) {
                    return false;
                }
                return this.$store.getters.getUserOnPage.registeredMeetups.findIndex( meetup => {
                    return meetup.id === this.meetupId
                }) >= 0
            }
        },
        methods: {
            onAgree() {
                if(this.$store.getters.getUserOnPage === null) {
                    this.registerDialog = false
                    this.$router.push('/signup')
                    return
                } else {
                    if(!this.userIsRegistered) {
                        this.$store.dispatch('registerUserForMeetup', this.meetupId);
                    } else {
                        this.$store.dispatch('unregisterUserForMeetup', this.meetupId);
                    }
                }


            }
        }
    }
</script>

<style scoped>

</style>