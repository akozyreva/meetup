import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router/index.js'
import {store} from './store/index.js'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'
import Btn from './components/Shared/Btn.vue'
import {loadMeetups} from "./store/actions";

Vue.component('app-alert', AlertCmp);
Vue.component('app-btn', Btn);

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBS3QCJTabW3T3Chl76opbOehWWL7PoW-o',
      authDomain: 'meetup-136a5.firebaseapp.com',
      databaseURL: 'https://meetup-136a5.firebaseio.com',
      projectId: 'meetup-136a5',
      storageBucket: 'meetup-136a5.appspot.com'
    });
    // load meetups from db
    this.$store.dispatch('loadMeetups');
    //checking the user
    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount('#app');


Vue.use(Vuetify, {
  theme: {
    primary: '#D32F2F',
    accent: '#FF5252',
    secondary: '#BDBDBD',
    info: '#1E88E5',
    warning: '#FFA000',
    error: '#D50000',
    success: '#66BB6A'
  }
});
