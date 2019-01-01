<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignIn">
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
                                <v-layout>
                                    <v-flex xs12>
                                        <v-btn type="submit">Sign in</v-btn>
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
        name: "SignIn",
        data: () =>  ({
            email: '',
            password: '',
            confirmPassword: ''
        }),
        computed: {
            ...mapGetters([
                'getUserOnPage'
            ])
        },
        watch: {
            getUserOnPage(val) {
                if (val !== null || val !== undefined) {
                    this.$router.push('/');
                }
            }

        },
        methods: {
            onSignIn() {
                this.$store.dispatch('signUserIn', {
                    email: this.email,
                    password: this.password
                })
            }
        }
    }
</script>

<style scoped>

</style>