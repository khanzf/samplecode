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
    <v-footer app absolute>
      <v-card class="flex" outlined raised rounded>
        <v-card-title class="pa-2 text-right">
          <v-layout wrap class="mx-auto">
            <v-flex xs12 class="text-center">
              <v-img
                  alt="Vuetify Name"
                  contain
                  height="35"
                  src="./assets/logo.png"
              />
              <div class="text--primary text-body-2">
                Carbon Neutral Since 2007
              </div>
            </v-flex>
          </v-layout>

        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-flex xs12>
            <v-layout wrap row>
              <v-flex class="text-left">
                <a class="pa-4">
                  Information
                </a>
                <a class="pa-4">
                  Version
                </a>
                <a class="pa-4">
                  Source
                </a>
                <a class="pa-4">
                  Contact
                </a>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-card-text>
      </v-card>
    </v-footer>
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
