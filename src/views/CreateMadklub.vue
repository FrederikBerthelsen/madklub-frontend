<template>
  <div class="createmadklub">
    <div class="container has-text-centered">
      <div class="columns is-flex is-vcentered">
        <div class="column is-6 is-offset-3">
          <div class="box">
            <h3 class="title">Opret madklub</h3>
            <div class="divider is-primary"><p class="divider-tag">Vælg en dato</p></div>
              <b-datepicker 
                v-model="madklubDate"
                inline
                :show-week-number="true"
                :first-day-of-week="1"
                :month-names="months"
                :day-names="days"
                :unselectable-days-of-week="[5, 6]"
                indicators="bars"
                :events="reservedDates"
                :input="openModal()"
                :unselectable-dates="unselectableDays">
              </b-datepicker>
          </div>
        </div>
      </div>
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
          <header class="modal-card-head is-primary-dark">
            <p class="modal-card-title">Madklub information</p>
            <button
              type="button"
              class="delete"
              @click="closeModal()"/>
          </header>
          <section class="modal-card-body">
            <div class="divider is-primary mt-0"><p class="divider-tag">Vælg menu</p></div>
            <b-field custom-class="is-medium"
              label="Menu"
              label-position="on-border"
            >
              <b-input
                size="is-medium"
                icon="silverware-fork-knife"
                placeholder="Vælg en menu"
                v-model="dish"/>
            </b-field>
            <div class="divider is-primary"><p class="divider-tag">Vælg en eller flere diæter</p></div>
            <b-notification
              v-model="showError"
              type="is-danger"
              has-icon
              icon-size="is-medium"
              :closable="false"
              :queue="false"
              indefinite
              role="alert"
            >
              {{ translation[errors.diet[0]] }}
            </b-notification>
            <b-field>
              <b-checkbox-button v-model="diet"
                native-value="vegetarian"
                @input="clearErrors()"
                type="is-primary is-light">
                <b-icon icon="silverware-fork-knife"></b-icon>
                <span>Vegetarisk</span>
              </b-checkbox-button>
            </b-field>
            <b-field>
              <b-checkbox-button v-model="diet"
                native-value="vegan"
                @input="clearErrors()"
                type="is-primary is-light">
                <b-icon icon="silverware-fork-knife"></b-icon>
                <span>Vegansk</span>
              </b-checkbox-button>
            </b-field>
            <b-field>
              <b-checkbox-button v-model="diet"
                native-value="meat"
                @input="clearErrors()"
                type="is-primary is-light">
                <b-icon icon="silverware-fork-knife"></b-icon>
                <span>Kød</span>
              </b-checkbox-button>
            </b-field>
            <div class="divider is-primary"><p class="divider-tag">Tilføj gæster udefra</p></div>
            <b-dropdown
              v-model="guests"
              aria-role="list"
              append-to-body
              scrollable
            >
              <template #trigger>
                <b-button
                  type="is-primary"
                  icon-right="menu-down"
                  icon-left="account-multiple-plus"
                >
                  <span v-if="guests != 1">{{ guests }} gæster</span>
                  <span v-else>{{ guests }} gæst</span>
                </b-button>
              </template>

              <b-dropdown-item value="0" aria-role="listitem">
                <span>0 gæster</span>
              </b-dropdown-item>

              <b-dropdown-item value="1" aria-role="listitem">
                <span>1 gæst</span>
              </b-dropdown-item>

              <b-dropdown-item value="2" aria-role="listitem">
                <span>2 gæster</span>
              </b-dropdown-item>

              <b-dropdown-item value="3" aria-role="listitem">
                <span>3 gæster</span>
              </b-dropdown-item>

              <b-dropdown-item value="4" aria-role="listitem">
                <span>4 gæster</span>
              </b-dropdown-item>

              <b-dropdown-item value="5" aria-role="listitem">
                <span>5 gæster</span>
              </b-dropdown-item>

              <b-dropdown-item value="6" aria-role="listitem">
                <span>6 gæster</span>
              </b-dropdown-item>

              <b-dropdown-item value="7" aria-role="listitem">
                <span>7 gæster</span>
              </b-dropdown-item>

              <b-dropdown-item value="8" aria-role="listitem">
                <span>8 gæster</span>
              </b-dropdown-item>

              <b-dropdown-item value="9" aria-role="listitem">
                <span>9 gæster</span>
              </b-dropdown-item>

            </b-dropdown>
            <!-- <b-field label="Gæster"> -->
            <!--   <b-numberinput type="is-primary is-light" min="0" max="9" v-model="guests"/> -->
            <!-- </b-field> -->
          </section>
          <footer class="modal-card-foot is-right buttons">
            <b-button
              label="Close"
              icon-left="close"
              @click="closeModal()"/>
            <b-button
              label="Opret madklub"
              icon-left="hamburger-plus"
              type="is-primary"
              @click="saveMadklub()"/>
          </footer>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import translation from '@/assets/translation'

