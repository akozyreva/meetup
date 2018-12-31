<template>
    <v-container>
        <v-layout raw>
            <v-flex xs12 sm6 offset-sm3>
                <h2>Create a new Meetup</h2>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <!-- in order not to send hhtp reauest -->
                <v-form @submit.prevent="onCreateMeetup">
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            name="title"
                            label="Title"
                            id="title"
                            v-model="title"
                            :rules="['Required']"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="location"
                                    label="Location"
                                    id="location"
                                    v-model="location"
                                    :rules="['Required']"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                    name="imageUrl"
                                    label="ImageUrl"
                                    v-model="imageUrl"
                                    id="image-url"
                                    :rules="['Required']"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                                name="description"
                                label="Description"
                                id="description"
                                v-model="description"
                                :rules="['Required']"
                                rows="8"
                                >
                            </v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" height="200px">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm5>
                            <v-btn :disabled="!formIsValid"
                            type="submit"
                            >Create Meetup</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "CreateMeetup",
        data() {
           return {
               title: '',
               location: '',
               description: '',
               imageUrl: ''
           }
        },
        computed: {
            formIsValid () {
                return this.title !== '' &&
                    this.location !== '' &&
                    this.description !== '' &&
                    this.imageUrl !== ''
            }
        },
        methods: {
            onCreateMeetup() {
                // additional check for from validation
                if (!this.formIsValid) {
                    return
                }
                const meetUpData = {
                    title: this.title,
                    location: this.location,
                    description: this.description,
                    imageUrl: this.imageUrl,
                    date: new Date()
                }
                this.$store.dispatch('createMeetup', meetUpData)
                this.$router.push('/meetups')
            }
        }
    }
</script>

<style scoped>
</style>