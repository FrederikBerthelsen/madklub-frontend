<template>
  <div class="madklubOverview" style="margin-bottom: 1em;">
    <b-collapse :open="false" animation="slide" aria-id="contentIdForA11y1">
      <template #trigger="props">
        <div class="box" style="border-radius: 6px 6px 0 0;" :class="{ 'has-background-success' : participants.includes($store.state.userEmail) }" :aria-expanded="props.open">
          <div class="columns">
            <div class="column is-2">
              <h4 class="title is-5">{{ weekDay }} d. {{ dateObject.getDate() }}/{{ dateObject.getMonth() + 1}}</h4>
            </div>
            <div class="column is-4 is-offset-6" v-if="!madklub.active">
              <h4 class="title is-5">Lukket</h4>
            </div>
          </div>
          <div class="columns">
            <div class="column is-2">
              <b-icon icon="account"></b-icon>
              <h4 class="is-6">{{ madklub.owner.first_name }}</h4>
            </div>
            <div class="column is-2">
              <b-icon icon="silverware-fork-knife"></b-icon>
              <h4 class="is-6">{{ madklub.dish }}</h4>
            </div>
            <div class="column is-2">
              <b-icon icon="silverware-fork-knife"></b-icon>
              <h4 class="is-6" v-for="diet in madklub.diet" :key="diet">{{ diet === 'meat' ? 'Kød' : diet === 'vegetarian' ? 'Vegetarisk' : diet === 'vegan' ? 'Vegansk' : '?'}}</h4>
            </div>
            <div class="column is-2">
              <b-tooltip position="is-bottom" type="is-info"  multilined size="is-small">
              <b-icon icon="account-group"></b-icon>
                <h4 class="is-6">{{ meat + vegetarian + vegan }}</h4>
                <template v-slot:content>
                  <div class="content">
                    <h5 class="is-6 tooltipText">Kød: {{ meat }}</h5>
                    <h5 class="is-6 tooltipText">Vegetarer: {{ vegetarian }}</h5>
                    <h5 class="is-6 tooltipText">Veganere: {{ vegan }}</h5>
                  </div>
                </template>
              </b-tooltip>
            </div>
            <div class="column is-2">
              <b-button v-if="madklub.owner.email === $store.state.userEmail && madklub.active" type="is-info" expanded @click.stop="closeMadklub()">Luk madklub</b-button>
              <b-button v-else-if="madklub.owner.email === $store.state.userEmail && !madklub.active" type="is-info" expanded @click.stop="openMadklub()">Åben madklub</b-button>
              <b-button v-else-if="participants.includes($store.state.userEmail)" type="is-info" :disabled="!madklub.active" expanded @click.stop="leaveMadklub()">Forlad madklub</b-button>
              <b-button v-else-if="$store.state.isAuthenticated && (madklub.diet.length <= 1)" type="is-primary" expanded :disabled="!madklub.active" @click.stop="joinMadklub(madklub.diet[0])">Deltag</b-button>
              <b-dropdown @click.native.stop expanded v-else-if="$store.state.isAuthenticated && (madklub.diet.length > 1)" aria-role="list">
                <template #trigger="{ active }">
                  <b-button expanded label="Deltag" type="is-primary" :disabled="!madklub.active" :icon-right="active ? 'menu-up' : 'menu-down'"/>
                </template>
                <b-dropdown-item aria-role="listitem" v-for="diet in madklub.diet" :key="diet" @click="joinMadklub(diet)">{{ diet === 'meat' ? 'Kød' : diet === 'vegetarian' ? 'Vegetarisk' : diet === 'vegan' ? 'Vegansk' : '?'}}</b-dropdown-item>
              </b-dropdown>
            </div>
            <div v-if="madklub.owner.email === $store.state.userEmail" class="column is-2">
              <b-button type="is-danger" expanded @click.stop="deleteModal = true">Slet</b-button>
            </div>
          </div>
        </div>
      </template>
      <div class="box" style="border-radius: 0 0 6px 6px;">
        <div class="columns">
          <div class="column is-3 has-text-left"> 
            <!-- <h4 class="title is-5 is-left">Deltagere:</h4> -->
            <div class="divider is-primary mb-3 mt-0"><p class="divider-tag">Deltagere</p></div>
            <h5 class="subtitle is-6 is-left" style="margin-bottom: 0;" v-for="participant in madklub.participants" :key="participant.participant.email">{{ formatParticipant(participant.participant.first_name, participant.diet, participant.guests) }}</h5>
          </div>
          <div class="column is-3">
            <!-- <h4 class="title is-5 is-left">Gæster:</h4> -->
            <div class="divider is-primary mb-3 mt-0"><p class="divider-tag">Gæster</p></div>
            <b-dropdown
              v-model="guests"
              aria-role="list"
              append-to-body
              
              scrollable
              @change="saveGuests"
            >
              <template #trigger>
                <b-button
                  type="is-primary"
                  icon-right="menu-down"
                  icon-lef="account-multiple-plus"
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
          </div>
          <div class="column is-3" v-if="madklub.owner.email === $store.state.userEmail">
            <!-- <h4 class="title is-5 is-left">Menu:</h4> -->
            <div class="divider is-primary mb-3 mt-0"><p class="divider-tag">Ændre madklub</p></div>
            <b-button
              type="is-primary"
              label="Madklub info"
              @click="madklubModal = true"
              icon-left="cog"/>

          </div>
          <div class="column is-3 has-text-left" v-if="madklub.owner.email === $store.state.userEmail">
            <div class="divider is-primary mb-3 mt-0"><p class="divider-tag">Dato</p></div>
            <b-field>
            <b-datepicker 
              v-model="newMadklubDate"
              :show-week-number="true"
              :first-day-of-week="1"
              :month-names="months"
              locale="en-GB"
              icon="calendar-today"
              :day-names="days"
              :unselectable-days-of-week="[5, 6]"
              indicators="bars"
              :events="reservedDates"
              :input="openModal()"
              :unselectable-dates="unselectableDays">
            </b-datepicker>
            </b-field>
          </div>
        </div>
      </div>
    </b-collapse>
    <b-modal
      v-model="dateModal"
      has-modal-card
      trap-focus
      :can-cancel="['escape', 'outside']"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <div class="modal-card" style="width: auto;">
        <header class="modal-card-head is-primary-dark">
          <p class="modal-card-title">Sikker på du vil ændre dato?</p>
          <button
            type="button"
            class="delete"
            @click="closeModal()"/>
        </header>
        <section class="modal-card-body">
          <div class="content">
            <p class="is-size-6">Er du sikker på at du vil ændre datoen på din madklub?</p>
            <p class="is-size-6">Hvis du gør det, bliver alle deltagere fjernet fra madklubben.</p>
          </div>
        </section>
        <footer class="modal-card-foot is-right buttons">
          <b-button
            label="Luk"
            icon-left="close"
            @click="closeModal()"/>
          <b-button
            label="Skift dato"
            icon-left="calendar-edit"
            type="is-info"
            @click="changeDate()"/>
        </footer>
      </div>
    </b-modal>
    <b-modal
      v-model="deleteModal"
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
          <p class="modal-card-title">Slet madklub?</p>
          <button
            type="button"
            class="delete"
            @click="deleteModal = false"/>
        </header>
        <section class="modal-card-body">
          <div class="content">
            <p class="is-size-6">Er du sikker på at du vil slette din madklub?</p>
          </div>
        </section>
        <footer class="modal-card-foot is-right buttons">
          <b-button
            label="Luk"
            icon-left="close"
            @click="deleteModal = false"/>
          <b-button
            type="is-danger"
            icon-left="delete"
            label="Slet madklub"
            @click="deleteMadklub()"/>
        </footer>
      </div>
    </b-modal>
    <b-modal
      v-model="madklubModal"
      has-modal-card
      trap-focus
      :can-cancel="['escape', 'outside']"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      aria-modal
    >
      <div class="modal-card" style="width: auto;">
        <header class="modal-card-head is-primary-dark">
          <p class="modal-card-title">Madklub information</p>
          <button
            type="button"
            class="delete"
            @click="madklubModal = false"/>
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
            {{ translation[dietError] }}
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
        </section>
        <footer class="modal-card-foot is-right buttons">
          <b-button
            label="Close"
            icon-left="close"
            @click="madklubModal = false"/>
          <b-button
            label="Ændrer madklub"
            icon-left="cog"
            type="is-primary"
            @click="changeMadklub()"/>
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import translation from '@/assets/translation'
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
    name: "MadklubOverview",
    data() {
      return {
        months: months,
        days: days,
        oldMadklubDate: new Date(this.madklubObject.date),
        newMadklubDate: new Date(this.madklubObject.date),
        participants: [],
        dateObject: new Date(),
        weekDay: 'Mandag',
        meat: 0,
        vegetarian: 0,
        dish: this.madklubObject.dish,
        diet: this.madklubObject.diet,
        vegan: 0,
        madklub: this.madklubObject,
        deleteModal: false,
        madklubModal: false,
        dateModal: false,
        guests: 0,
        participantDiet: '',
        showError: false,
        dietError: '',
        translation: translation
      }
    },
    props: {
      madklubObject: Object,
      reservedDates: Array,
    },
    methods: {
      openModal() {
        if (!(this.oldMadklubDate.getTime() === this.newMadklubDate.getTime())) {
          this.dateModal = true
        }
      },
      closeModal() {
        if (!(this.oldMadklubDate.getTime() === this.newMadklubDate.getTime())) {
          this.newMadklubDate = this.oldMadklubDate
          this.dateModal = false
        }
      },
      unselectableDays(day) {
        const today = new Date()
        var occupied = []
        this.reservedDates.forEach(element => {
          occupied.push(element.date)
        })
        today.setDate(today.getDate() - 1)
        const match = occupied.find(d => d.getTime() === day.getTime())
        return (day.getTime() <= today.getTime() || !!(match))
      },
      clearErrors() {
        this.showError = false
        this.dietError = ''
      },
      formatParticipant(name, diet, guests) {
        var dietString = diet === 'meat' ? 'Kød' : diet === 'vegetarian' ? 'Vegetarisk' : diet === 'vegan' ? 'Vegan' : '?'
        var guestsString = guests === 1 ? ' + ' + guests + ' gæst' : guests > 1 ? ' + ' + guests + ' gæster' : ''
        return name + ' (' + dietString + ')' + guestsString
      },
      async changeDate() {
        this.$store.state.isLoading = true

        const stringDate = new Date(this.newMadklubDate.getTime() - (this.newMadklubDate.getTimezoneOffset() * 60000 )).toISOString().split('T')[0]
        
        const formData = {
          date: stringDate,
          diet: this.diet
        }

        await axios.patch("madklub/" + this.madklub.id + "/", formData)
                   .then(() => {
                      this.$emit('update')
                   })
      },
      async closeMadklub() {
        this.$store.state.isLoading = true
        await axios.post("/madklub/deactivate/", {'date': this.madklub.date})
                   .then(response => {
                       this.madklub = response.data
                       this.$store.state.isLoading = false
                     })
      },
      async openMadklub() {
        this.$store.state.isLoading = true
        await axios.post("/madklub/activate/", {'date': this.madklub.date})
                   .then(response => {
                       this.madklub = response.data
                       this.$store.state.isLoading = false
                     })
      },
      async deleteMadklub() {
        this.$store.state.isLoading = true
        await axios.delete("/madklub/" + this.madklub.id + '/')
                   .then(() => {
                       this.$emit('update')
                     })
      },
      async changeMadklub() {
        this.$store.state.isLoading = true

        const formData = {
          date: this.madklub.date,
          dish: this.dish,
          diet: this.diet
        }
        await axios.patch("/madklub/" + this.madklub.id + "/", formData)
                   .then(response => {
                       this.madklub = response.data
                       this.$store.state.isLoading = false
                       this.madklubModal = false
                     })
                   .catch(error => {
                       this.dietError = error.response.data.diet[0]
                       this.$store.state.isLoading = false
                       this.showError = true
                     })
      },
      async joinMadklub(diet) {
        this.$store.state.isLoading = true
        await axios.post("/madklub/join/", {'date': this.madklub.date, 'diet': diet})
                   .then(() => {
                       this.$emit('update')
                     })
      },
      async leaveMadklub() {
        this.$store.state.isLoading = true
        await axios.post("/madklub/leave/", {'date': this.madklub.date})
                   .then(() => {
                       this.$emit('update')
                     })
      },
      async saveGuests(info) {
        let newGuests = parseInt(info)
        await axios.post("/madklub/updateParticipant/", {'date': this.madklub.date, 'guests': newGuests, 'diet': this.participantDiet})
                   .then(response => {
                       this.madklub = response.data
                       this.getParticipantInfo()
                     })
      },
      getParticipantInfo() {
        this.meat = 0
        this.vegetarian = 0
        this.vegan = 0
        this.madklub.participants.forEach(participant => {
          this.participants.push(participant.participant.email)
          switch (participant.diet) {
            case 'meat':
              this.meat += 1 + participant.guests
              break
            case 'vegetarian':
              this.vegetarian += 1 + participant.guests
              break
            case 'vega':
              this.vegan += 1 + participant.guests
              break
          }     
        });
      },
      getWeekday() {
        this.dateObject = new Date(this.madklub.date)
        const day = this.dateObject.toLocaleDateString('da-DK', { weekday: 'long' })
        this.weekDay = day.charAt(0).toUpperCase() + day.slice(1)
      },
      getGuests() {
        let participant = this.madklub.participants.find(o => o.participant.email === this.$store.state.userEmail)
        if (participant) {
          this.guests = participant.guests
          this.participantDiet = participant.diet
        }
      }
    },
    mounted() {
      this.getWeekday()
      this.getGuests()
      this.getParticipantInfo()
    }
  }
</script>

<style lang="scss">
.button.is-primary.is-light {
  box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25)
}

.tooltipText {
  margin: 0.2em;
}
</style>
