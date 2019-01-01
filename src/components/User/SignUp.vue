<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form>
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
                                        <v-btn type="submit">Sign up</v-btn>
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
    export default {
        name: "SignUp",
        data () {
            return {
                email: '',
                password: '',
                confirmPassword: ''
            }
        },
        computed: {
            changePassword: function () {
                return this.password !== this.confirmPassword ? 'Passwords do not match':true
            }
        },
        methods: {
            onSignUp() {

            }
        }
    }
</script>

<style scoped>

</style>