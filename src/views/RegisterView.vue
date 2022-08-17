<template>
  <div class="register">
    <div class="container has-text-centered">
      <div class="columns is-flex is-vcentered">
        <div class="column is-4 is-offset-4">
          <div class="box" style="margin-top: -3%;">
            <h3 class="title">Registrer</h3>
            <div class="divider is-primary"><p class="divider-tag">Dit navn</p></div>
            <b-field custom-class="is-medium" 
                     label="Fornavn" 
                     label-position="on-border"
                     :type="errors.first_name.length > 0 ? 'is-danger' : ''"
                     :message="errors.first_name[0]">
              <b-input size="is-medium"
                       icon="account-circle"
                       placeholder="Dit fornavn"
                       v-model="first_name">
              </b-input>
            </b-field>
            <b-field custom-class="is-medium" 
                     label="Efternavn" 
                     label-position="on-border">
              <b-input size="is-medium"
                       icon="account-circle"
                       placeholder="Dit efternavn"
                       v-model="last_name">
              </b-input>
            </b-field>
            <div class="divider is-primary"><p class="divider-tag">Din diæt</p></div>
            <div class="container">
              <b-field>
                <b-radio-button v-model="diet"
                  native-value="vegetarian"
                  type="is-primary is-light">
                  <b-icon icon="silverware-fork-knife"></b-icon>
                  Vegetarisk
                </b-radio-button>
              </b-field>
              <b-field>
                <b-radio-button v-model="diet"
                  native-value="vegan"
                  type="is-primary is-light">
                  <b-icon icon="silverware-fork-knife"></b-icon>
                  Vegansk
                </b-radio-button>
              </b-field>
              <b-field>
                <b-radio-button v-model="diet"
                  native-value="meat"
                  type="is-primary is-light">
                  <b-icon icon="silverware-fork-knife"></b-icon>
                  Kød
                </b-radio-button>
              </b-field>
            </div>
            <div class="divider is-primary"><p class="divider-tag">Dit login</p></div>
            <b-field custom-class="is-medium"
                     label="Email"
                     label-position="on-border"
                     :type="errors.email.length > 0 ? 'is-danger' : ''"
                     :message="translation[errors.email[0]]">
              <b-input type="email"
                       size="is-medium"
                       icon="at"
                       validation-message="Skriv en gyldig email adresse."
                       placeholder="din@email.com"
                       v-model="email">
              </b-input>
            </b-field>
            <b-field custom-class="is-medium"
                     label="Password"
                     label-position="on-border"
                     :type="errors.password.length > 0 ? 'is-danger' : ''"
                     :message="translation[errors.password[0]]">
              <b-input type="password"
                       size="is-medium"
                       icon="lock"
                       placeholder="Dit password"
                       v-model="password">
              </b-input>
            </b-field>
            <b-field custom-class="is-medium"
                     label="Gentag password"
                     label-position="on-border"
                     :type="errors.re_password.length > 0 ? 'is-danger' : ''"
                     :message="translation[errors.re_password[0]]">
              <b-input type="password"
                       size="is-medium"
                       icon="lock"
                       placeholder="Gentag dit password"
                       @keyup.native.enter="submitRegistration()"
                       v-model="re_password">
              </b-input>
            </b-field>
            <div class="content"></div>            
            <b-button size="is-medium"
                      icon-left="account-plus"
                      type="is-primary is-fullwidth"
                      @click="submitRegistration()">
              Registrer
            </b-button>
            <p class="mb-3" style="margin-top: 2rem;">Har du allerede en bruger? <router-link to="/log-in" class="has-text-link">Log ind her</router-link></p>
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
      first_name: '',
      last_name: '',
      diet: 'vegetarian',
      email: '',
      password: '',
      re_password: '',
      errors: {
        first_name: [],
        email: [],
        password: [],
        re_password: [],
      },
      translation: translation
    }
  },
  mounted() {
    document.title = "Registrer | Madklub"
  },
  methods: {
    async submitRegistration() {
      this.$store.state.isLoading = true
      if (!this.first_name || this.first_name === '') {
        this.errors['first_name'] = ['Fornavn er påkrævet.']
      } else {
        this.errors['first_name'] = []
      }

      const formData = {
        first_name: this.first_name,
        last_name: this.last_name,
        diet: this.diet,
        email: this.email,
        password: this.password,
        re_password: this.re_password
      }

      await axios.post("/auth/users/", formData)
                 .then(() => {
                    this.$store.state.isLoading = false
                    this.$router.push({ path: '/log-in'})
                    this.$buefy.toast.open({
                      duration: 5000,
                      message: 'Du er nu oprettet og kan logge ind!',
                      position: 'is-bottom-right',
                      type: 'is-info',
                      pauseOnHover: true
                    })
                 })
                 .catch(error => {
                    this.$store.state.isLoading = false
                    const data = error.response.data
                    this.errors = {
                      first_name: this.errors.first_name,
                      email: [],
                      password: [],
                      re_password: [],
                    }
                    for (const key in data) {
                      if (key === "non_field_errors") {
                        this.errors['re_password'] = this.errors['re_password'].concat(data[key])
                      } else {
                        this.errors[key] = this.errors[key].concat(data[key])
                      }
                    }
                 })
    }
  }
}
</script>

<!-- <style lang="scss">
.b-radio.radio.button.is-selected {
  border-color: hsl(171, 100%, 41%);
}
.divider-tag {
  color: black;
  text-transform: none;
  font-size: 0.9rem;
}
</style> -->