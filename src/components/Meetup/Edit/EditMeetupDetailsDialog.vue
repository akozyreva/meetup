<template>
    <v-dialog width="600px"  v-model="editDialog" dark>
        <!-- btn for opening dialog -->
        <v-btn fab accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs16>
                        <v-card-text>
                            <v-text-field
                                    name="title"
                                    label="Title"
                                    id="title"
                                    v-model="editedTitle"
                                    :rules="['Required']"
                            ></v-text-field>
                            <v-textarea
                                    name="description"
                                    label="Description"
                                    v-model="editedDescription"
                                    id="description"
                                    :rules="['Required']"
                                    rows="8"
                            >
                            </v-textarea>
                        </v-card-text>
                    </v-flex>
                    <v-layout row wrap>
                        <v-flex xs1 sm6>
                            <h3 class="mb-3">Choose a Date</h3>
                            <v-date-picker
                                    width="200"
                                    reactive
                                    v-model="editedDate">
                            </v-date-picker>
                        </v-flex>
                        <v-flex xs1 sm6>
                            <h3 class="mb-3">Choose Time</h3>
                            <v-time-picker
                                    width="200"
                                    v-model="editedTime"
                                    value="hh:mm"
                            >
                            </v-time-picker>
                        </v-flex>
                    </v-layout>
                </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-actions>
                                <v-btn flat @click="editDialog=false">Close</v-btn>
                                <v-btn flat
                                       @click="onSaveChanges" :disabled="(editedTitle.trim() === '' || editedDescription.trim() === '')
                                       || (editedTitle === this.meetup.title && editedDescription === this.meetup.description &&
                                       editedDate === this.meetup.date.slice(0,10) && editedTime === this.meetup.date.slice(10,16))"
                                >Save</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['meetup'],
        name: "EditMeetupDetailsDialog",
        data () {
            return {
                // by activator editDialog will be true initially
                editDialog: false,
                editedTitle: this.meetup.title,
                editedDescription: this.meetup.description,
                editedDate: '',
                editedTime: ''
            }
        },
        created: function() {
            this.editedTime = this.meetup.date.slice(10,17);
            this.editedDate = this.meetup.date.slice(0,10)
        } ,
        methods: {
            onSaveChanges() {
                this.editDialog = false;
                const updateData= {
                    id: this.meetup.id,
                    title: this.editedTitle,
                    description: this.editedDescription,
                    date: `${this.editedDate.trim()} ${this.editedTime.trim()}`
                };
                Object.keys(updateData).forEach( key => {
                   if (key !== 'id' && updateData[key] === this.meetup[key]) {
                       delete updateData[key]
                   }
                });
                this.$store.dispatch('updateMeetupData', updateData);
            }
        }

    }
</script>

<style scoped>

</style>
