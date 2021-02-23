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
                    <v-img alt="Vue logo"
                           contain height="150"
                           src="../../assets/logo.png"></v-img>
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
                  <v-flex xs8 class="search-div">
                    <v-layout row>
                      <v-flex xs10 class="input-field">
                        <v-icon class="icon">mdi-magnify</v-icon>
                        <v-text-field
                            class="mt-4 pt-4 input"
                            required
                            name="keyword"
                            rounded
                            clearable
                            placeholder="Search the Fediverse"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs2>
                        <v-btn type="submit" class="search-btn">Search</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs2>
                  </v-flex>
                  <v-flex xs4>
                  </v-flex>
                  <v-flex xs4>
                    <!--                    <v-btn block type="submit">Search</v-btn>-->
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
<style scoped>
.search-div {
  display: flex;
  width: 100%;
  border-radius: 34px;
  overflow: hidden;
}

.search-div .input-field {
  flex-grow: 1;
  display: flex;
  background: #e0e0e03b;
}

.search-div .input-field .icon {
  min-width: 80px;
  display: flex;
}

.search-div .input-field .input {
  height: 100%;
  background: transparent;
  border: 0;
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #000;
}

.search-btn {
  height: 100% !important;
  width: 100%;
  white-space: nowrap;
  font-size: 16px;
  color: #fff !important;
  border: 0;
  cursor: pointer;
  position: relative;
  z-index: 0;
  background: #009451 !important;
}
</style>
