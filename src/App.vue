<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
    <v-footer app absolute>
      <v-card class="flex" outlined raised rounded>
        <v-card-text class="pa-2">
            <v-layout wrap>
              <v-flex class="text-left">
                <a class="pl-3">
                  Information
                </a>
                <a class="px-3">
                  Version
                </a>
                <a class="px-3">
                  Source
                </a>
                <a class="px-3">
                  Contact
                </a>
              </v-flex>
            </v-layout>
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
    setTheme(check: boolean): any {
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

</style>
