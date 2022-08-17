<template>
    <div class="changeEmail">
        <div class="container has-text-centered">
            <div class="columns is-flex is-vcentered">
                <div class="column is-6 is-offset-3">
                    <div class="box" style="margin-top: 20%;">
                        <h3 class="title">Skift email indstillinger</h3>
                        <div class="divider is-primary"><p class="divider-tag">Skift email</p></div>
                        <b-field custom-class="is-medium" label="Email"  label-position="on-border">
                            <b-input type="email"
                                    size="is-medium"
                                    icon="at"
                                    placeholder="din@email.com"
                                    v-model="new_email"
                                    @keyup.native.enter="openModal()"
                                    validation-message="Skriv en gyldig email adresse.">
                            </b-input>
                        </b-field>
                        <div class="content"></div>            
                        <b-button size="is-medium"
                                icon-left="account-cog"
                                type="is-primary is-fullwidth"
                                @click="openModal()">
                            Skift email
                        </b-button>

                        <b-modal
                            v-model="modal"
                            has-modal-card
                            trap-focus
                            :can-cancel="['escape', 'outside']"
                            aria-role="dialog"
                            aria-label="Example Modal"
                            close-button-aria-label="Close"
                            aria-modal
                        >
                            <div class="modal-card" style="width: auto">
                                <header class="modal-card-head  is-primary-dark">
                                    <p class="modal-card-title">Password</p>
                                    <button
                                        type="button"
                                        class="delete"
                                        @click="modal = false; clearErrors()"/>
                                </header>
                                <section class="modal-card-body">
                                    <div class="content">
                                        <p class="is-size-6">Skriv dit password for at ændre email indstillinger</p>
                                    </div>
                                    <b-field custom-class="is-medium" 
                                             label="Password" 
                                             label-position="on-border"
                                             :type="errors.current_password.length > 0 ? 'is-danger' : ''"
                                             :message="translation[errors.current_password[0]]">
                                        <b-input type="password"
                                                size="is-medium"
                                                icon="lock"
                                                placeholder="Dit password"
                                                @keyup.native.enter="changeEmail()"
                                                v-model="password">
                                        </b-input>
                                    </b-field>
                                </section>
                                <footer class="modal-card-foot">
                                    <b-button
                                        label="Close"
                                        icon-left="close"
                                        @click="modal = false; clearErrors()" />
                                    <b-button
                                        label="Skift email"
                                        icon-left="account-cog"
                                        type="is-primary"
                                        @click="changeEmail()"/>
                                </footer>
                            </div>
                        </b-modal>
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
    name: "ChangeEmail",
    data() {
        return {
            email: '',
            new_email: '',
            password: '',
            modal: false,
            errors: {
                new_email: [],
                current_password: []
            },
            translation: translation
        }
    },
    methods: {
        clearValues() {
            this.new_email = this.email
            this.password = ''
        },
        clearErrors() {
            this.errors = {
                new_email: [],
                current_password: []
            }
            this.password = ''
        },
        validateEmail(email) {
            const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return email.match(re)
        },
        openModal() {
            if (!this.validateEmail(this.new_email)) {
                return
            }
            if (this.email === this.new_email) {
                this.$buefy.toast.open({
                            duration: 5000,
                            message: 'Dine email er blevet ændret',
                            position: 'is-bottom-right',
                            type: 'is-info',
                            pauseOnHover: true
                          })
                return
            } else {
                this.modal = true
            }
        },
        async changeEmail() { 
            this.$store.state.isLoading = true
            const formData = {
                new_email: this.new_email,
                current_password: this.password
            }

            await axios.post("/auth/users/set_email/", formData)
                       .then(() => {
                          this.$store.state.isLoading = false
                          this.modal = false
                          this.$buefy.toast.open({
                            duration: 5000,
                            message: 'Din email er nu ændret!',
                            position: 'is-bottom-right',
                            type: 'is-info',
                            pauseOnHover: true
                          })
                          this.email = this.new_email
                          this.password = ''
                          this.clearErrors()
                        })
                       .catch(error => {
                          this.$store.state.isLoading = false
                          this.clearErrors()
                          const data = error.response.data
                          for (const key in data) {
                            if (key === 'current_password') {
                                this.errors[key] = this.errors[key].concat(data[key])
                            } else if (key === 'new_email') {
                                this.clearErrors()
                                this.modal = false
                                this.$buefy.toast.open({
                                    duration: 5000,
                                    message: translation[data[key]],
                                    position: 'is-bottom',
                                    type: 'is-danger',
                                    pauseOnHover: true
                                })
                                this.new_email = this.email
                            }
                          }
                       })
        },
        async getProfile() {
            this.$store.state.isLoading = true
            await axios.get("/auth/users/me")
                       .then(response => {
                            this.$store.state.isLoading = false
                            const data = response.data
                            this.email = data.email
                            this.new_email = data.email
                       })
        }
    },
    mounted() {
        this.getProfile()
    }
}
</script>