<template>
  <div>
    <v-layout>
      <v-flex class="px-4">
        <v-switch v-model="$vuetify.theme.dark"
                  @change="setTheme"
                  class="float-right"
                  dense inset
                  label="Dark Mode"
                  persistent-hint>
        </v-switch>
      </v-flex>
    </v-layout>
    <form action="/search">
      <v-container align="center">
        <v-row no-gutters align="center"
               justify="center">
          <v-col cols="12" sm="12">
            <v-layout>
              <v-flex xs4></v-flex>
              <v-flex xs4 justify-center>
                <div>
                  <v-img
                      contain height="200"
                      src="../../assets/logo.svg"></v-img>
                </div>
              </v-flex>
              <v-flex xs4></v-flex>
            </v-layout>
          </v-col>
        </v-row>
        <v-flex xs12 class="search-div mx-auto" :class="isMobile() ? '': 'mt-5'">
          <v-layout row wrap>
            <v-flex xs9 class="input-field">
              <v-text-field
                  class="text-center"
                  prepend-inner-icon="mdi-magnify"
                  required
                  name="keyword"
                  rounded
                  clearable
                  placeholder="Search the Fediverse"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-btn type="submit" class="search-btn success">Search</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-container>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    },
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

