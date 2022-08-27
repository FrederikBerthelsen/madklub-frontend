<template>
  <div class="madklubOverview">
    <b-collapse :open="false" aria-id="contentIdForA11y1">
      <template #trigger="props">
        <div class="box" :aria-expanded="props.open">
          <div class="columns">
            <div class="column is-2">
              <h4 class="title is-6">{{ madklub.date }}</h4>
            </div>
          </div>
          <div class="columns">
            <div class="column is-2">
              <b-icon icon="account"></b-icon>
              <h4 class="is-6">{{ madklub.owner.first_name }}</h4>
              <!-- <h4 class="subtitle is-6"><b-icon icon="account" size="is-small"></b-icon>{{ madklub.owner.first_name }}</h4> -->
            </div>
            <div class="column is-2">
              <b-icon icon="silverware-fork-knife"></b-icon>
              <h4 class="is-6">{{ madklub.dish }}</h4>
            </div>
            <div class="column is-2">
              <b-icon icon="silverware-fork-knife"></b-icon>
              <h4 class="is-6" v-for="diet in madklub.diet" :key="diet">{{ diet }}</h4>
            </div>
            <div class="column is-2">
              <b-icon icon="account-group"></b-icon>
              <h4 class="is-6">Kød: {{ madklub.participants.length }}</h4>
            </div>
            <div class="column is-2">
              <b-button type="is-primary" expanded>Deltag</b-button>
            </div>
            <div class="column is-2">
              <b-button type="is-danger" expanded>Slet</b-button>
            </div>
          </div>
        </div>
      </template>
      <div class="box">
        <h4 class="subtitle">{{ madklub.dish }}</h4>
      </div>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: "MadklubOverview",
    data() {
      return {
        madklub: {
          id: 90,
          owner: {
            diet: "meat",
            first_name: "Frederik",
            last_name: "Berthelsen",
            id: 1,
            email: "frede2501@hotmail.com"
          },
          participants: [
            {
              participant: {
                diet: "meat",
                first_name: "Frederik",
                last_name: "Berthelsen",
                id: 1,
                email: "frede2501@hotmail.com"
              },
              diet: "meat",
              guests: 0
            }
          ],
          dish: "Mad",
          date: "2022-08-28",
          active: true,
          diet: [
            "meat",
            "vegetarian"
          ]
        } 
      }
    }
  }
</script>
