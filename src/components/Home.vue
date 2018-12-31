<template>
   <v-container>
       <v-layout row wrap class="mb-2">
           <v-flex xs12 sm6 class="text-xs-center text-sm-right">
               <v-btn large router to="/meetups">Explore Meetups</v-btn>
           </v-flex>
           <v-flex xs12 sm6 class="text-xs-center text-sm-left">
               <v-btn large router to="/meetup/new">Organize Meetup</v-btn>
           </v-flex>
       </v-layout>
       <v-layout row wrap class="mt-2">
           <v-flex xs12>
               <v-carousel style="cursor: pointer">
                   <v-carousel-item
                           :key="i"
                           :src="item.imageUrl"
                           v-for="(item,i) in getFeaturedMeetaps"
                           @click.native="onLoadMeetup(item.id)"
                   >
                       <div class="title">
                           {{ item.title }}
                       </div>
                   </v-carousel-item>
               </v-carousel>
           </v-flex>
       </v-layout>
       <v-layout row wrap class="mt-2">
           <v-flex xs12 class="text-xs-center">
               <p>Join our awesome meetings!</p>
           </v-flex>
       </v-layout>
   </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            // mix the getters into computed with object spread operator
            ...mapGetters([
                'getFeaturedMeetaps'
            ])
        },
        methods: {
            onLoadMeetup(id) {
                this.$router.push(`/meetups/:${id}`)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .title
        position absolute
        color black
        font-size 34px !important
</style>