import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: '',
    isStaff: false,
    isLoading: false
  },
  getters: {
  },
  mutations: {
    initWithToken(state, {token, is_staff}) {
        state.token = token
        state.isStaff = is_staff
        state.isAuthenticated = true
    },
    initNoToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
    setToken(state, {token, is_staff}) {
      localStorage.setItem('token', token)
      axios.defaults.headers.common["Authorization"] = "Token " + token
      state.token = token
      state.isStaff = is_staff
      state.isAuthenticated = true
    },
    removeToken(state) {
      localStorage.removeItem('token')
      axios.defaults.headers.common["Authorization"] = ""
      state.token = ''
      state.isStaff = false
      state.isAuthenticated = false
    }
  },
  actions: {
    async initializeStore() {
      const token = localStorage.getItem('token')
      var is_staff = false
      if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
        await axios.get("/auth/is_staff")
                   .then(response => {
                     is_staff = response.data.is_staff
                     this.commit('initWithToken', {token, is_staff})
                     return new Promise((resolve) => {
                        resolve(response)
                     }) 
                   })
      } else {
        this.commit('initNoToken')
      }
    },
  },
  modules: {
  }
})
