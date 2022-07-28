<template>
  <div class="log-in">
    <div class="container has-text-centered">
      <div class="columns is-flex is-vcentered">
        <div class="column is-4 is-offset-4">
          <div class="box" style="margin-top: 50%;">
            <h3 class="title">Log ind</h3>
            <b-field custom-class="is-medium" label="Email" label-position="on-border">
              <b-input type="email"
                      size="is-medium"
                      placeholder="din@email.com"
                      icon="at"
                      @keyup.native.enter="submitLogin()"
                      v-model="email">
              </b-input>
            </b-field>
            <b-field custom-class="is-medium" label="Password" label-position="on-border">
              <b-input type="password"
                       size="is-medium"
                       icon="lock"
                       placeholder="Dit password"
                       @keyup.native.enter="submitLogin()"
                       v-model="password">
              </b-input>
            </b-field>
            <div class="content has-text-left">
              <router-link to="/log-in" class="has-text-link">Glemt password?</router-link>
            </div>
            
            <b-button size="is-medium"
                      icon-left="login"
                      type="is-primary is-fullwidth"
                      @click="submitLogin()">
              Log ind          
            </b-button>
            <p class="mb-3" style="margin-top: 2rem;">Ingen bruger endnu? <router-link to="/register" class="has-text-link">Registrer dig her</router-link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LogInView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submitLogin() {
      axios.defaults.headers.common['Authorization'] = ""
      localStorage.removeItem("token")

      const formData = {
        email: this.email,
        password: this.password
      }

      await axios.post("/auth/token/login/", formData)
                 .then(response => {
                    const token = response.data.auth_token
                    const is_staff = response.data.is_staff

                    this.$store.commit('setToken', {token, is_staff})

                    this.$router.push({ path: '/'})
                 })
                 .catch(error => {
                    if (error.response) {
                      console.log(error.response.data)
                    }
                 })
    }
  }
}
</script>

<style lang="scss">

</style>