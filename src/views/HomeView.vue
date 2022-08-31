<template>
  <div class="madklub-overview">
    <div class="container has-text-centered">
      <div class="columns is-flex is-vcentered">
        <div class="column is-10 is-offset-1">
          <MadklubOverview v-for="madklub in madklubs" :key="madklub.id" :reservedDates="reservedDates" :madklubObject="madklub" @update="getMadklubs()"/>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import MadklubOverview from '@/components/MadklubOverview'

export default {
  name: 'HomeView',
  components: {
      MadklubOverview,
  },
  data() {
    return {
      madklubs: [],
      reservedDates: []
    }
  },
  methods: {
    async getMadklubs() {
      this.madklubs = []
      this.reservedDates = []
      this.$store.state.isLoading = true
      await axios.get("/madklub/")
                 .then(response => {
                     var data = response.data
                     this.$store.state.isLoading = false
                     this.madklubs = data
                     data.forEach(element => {
                       this.reservedDates.push({date: new Date(new Date(element.date).setHours(0)), type: 'is-danger'})
                     })
                   })
    }
  },
  mounted() {
    document.title = 'Madklub'
    this.getMadklubs()
  }
}
</script>
