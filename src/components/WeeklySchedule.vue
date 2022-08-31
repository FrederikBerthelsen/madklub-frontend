<template> 
  <div class="weeklySchedule">
    <div class="box" v-for="schedule in schedules" :key="schedule.week">
    <div class="divider is-primary" style="margin-top: 0px;"><p class="divider-tag"> Uge {{schedule.week}}</p></div>
      <div class="columns is-flex is-vcentered">
        <div class="column is-12">
          <b-taglist>
            <b-tag type="is-primary" size="is-medium" v-for="user in schedule.users" :key="user.id"> {{user.first_name}}</b-tag>
          </b-taglist>
        </div>
      </div>
    </div>
  </div>
</template>

<script> 
    import axios from 'axios'

    export default {
        name: 'WeeklySchedule', 
        data() {
            return {
                schedules: []
            }
        }, 
        methods: {
            async getSchedules() {
                await axios.get("/schema")
                           .then(response => {
                               this.schedules = response.data
                           })  
            }
        }, 
        mounted() {
            this.getSchedules()
        }

    }
</script>

<style lang="scss" scoped>
.box {
  margin-bottom: 1rem;
}
</style>
