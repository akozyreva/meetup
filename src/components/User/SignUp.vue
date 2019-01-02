<template>
    <v-container>
        <v-layout row v-if="error !== null">
            <v-flex xs12 sm6 offset-sm3>
            <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignUp">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                        name="email"
                                        label="Mail"
                                        id="email"
                                        v-model="email"
                                        type="email"
                                        :rules="['Required']">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="password"
                                                label="Password"
                                                id="password"
                                                v-model="password"
                                                type="password"
                                                :rules="['Required']">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                id="confirm-password"
                                                v-model="confirmPassword"
                                                type="password"
                                                :rules="[changePassword, 'Required']">
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout>
                                    <v-flex xs12>
                                        <app-btn text="Sign Up"></app-btn>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "SignUp",
        data: () =>  ({
                email: '',
                password: '',
                confirmPassword: ''
        }),
        computed: {
            changePassword: function () {
                return this.password !== this.confirmPassword ? 'Passwords do not match':true
            },
            ...mapGetters([
                'getUserOnPage'
            ]),
            error () {
                return this.$store.getters.getError
            }
        },
        watch: {
            getUserOnPage(val) {
                if (val !== null || val !== undefined) {
                    this.$router.push('/');
                }
            }

        },
        methods: {
            onSignUp() {
                this.$store.dispatch('signUserUp', {
                    email: this.email,
                    password: this.password
                })
            },
            onDismissed() {
                // once we close alert, error will be clear
                this.$store.dispatch('clearError')
            }
        }
    }
</script>

<style>
    .custom-loader {
        animation: loader 1s infinite;
        display: flex;
    }
    @-moz-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @-o-keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
    @keyframes loader {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>