const months = [
  "Januar",
  "Februar",
  "Marts",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "December"
]

const days = [
  "S",
  "M",
  "T",
  "O",
  "T",
  "F",
  "L",
]

export default {
  name: 'CreateMadklubView',
  data() {
    return {
      months: months,
      days: days,
      modal: false,
      madklubDate: null, 
      reservedDates: [],
      dish: '',
      diet: [],
      guests: 0,
      errors: {
        diet: [],
        date: [],
        madklub: [],
      },
      showError: false,
      translation: translation
    }
  },
  methods: {
    clearErrors() {
      this.showError = false
      this.errors.diet = []
    },
    unselectableDays(day) {
      const today = new Date()
      var occupied = []
      this.reservedDates.forEach(element => {
        occupied.push(element.date)
      });
      today.setDate(today.getDate() - 1)
      const match = occupied.find(d => d.getTime() === day.getTime())
      return (day.getTime() <= today.getTime()) || !!(match)
    },
    async getMadklubs() {
      this.$store.state.isLoading = true
      await axios.get("/madklub")
                 .then(response => {
                   this.$store.state.isLoading = false
                   var data = response.data
                   data.forEach(element => {
                     this.reservedDates.push({date: new Date(new Date(element.date).setHours(0)), type: 'is-danger'})
                   });
                 })
    },
    async saveMadklub() {
      this.$store.state.isLoading = true


      const stringDate = new Date(this.madklubDate.getTime() - (this.madklubDate.getTimezoneOffset() * 60000 )).toISOString().split('T')[0]

      const formData = {
          date: stringDate,
          dish: this.dish,
          diet: this.diet,
          guests: this.guests
      }

      await axios.post("/madklub/", formData)
                 .then(() => {
                   this.$store.state.isLoading = false
                   this.$router.push({ path: '/'})
                   this.$buefy.toast.open({
                     duration: 5000,
                     message: 'Madklub er blevet oprettet den ' + stringDate,
                     position: 'is-bottom-right',
                     type: 'is-info',
                     pauseOnHover: true
                   })
                 })
                 .catch(error => {
                   this.$store.state.isLoading = false
                   const data = error.response.data
                   this.errors = {
                     diet: [],
                     dish: [],
                     madklub: [],
                   }
                   for (const key in data) {
                     if (key === 'diet') {
                         this.showError = true
                     }
                     this.errors[key] = this.errors[key].concat(data[key])
                   }
                 })
    },
    openModal() {
      if (!(this.madklubDate === null)) {
        this.modal = true
      }
    },
    closeModal() {
      if (this.madklubDate !== null) {
        this.madklubDate = null
        this.modal = false
      }
    }
  },
  mounted() {
    document.title = 'Opret Madklub'

    this.getMadklubs()
  }
}
</script>

<style lang="scss">
.button.is-primary.is-light {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25)
}

</style>
