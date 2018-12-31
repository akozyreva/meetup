<template>
  <v-app dark>
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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon
              @click.stop="sideNav = !sideNav"
              class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
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
  data () {
    return {
      sideNav: false,
      menuItems: [
        {
          icon: 'trending_up',
          title: 'View Meetups',
          link: '/meetups'
        },
        {
          icon: 'group_add',
          title: 'Organize Meetup',
          link: '/meetup/new'
        },
        {
          icon: 'person',
          title: 'Profile',
          link: '/profile'
        },
        {
          icon: 'face',
          title: 'Sign up',
          link: '/signup'
        },

        {
          icon: 'lock_open',
          title: 'Sign in',
          link: '/signin'
        }
      ]
    }
  }
}
</script>
