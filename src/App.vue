<template>
  <div id="app">
    <b-navbar :fixed-top="true" type="has-background-primary-dark is-primary">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/'}">
          Madklub
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item class="is-white" tag="a" @click="modal=!modal; test()">
          <span style="padding-right: 0.5em;">Madklub ugeplan</span>
          <b-icon icon="calendar-month" size="is-small"></b-icon>
        </b-navbar-item> 

        <b-navbar-item v-if="$store.state.isStaff" class="is-white" tag="router-link" :to="{ path: '/createschema'}">
          <span style="padding-right: 0.5em;">Madklub skema</span>
          <b-icon icon="clock-outline" size="is-small"></b-icon>
        </b-navbar-item>        

        <b-navbar-item v-if="$store.state.isAuthenticated" class="is-white" tag="router-link" :to="{ path: '/profile'}">
          <span style="padding-right: 0.5em;">Min bruger</span>
          <b-icon icon="account" size="is-small"></b-icon>
        </b-navbar-item>
        <b-navbar-item v-else class="is-white" tag="router-link" :to="{ path: '/log-in'}">
          <span style="padding-right: 0.5em;">Log ind</span>
          <b-icon icon="login" size="is-small"></b-icon>
        </b-navbar-item>

        <b-navbar-item 
          v-if="$store.state.isAuthenticated" 
          class="is-white"
          @click="logout()"
        >
          <span style="padding-right: 0.5em;">Log ud</span>
          <b-icon icon="logout" size="is-small"></b-icon>
        </b-navbar-item>
        <b-navbar-item v-else class="is-white" tag="router-link" :to="{ path: '/register'}">
          <span style="padding-right: 0.5em;">Registrer</span>
          <b-icon icon="account-plus" size="is-small"></b-icon>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="section">
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
        <div class="modal-card" >
          <header class="modal-card-head  is-primary-dark">
              <p class="modal-card-title">Ugeplan</p>
              <button
                  type="button"
                  class="delete"
                  @click="modal = false"/>
          </header>
          <section class="modal-card-body">
              <div class="container has-text-centered">
                <WeeklySchedule />
              </div>
          </section >
        </div> 
      </b-modal> 


      <router-view/>
    </section>

    <b-loading v-model="$store.state.isLoading">
        <b-icon
            pack="fas"
            icon="spinner"
            size="is-large"
            custom-class="fa-spin">
        </b-icon>
      </b-loading>
  </div>
</template>

<script>
import axios from 'axios'
import WeeklySchedule from '@/components/WeeklySchedule'

export default {
  components: {
    WeeklySchedule
  },
  data() {
    return {
      showMobileMenu: false, 
      modal: false 
    }
  },
  // beforeCreate() {
  //   this.$store.dispatch('initializeStore')
  // },
  methods: {
    test() {
      console.log(this.modal)
    },
    logout() {
      axios.post("/auth/token/logout/")
      this.$store.commit('removeToken')
      this.$router.push('/log-in')
    }
  }
}
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: hsl(171, 100%, 41%);
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$primary-invert: findColorInvert($primary);

$info: hsl(204, 86%, 53%);
$info-light: findLightColor($info);
$info-dark: findDarkColor($info);
$info-invert: findColorInvert($info);

$link: hsl(217, 71%, 53%);
$link-light: findLightColor($link);
$link-dark: findDarkColor($link);
$link-invert: findColorInvert($link);

$success: hsl(141, 53%, 53%);
$success-light: findLightColor($success);
$success-dark: findDarkColor($success);
$success-invert: findColorInvert($success);

$danger: hsl(348, 100%, 61%);
$danger-light: findLightColor($danger);
$danger-dark: findDarkColor($danger);
$danger-invert: findColorInvert($danger);

$tabs-boxed-link-focus-active-background-color: $primary;
$tabs-boxed-link-focus-background-color: $primary;
$tabs-boxed-link-focus-active-border-bottom-color: $primary;
$tabs-boxed-link-focus-border-bottom-color: $primary;

$modal-card-head-background-color: $primary-dark;
$modal-card-title-color: white;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
    (
        "primary": (
            $primary,
            $primary-invert,
            $primary-light,
            $primary-dark,
        ),
        "info": (
          $info,
          $info-light,
          $info-dark,
          $info-invert,
        ),
        "link": (
          $link,
          $link-light,
          $link-dark,
          $link-invert,
        ),
        "success": (
          $success,
          $success-light,
          $success-dark,
          $success-invert,
        ),
        "danger": (
          $danger,
          $danger-light,
          $danger-dark,
          $danger-invert,
        ),
    ),
    $custom-colors
);


// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
@import "~@creativebulma/bulma-divider";


// .is-white {
//   color: white;
// }

// .navbar-menu {
//   background-color: $primary-dark;
// }

html {
  background-color: $primary;
}

body {
  height: 100%;
}

.b-radio.radio.button.is-selected {
  border-color: hsl(171, 100%, 41%);
}
.divider-tag {
  color: black;
  text-transform: none;
  font-size: 0.9rem;
}
</style>
