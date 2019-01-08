<template>
    <v-dialog width="350px" persistent v-model="editDialog">
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
                    <v-flex xs12>
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
                </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card-actions>
                                <v-btn flat @click="editDialog=false">Close</v-btn>
                                <v-btn flat
                                       @click="onSaveChanges" :disabled="(editedTitle.trim() === '' || editedDescription.trim() === '')
                                       || (editedTitle === this.meetup.title && editedDescription === this.meetup.description)"
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
                editedDescription: this.meetup.description
            }
        },
        methods: {
            onSaveChanges() {
                this.editDialog = false;
                const updateData= {
                    id: this.meetup.id,
                    title: this.editedTitle,
                    description: this.editedDescription
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