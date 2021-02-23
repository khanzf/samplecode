<template>
  <div>
    <v-layout>
      <v-flex class="px-4">
        <v-switch v-model="$vuetify.theme.dark"
                  @change="setTheme"
                  inset
                  class="float-right"
                  label="Dark Mode"
                  persistent-hint>
        </v-switch>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-container align="center">
          <v-row no-gutters align="center"
                 justify="center">
            <v-col cols="12" sm="12">
              <v-layout>
                <v-flex xs4></v-flex>
                <v-flex xs4 justify-center>
                  <div>
                    <img style="width:45%;display:block;margin:0 auto" alt="Vue logo" src="../../assets/logo.png"/>
                  </div>
                </v-flex>
                <v-flex xs4></v-flex>
              </v-layout>
            </v-col>
          </v-row>
          <v-row no-gutters align="center"
                 justify="center">
            <v-col cols="12" sm="12">
              <!-- <v-card class="pa-2" outlined tile> -->
              <form action="/search">
                <v-layout row wrap align-center>
                  <v-flex xs2>
                  </v-flex>
                  <v-flex xs8>
                    <v-text-field
                        required
                        prepend-inner-icon="mdi-magnify"
                        solo
                        name="keyword"
                        rounded
                        clearable
                        placeholder="Search the Fediverse"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                  </v-flex>
                  <v-flex xs4>
                  </v-flex>
                  <v-flex xs4>
                    <v-btn block type="submit">Search</v-btn>
                  </v-flex>
                  <v-flex xs4>
                  </v-flex>
                </v-layout>
              </form>
              <!-- </v-card> -->
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
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
