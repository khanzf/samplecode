<template>
  <div>
    <v-layout>
      <v-flex class="px-4">
        <v-switch v-model="$vuetify.theme.dark"
                  @change="setTheme"
                  class="float-right"
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
                  <v-img alt="Vue logo"
                         contain height="150"
                         src="../../assets/logo.png"></v-img>
                </div>
              </v-flex>
              <v-flex xs4></v-flex>
            </v-layout>
          </v-col>
        </v-row>
        <!-- <v-card class="pa-2" outlined tile> -->

        <v-flex xs12 class="search-div mx-auto">
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
              <v-btn type="submit" class="search-btn">Search</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <!-- </v-card> -->
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
<style>
@media screen and (min-width: 1150px) {
  .search-div {
    width: 60% !important;
  }
}

.search-div {
  display: flex;
  border-radius: 34px;
  overflow: hidden;
  width: 100%;
}

.search-div .input-field {
  background: #e0e0e03b;
}

.search-btn {
  display: flex;
  height: 100% !important;
  width: 100%;
  font-size: 16px;
  color: #fff !important;
  border: 0;
  cursor: pointer;
  padding-left: 0 !important;
  background: #009451 !important;
}

</style>
<style>
.v-text-field--rounded > .v-input__control > .v-input__slot {
  padding-right: 6px !important;
}

.text-field--display .v-text-field--rounded > .v-input__control > .v-input__slot {
  padding: 0px 6px !important;
}

.text-field--display .v-text-field--outlined.v-input--dense.v-text-field--single-line > .v-input__control > .v-input__slot, .v-text-field--outlined.v-input--dense.v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 10px;
}
</style>
