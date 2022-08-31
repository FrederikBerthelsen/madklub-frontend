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
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>

  export default {
    name: "MadklubProfile",
    data() {
      return {
        participants: [],
        dateObject: new Date(),
        weekDay: 'Mandag',
        meat: 0,
        vegetarian: 0,
        dish: this.madklubObject.dish,
        diet: this.madklubObject.diet,
        vegan: 0,
        madklub: this.madklubObject,
        guests: 0,
        participantDiet: '',
      }
    },
    props: {
      madklubObject: Object,
    },
    methods: {
      formatParticipant(name, diet, guests) {
        var dietString = diet === 'meat' ? 'Kød' : diet === 'vegetarian' ? 'Vegetarisk' : diet === 'vegan' ? 'Vegan' : '?'
        var guestsString = guests === 1 ? ' + ' + guests + ' gæst' : guests > 1 ? ' + ' + guests + ' gæster' : ''
        return name + ' (' + dietString + ')' + guestsString
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
