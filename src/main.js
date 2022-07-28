import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_API

Vue.config.productionTip = false

Vue.use(Buefy)

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
