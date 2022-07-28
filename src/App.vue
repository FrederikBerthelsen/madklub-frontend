<template>
  <div id="app">
    <b-navbar :fixed-top="true" type="has-background-primary-dark is-primary">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/'}">
          Madklub
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item v-if="$store.state.isAuthenticated" class="is-white" tag="router-link" :to="{ path: '/profile'}">
          <span style="padding-right: 0.5em;">Min bruger</span>
          <b-icon icon="login" size="is-small"></b-icon>
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
          <b-icon icon="account-plus" size="is-small"></b-icon>
        </b-navbar-item>
        <b-navbar-item v-else class="is-white" tag="router-link" :to="{ path: '/register'}">
          <span style="padding-right: 0.5em;">Registrer</span>
          <b-icon icon="account-plus" size="is-small"></b-icon>
        </b-navbar-item>
      </template>
    </b-navbar>

    <section class="section">
      <router-view/>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      showMobileMenu: false
    }
  },
  beforeCreate() {
    this.$store.dispatch('initializeStore')
  },
  methods: {
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
</style>
