<template>
  <div class="madklub-overview">
    <div class="container has-text-centered">
      <div class="columns is-flex is-vcentered">
        <div class="column is-10 is-offset-1">
          <MadklubOverview/>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'
import MadklubOverview from '@/components/MadklubOverview'

export default {
  name: 'HomeView',
  components: {
      MadklubOverview,
  },
  mounted() {
    document.title = 'Madklub'
  }
}
</script>
