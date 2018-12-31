import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router/index.js'
import {store} from './store/index.js'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


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
})

