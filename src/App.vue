<template>
  <v-app dark>
    <v-navigation-drawer temporary fixed v-model="sideNav">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>trending_up</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>View Meetups</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon
              @click.stop="sideNav = !sideNav"
              class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat>
          <v-icon left>trending_up</v-icon>
          View Meetups</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main></main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      sideNav: false
    }
  }
}
</script>
