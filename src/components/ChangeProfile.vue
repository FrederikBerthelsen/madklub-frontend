<template>
    <div class="changeProfile">
        <div class="container has-text-centered">
            <div class="columns is-flex is-vcentered">
                <div class="column is-6 is-offset-3">
                    <div class="box" style="margin-top: 4rem;">
                        <h3 class="title">Ændre informationer</h3>
                        <div class="divider is-primary"><p class="divider-tag">Skift dit navn</p></div>
                        <b-field custom-class="is-medium"
                                 label="Fornavn"
                                 label-position="on-border"
                                 :type="first_name_type"
                                 :message="first_name_error">
                            <b-input size="is-medium"
                                    icon="account-circle"
                                    placeholder="Dit fornavn"
                                    v-model="first_name">
                            </b-input>
                        </b-field>
                        <b-field custom-class="is-medium" label="Efternavn" label-position="on-border">
                            <b-input size="is-medium"
                                    icon="account-circle"
                                    placeholder="Dit efternavn"
                                    v-model="last_name">
                            </b-input>
                        </b-field>
                        <div class="divider is-primary"><p class="divider-tag">Skift din diæt</p></div>
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
                        <div class="content"></div>            
                        <b-button size="is-medium"
                                icon-left="account-cog"
                                type="is-primary is-fullwidth"
                                @click="changeProfile()">
                            Lav ændringer
                        </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "ChangeProfile",
    data() {
        return {
            first_name: '',
            orig_first_name: '',
            last_name: '',
            orig_last_name: '',
            diet: '',
            orig_diet: '',
            first_name_type: '',
            first_name_error: ''
        }
    },
    methods: {
        clearValues() {
            this.first_name = this.orig_first_name
            this.last_name = this.orig_last_name
            this.diet = this.orig_diet
        },
        async changeProfile() {
            this.$store.state.isLoading = true
            this.first_name_type = ''
            this.first_name_error = ''
            if (!this.first_name || this.first_name === '') {
                this.first_name_type = 'is-danger'
                this.first_name_error = 'Fornavn er påkrævet.'
                return
            }


            const formData = {
                first_name: this.first_name,
                last_name: this.last_name,
                diet: this.diet
            }

            await axios.patch("/auth/users/me/", formData)
                       .then(() => {
                          this.$store.state.isLoading = false
                          this.$buefy.toast.open({
                            duration: 5000,
                            message: 'Dine informationer er nu ændret!',
                            position: 'is-bottom-right',
                            type: 'is-info',
                            pauseOnHover: true
                          })
                        })
        },
        async getProfile() {
            this.$store.state.isLoading = true
            await axios.get("/auth/users/me")
                       .then(response => {
                            this.$store.state.isLoading = false
                            const data = response.data
                            this.first_name = data.first_name
                            this.orig_first_name = data.first_name
                            this.last_name = data.last_name
                            this.orig_last_name = data.last_name
                            this.diet = data.diet
                            this.orig_diet = data.diet
                       })
        }
    },
    mounted() {
        this.getProfile()
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
