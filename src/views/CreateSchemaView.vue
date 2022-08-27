<template>
  <div class="create-schema">
    <div class="container has-text-centered">
    <div class="columns is-flex is-vcentered">
      <div class="column is-8 is-offset-2">
          <div v-for="week in weeks" :key="week.week" class="box">
            <div class="columns">
              <div class="column is-2">
                <b-field>
                  <b-tag type="is-success" size="is-medium">Uge {{ week.week }}</b-tag>
                </b-field>
                <b-field position="is-centered">
                  <b-tooltip label="Gem uge" position="is-bottom" type="is-info">
                    <b-button type="is-info" icon-right="check" inverted @click="saveWeek(week)"/>
                  </b-tooltip>
                  <b-tooltip label="Slet uge" position="is-bottom" type="is-danger"> 
                    <b-button @click="deleteWeek(week.week)" type="is-danger" icon-right="delete" inverted/>
                  </b-tooltip>
                </b-field>
              </div>
              <div class="column is-10">
                <b-field label="Vælg personer" label-position="on-border">
                  <b-taginput
                    v-model="week.users"
                    :data="selectablePeople"
                    autocomplete
                    :open-on-focus=true
                    maxtags="7"
                    field="first_name"
                    icon="account"
                    type="is-info"
                    placeholder="Tilføj personer til den valgte uge"
                    @typing="getFilteredTags">
                  </b-taginput>
                </b-field>
              </div>
            </div>
          </div>
          <div class="column is-3 is-offset-4">
            <div class="box test">
              <div class="buttons is-centered">
                <!-- <b-button @click="removeWeek()" type="is-primary" icon-right="minus"/> -->
                <b-button @click="addWeek()" type="is-primary" icon-right="plus"/>
                <b-datepicker
                  ref="datepicker"
                  :week-number-clickable="true"
                  :unselectable-days-of-week="[0, 1, 2, 3, 4, 5, 6]"
                  :show-week-number="true"
                  :mobile-native="false"
                  :first-day-of-week="1"
                  :month-names="months"
                  :day-names="days"
                  @week-number-click="selectWeek"
                  >
                  <template v-slot:trigger>
                      <b-button
                          icon-left="calendar-today"
                          type="is-primary" />
                  </template>
                </b-datepicker>
                <b-button type="is-success" icon-left="content-save" @click="saveAllWeeks" expanded>
                  Gem Alle
                </b-button>
              </div>

              <!-- <b-field label="Vælg en uge" grouped>
                <b-datepicker
                  ref="datepicker"
                  :week-number-clickable="true"
                  :unselectable-days-of-week="[0, 1, 2, 3, 4, 5, 6]"
                  :show-week-number="true"
                  :mobile-native="false"
                  @week-number-click="selectWeek"
                  >
                  <template v-slot:trigger>
                      <b-button
                          icon-left="calendar-today"
                          type="is-primary" />
                  </template>
                </b-datepicker>
                <b-input expanded readonly :value="selectedWeek" />
              </b-field>

              <b-field label="Uge Nr.">
                <b-numberinput v-model="selectedWeek" :controls="false">
                </b-numberinput>
              </b-field> -->
            </div>
          </div>
        </div>
      </div>
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
  name: 'CreateSchemaView',
  data() {
    return {
      selectablePeople: [],
      allPeople: [],
      months: months,
      days: days,
      selectedWeek: 1,
      weeks: []
    }
  },
  methods: {
    getCurrentWeek() {
      var currentDate = new Date()

      var dayn = (currentDate.getDay() + 6) % 7
      currentDate.setDate(currentDate.getDate() - dayn + 3)

      var firstThursday = currentDate.valueOf()
      currentDate.setMonth(0, 1)

      if (currentDate.getDay() !== 4) {
        currentDate.setMonth(0, 1 + ((4 - currentDate.getDay()) + 7) % 7)
      }

      this.selectedWeek = 2 + Math.ceil((firstThursday - currentDate) / 604800000)
    },
    getFilteredTags(text) {
      this.selectablePeople = this.allPeople.filter((option) => {
          return option.first_name
              .toString()
              .toLowerCase()
              .indexOf(text.toLowerCase()) >= 0
      })
    },
    selectWeek(week) {
      this.selectedWeek = week
      this.addWeek()
      this.$refs.datepicker.toggle()
    },
    async deleteWeek(week) {
      var idx = this.weeks.findIndex(obj => {
        return obj["week"] === week
      })
      this.weeks.splice(idx, 1)
      await axios.post("/schema/", [{week: week, user_ids: []}])
    },
    removeWeek() {
      this.weeks.pop()
    },
    addWeek() {
      if (this.selectedWeek >= 1 && this.selectedWeek <= 52) {
        this.weeks.push({week: this.selectedWeek, users: []})
        this.selectedWeek += 1
      }
    },
    async saveWeek(week) {
      var data = {week: week.week, user_ids: []}
      week.users.forEach(element => {
        data.user_ids.push(element.id)
      });

      await axios.post("/schema/", [data])
                 .then(() => {
                     this.$buefy.toast.open({
                         duration: 5000,
                         message: 'Uge ' + week.week + ' er nu gemt!',
                         position: 'is-bottom-right',
                         type: 'is-info',
                         pauseOnHover: true
                       })
                     var idx = this.weeks.findIndex(obj => {
                       return obj["week"] === week.week
                    })
                    this.weeks.splice(idx, 1)
                 })
                 .catch(() => {
                     this.$buefy.toast.open({
                         duration: 5000,
                         message: 'Noget gik galt, prøv igen!',
                         position: 'is-bottom-right',
                         type: 'is-info',
                         pauseOnHover: true
                       })
                   })
    },
    async saveAllWeeks() {
      var formData = []
      this.weeks.forEach(week => {
        var user_ids = []
        week.users.forEach(user => {
          user_ids.push(user.id)
        })
        formData.push({week: week.week, user_ids: user_ids})
      });

      await axios.post("/schema/", formData)
                 .then(() => {
                     this.weeks = []
                     this.$buefy.toast.open({
                         duration: 5000,
                         message: 'Alle uger er nu gemt!',
                         position: 'is-bottom-right',
                         type: 'is-info',
                         pauseOnHover: true
                     })
                   })
                   .catch(() => {
                     this.$buefy.toast.open({
                         duration: 5000,
                         message: 'Noget gik galt, prøv igen!',
                         position: 'is-bottom-right',
                         type: 'is-info',
                         pauseOnHover: true
                       })
                     }) 
    },
    async getUsers() {
      await axios.get("/auth/users/")
                 .then(response => {
                   this.selectablePeople = response.data
                   this.allPeople = this.selectablePeople
                 })
    }
  },
  mounted() {
    document.title = 'Opret Skema | Madklub'

    this.getCurrentWeek()
    this.getUsers()
  }
}
</script>

<style lang="scss" scoped>

.button.is-info:focus:not(:active), .button.is-info.is-focused:not(:active) {
  box-shadow: none;
}

.box {
  padding-bottom: 0;
}

.test {
  padding-bottom: 1.25rem;
}

.button.is-danger.is-inverted {
  background-color: white;
}

.button.is-info.is-inverted {
  background-color: white;
}

.field:not(:last-child) {
  margin-bottom: 0;
}

</style>
