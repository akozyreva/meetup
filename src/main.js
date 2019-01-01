import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router/index.js'
import {store} from './store/index.js'
import * as firebase from 'firebase'

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
