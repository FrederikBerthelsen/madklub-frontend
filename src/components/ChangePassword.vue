<template>
    <div class="changePassword">
        <div class="container has-text-centered">
            <div class="columns is-flex is-vcentered">
                <div class="column is-6 is-offset-3">
                    <div class="box" style="margin-top: 20%;">
                        <h3 class="title">Skift password</h3>
                        <div class="divider is-primary"><p class="divider-tag">Nyt password</p></div>
                        <b-field custom-class="is-medium" 
                                 label="Nyt password" 
                                 label-position="on-border"
                                 :type="errors.new_password.length > 0 ? 'is-danger' : ''"
                                 :message="translation[errors.new_password[0]]">
                            <b-input type="password"
                                    size="is-medium"
                                    icon="lock"
                                    placeholder="Dit nye password"
                                    v-model="new_password">
                            </b-input>
                        </b-field>
                        <b-field custom-class="is-medium" 
                                 label="Gentag nyt password"
                                 label-position="on-border"
                                 :type="errors.re_new_password.length > 0 ? 'is-danger' : ''"
                                 :message="translation[errors.re_new_password[0]]">
                            <b-input type="password"
                                    size="is-medium"
                                    icon="lock"
                                    placeholder="Gentag dit nye password"
                                    v-model="re_new_password">
                            </b-input>
                        </b-field>
                        <b-field custom-class="is-medium"
                                 label="Nuværende password"
                                 label-position="on-border"
                                 :type="errors.current_password.length > 0 ? 'is-danger' : ''"
                                 :message="translation[errors.current_password[0]]">
                            <b-input type="password"
                                    size="is-medium"
                                    icon="lock"
                                    placeholder="Dit nuværende password"
                                    @keyup.native.enter="changePassword()"
                                    v-model="password">
                            </b-input>
                        </b-field>
                        <div class="content"></div>            
                        <b-button size="is-medium"
                                icon-left="account-cog"
                                type="is-primary is-fullwidth"
                                @click="changePassword()">
                            Skift password
                        </b-button>
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
    name: "ChangePassword",
    data() {
        return {
            password: '',
            new_password: '',
            re_new_password: '',
            errors: {
                new_password: [],
                re_new_password: [],
                current_password: []
            },
            translation: translation
        }
    },
    methods: {
        clearValues() {
            this.new_password = ''
            this.re_new_password = ''
            this.password = ''
        },
        async changePassword() {
            this.$store.state.isLoading = true
            const formData = {
                new_password: this.new_password,
                re_new_password: this.re_new_password,
                current_password: this.password
            }

            await axios.post("/auth/users/set_password/", formData)
                       .then(() =>{
                          this.$store.state.isLoading = false
                          this.$buefy.toast.open({
                            duration: 5000,
                            message: 'Dit password er nu ændret!',
                            position: 'is-bottom-right',
                            type: 'is-info',
                            pauseOnHover: true
                          })
                          this.password = ''
                          this.new_password = ''
                          this.re_new_password = ''
                        })
                       .catch(error => {
                          this.$store.state.isLoading = false
                          const data = error.response.data
                          this.errors = {
                            new_password: [],
                            re_new_password: [],
                            current_password: []
                          }
                          for (const key in data) {
                            if (key === "non_field_errors") {
                                this.errors['re_new_password'] = this.errors['re_new_password'].concat(data[key])
                            } else {
                                this.errors[key] = this.errors[key].concat(data[key])
                            }
                          }
                       })
        }
    }
}
</script>