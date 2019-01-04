<template>
  <v-app dark>
    <!-- for mobile -->
    <v-navigation-drawer temporary fixed v-model="sideNav">
      <v-list>
        <!-- feature of vuetify for routing -->
        <v-list-tile v-for="item in menuItems" :key="item.title"
        router
        :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile  @click="LogOut" v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon>arrow_back</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Log Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- for desktop -->
    <v-toolbar>
      <v-toolbar-side-icon
              @click.stop="sideNav = !sideNav"
              class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn class="hidden-xs-only log_out_btn" large @click="LogOut" v-if="userIsAuthenticated">
          <v-icon dark left>arrow_back</v-icon>
          Log Out
        </v-btn>
      <v-toolbar-items class="hidden-xs-only"  v-for="item in menuItems"
                       :key="item.title">
          <v-btn flat router :to="item.link" tag="span" style="cursor: pointer">
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
      sideNav: false
  }),
  computed: {
    menuItems () {
      let menuItems = [
        {icon: 'face', title: 'Sign up', link: '/signup'},
        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
          {icon: 'room', title: 'Organize Meetup', link: '/meetup/new'},
          {icon: 'person', title: 'Profile', link: '/profile'}
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.getUserOnPage !== null && this.$store.getters.getUserOnPage !== undefined
    }
  },
  methods: {
    LogOut() {
      console.log(222)
    }
  }
}
</script>
<style scoped lang="stylus">
  .log_out_btn
    margin 0
    height inherit

</style>
