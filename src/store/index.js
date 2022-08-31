import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: '',
    isStaff: false,
    isLoading: false,
    userEmail: ''
  },
  getters: {
  },
  mutations: {
    initWithToken(state, {token, is_staff, userEmail}) {
        state.token = token
        state.isStaff = is_staff
        state.isAuthenticated = true
        state.userEmail = userEmail
    },
    initNoToken(state) {
      state.token = ''
      state.isAuthenticated = false
      state.userEmail = ''
    },
    setToken(state, {token, is_staff, userEmail}) {
      localStorage.setItem('token', token)
      axios.defaults.headers.common["Authorization"] = "Token " + token
      state.token = token
      state.isStaff = is_staff
      state.isAuthenticated = true
      state.userEmail = userEmail
    },
    removeToken(state) {
      localStorage.removeItem('token')
      axios.defaults.headers.common["Authorization"] = ""
      state.token = ''
      state.isStaff = false
      state.isAuthenticated = false
      state.userEmail = ''
    }
  },
  actions: {
    async initializeStore() {
      const token = localStorage.getItem('token')
      var is_staff = false
      var userEmail = ''
      if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
        await axios.get("/auth/is_staff")
                   .then(response => {
                     is_staff = response.data.is_staff
                     userEmail = response.data.email
                     this.commit('initWithToken', {token, is_staff, userEmail})
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
