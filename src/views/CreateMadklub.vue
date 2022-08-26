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
            <div class="divider is-primary"><p class="divider-tag">Vælg menu</p></div>
            <b-field custom-class="is-medium"
              label="Dish"
              label-position="on-border"
            >
              <b-input
                size="is-medium"
                icon="silverware-fork-knife"
                placeholder="Vælg en menu"
                v-model="dish"/>
            </b-field>
            <div class="divider is-primary"><p class="divider-tag">Vælg en eller flere diæter</p></div>
            <b-field>
              <b-checkbox-button v-model="diet"
                native-value="vegetarian"
                type="is-primary is-light">
                <b-icon icon="silverware-fork-knife"></b-icon>
                <span>Vegetarisk</span>
              </b-checkbox-button>
            </b-field>
            <b-field>
              <b-checkbox-button v-model="diet"
                native-value="vegan"
                type="is-primary is-light">
                <b-icon icon="silverware-fork-knife"></b-icon>
                <span>Vegansk</span>
              </b-checkbox-button>
            </b-field>
            <b-field>
              <b-checkbox-button v-model="diet"
                native-value="meat"
                type="is-primary is-light">
                <b-icon icon="silverware-fork-knife"></b-icon>
                <span>Kød</span>
              </b-checkbox-button>
            </b-field>
            <div class="divider is-primary"><p class="divider-tag">Tilføj gæster udefra</p></div>
            <b-field label="Gæster">
              <b-numberinput type="is-primary is-light" min="0" max="9" v-model="guests"/>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button
              label="Close"
              icon-left="close"
              @click="closeModal()"/>
            <b-button
              label="Opret madklub"
              icon-left="hamburger-plus"
              type="is-primary"/>
          </footer>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

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
    }
  },
  methods: {
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
      await axios.get("/madklub")
                 .then(response => {
                   var data = response.data
                   data.forEach(element => {
                     this.reservedDates.push({date: new Date(new Date(element.date).setHours(0)), type: 'is-danger'})
                   });
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

<style lang="scss" scope>
.button.is-primary.is-light {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25)
}

</style>
