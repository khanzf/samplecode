<template>
  <v-app>
    <!--    <v-app-bar app>-->
    <!--      <router-link to="/">-->
    <!--        <div class="d-flex align-center">-->
    <!--          <v-img-->
    <!--              alt="Vuetify Logo"-->
    <!--              class="shrink mr-2"-->
    <!--              contain-->
    <!--              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"-->
    <!--              transition="scale-transition"-->
    <!--              width="40"-->
    <!--          />-->

    <!--          <v-img-->
    <!--              alt="Vuetify Name"-->
    <!--              class="shrink mt-1 hidden-sm-and-down"-->
    <!--              contain-->
    <!--              min-width="100"-->
    <!--              src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"-->
    <!--              width="100"-->
    <!--          />-->
    <!--        </div>-->
    <!--      </router-link>-->
    <!--      <v-spacer></v-spacer>-->
    <!--    </v-app-bar>-->

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    setTheme(check: Boolean): any {
      if (check) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.removeItem('theme');
      }
    },
  },
});
</script>

<style scoped>
/* Dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white;
  }
}
</style>
