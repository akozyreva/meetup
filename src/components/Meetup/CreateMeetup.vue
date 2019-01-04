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
                          <!--  <input type="file">-->
                            <upload-btn
                                    :fileChangedCallback="fileChanged"
                                    color="blue-grey darken-2"
                                    class="upload_btn"
                            ></upload-btn>
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
                        <v-flex xs6 sm6 offset-sm3>
                            <img :src="imageUrl" height="200px">
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-10">
                        <v-flex xs5 sm6  offset-sm2>
                            <h3 class="mb-3">Choose a Date</h3>
                            <v-date-picker v-model="date">
                            </v-date-picker>
                        </v-flex>
                        <v-flex xs5 sm6>
                            <h3 class="mb-3">Choose Time</h3>
                            <v-time-picker
                                    v-model="time"
                            >
                            </v-time-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-10">
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
    import moment from 'moment'
    import UploadButton from 'vuetify-upload-button';
    export default {

        name: "CreateMeetup",
        components: {
            'upload-btn': UploadButton
        },
        data: () => ({
               title: '',
               location: '',
               description: '',
               imageUrl: '',
               date: '',
               time: ''
        }),
        created: function () {
            // return current datetime
            const dateTime = moment();
            //console.log(dateTime.format());
            this.date = dateTime.format('YYYY-MM-DD');
            this.time = dateTime.format('HH:mm');
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
            fileChanged (file) {
                console.log(file)
            },
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
                    date: `${this.date} ${this.time}`,
                    uid: this.$store.getters.getUserOnPage.id
                }
                this.$store.dispatch('createMeetup', meetUpData)
                this.$router.push('/meetups')
            }
        }
    }
</script>

<style scoped lang="stylus">
    .upload_btn
        padding 0
        margin 0
</style>