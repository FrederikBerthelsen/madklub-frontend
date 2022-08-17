<template>
 <div class="profile">
  <div class="container has-text-centered">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <!-- TABS WITH IS-TOGGLE-ROUNDED
            <b-tabs position="is-centered" type="is-toggle-rounded" expanded>
            <b-tab-item label="Pictures"></b-tab-item>
            <b-tab-item label="Music"></b-tab-item>
            <b-tab-item label="Videos"></b-tab-item>
        </b-tabs> -->
        <b-tabs position="is-centered" type="is-boxed" expanded @input="clearValues()">
            <b-tab-item label="Madklubber" icon="silverware-fork-knife">
              MADKLUB <br>
              MADKLUB <br>
              MADKLUB <br>
              MADKLUB <br>
              MADKLUB <br>
            </b-tab-item>
            <b-tab-item label="Informationer" icon="account">
              <ChangeProfile ref="profileComponent"/>
            </b-tab-item>
            <b-tab-item label="Email" icon="at">
              <ChangeEmail ref="emailComponent"/>
            </b-tab-item>
            <b-tab-item label="Password" icon="lock">
              <ChangePassword ref="passwordComponent"/>
            </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </div>
 </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'
import ChangeProfile from '@/components/ChangeProfile'
import ChangePassword from '@/components/ChangePassword'
import ChangeEmail from '@/components/ChangeEmail'

export default {
  name: 'ProfileView',
  components: {
    ChangeProfile,
    ChangePassword,
    ChangeEmail
  },
  mounted() {
    document.title = "Profil | Madklub"
  },
  methods: {
    clearValues() {
      const refs = this.$refs
      for (const key in refs) {
        refs[key].clearValues()
      }
    }
  }
}
</script>

<style lang="scss">
$primary: hsl(171, 100%, 41%);
$primary-light: hsl(171, 100%, 96%);
$primary-dark: hsl(171, 100%, 29%);

.tabs.is-toggle li.is-active a {
  background-color: $primary-dark;
  border-color: $primary-light;
}

.tabs.is-toggle a {
  border-color: $primary-light;
}

.tabs.is-toggle-rounded a:hover {
  background-color: $primary;
  color: white;
  border-color: $primary-light;
}

.tabs.is-toggle a:hover {
  background-color: $primary-dark;
  color: white;
  border-color: $primary-light;
}

.b-tabs .tabs.is-toggle li a:focus {
  background-color: $primary-dark;
  border-color: $primary-light;
}

.b-tabs .tabs.is-toggle li:not(.is-active) a:focus {
  border-color: $primary-light;
  background-color: $primary-dark;
}

.b-tabs .tabs.is-boxed li:not(.is-active) a:focus {
  border-bottom-color: $primary-light;
}

.tabs.is-boxed a:hover {
  background-color: $primary-dark;
  border-bottom-color: $primary-light;
}

.tabs.is-boxed li.is-active a {
  background-color: $primary;
}

.tabs a:hover {
  color: white;
}

.tabs li.is-active a {
  color: white;
}

.tabs a {
  color: white;
}
</style>