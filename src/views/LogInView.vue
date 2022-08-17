<template>
  <div class="log-in">
    <div class="container has-text-centered">
      <div class="columns is-flex is-vcentered">
        <div class="column is-4 is-offset-4">
          <div class="box" style="margin-top: 50%;">
            <h3 class="title">Log ind</h3>
            <b-field custom-class="is-medium" 
                     label="Email" 
                     label-position="on-border"
                     :type="errors.email.length > 0 ? 'is-danger' : ''"
                     :message="errors.email[0]">
              <b-input type="email"
                      size="is-medium"
                      placeholder="din@email.com"
                      icon="at"
                      validation-message="Skriv en gyldig email adresse."
                      @keyup.native.enter="submitLogin()"                      
                      v-model="email">
              </b-input>
            </b-field>
            <b-field custom-class="is-medium"
                     label="Password"
                     label-position="on-border"
                     :type="errors.password.length > 0 ? 'is-danger' : ''"
                     :message="errors.password[0]">
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
import translation from '@/assets/translation'

export default {
  name: 'LogInView',
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: [],
        password: []
      },
      translation: translation,
      toastError: null
    }
  },
  mounted() {
    document.title = 'Log Ind | Madklub'
  },
  methods: {
    activateToast(msg) {
      this.toastError = this.$buefy.toast.open({
                          indefinite: true,
                          message: msg,
                          position: 'is-bottom',
                          type: 'is-danger',
                          pauseOnHover: true
                        })
    },
    async submitLogin() {
      this.$store.state.isLoading = true
      axios.defaults.headers.common['Authorization'] = ""
      localStorage.removeItem("token")

      const formData = {
        email: this.email,
        password: this.password
      }

      if (this.toastError) {
        this.toastError.close()
        this.toastError = null
      }

      await axios.post("/auth/token/login/", formData)
                 .then(response => {
                    const token = response.data.auth_token
                    const is_staff = response.data.is_staff

                    this.$store.commit('setToken', {token, is_staff})

                    this.$router.push({ path: '/'})
                    this.$store.state.isLoading = false
                 })
                 .catch(error => {
                    this.$store.state.isLoading = false
                    const data = error.response.data
                    this.errors = {
                      email: [],
                      password: []
                    }
                    for (const key in data) {
                      if (key === 'non_field_errors') {
                        this.activateToast(translation[data[key]])
                      } else {
                        this.errors[key] = this.errors[key].concat(data[key])
                      }
                    }
                 })
    }
  }
}
</script>

<style lang="scss">

</style>