<template>
  <div>
    <v-app-bar app flat fixed dense :prominent="isMobile()">
      <v-layout :row="isMobile()" class="ma-auto pt-2">
        <v-flex xs12 v-if="isMobile()" class="pt-2">
          <v-layout row>
            <v-flex xs4></v-flex>
            <v-flex xs4>
              <router-link to="/">
                <v-img
                    alt="Vuetify Name"
                    contain
                    height="35"
                    src="../../assets/logo.png"
                    width="100"
                />
              </router-link>
            </v-flex>
            <v-flex xs4>
              <v-switch v-model="$vuetify.theme.dark"
                        @change="setTheme"
                        label="Dark Mode"
                        class="float-right"
                        persistent-hint>
              </v-switch>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex sm2 xs12 v-else>
          <router-link to="/">
            <v-img
                alt="Vuetify Name"
                contain
                height="35"
                src="../../assets/logo.png"
                width="100"
            />
          </router-link>
        </v-flex>
        <v-flex :class="isMobile() ? 'sm12 xs12': 'sm8 xs12'" class="text-field--display">
          <form action="/search">
            <v-text-field
                required
                prepend-inner-icon="mdi-magnify"
                solo name="keyword"
                :value="$router.currentRoute.query.keyword"
                rounded
                outlined
                dense clearable
                placeholder="Search the Fediverse"
            ></v-text-field>
          </form>
        </v-flex>
        <v-flex sm2 xs12 v-if="!isMobile()">
          <v-switch v-model="$vuetify.theme.dark"
                    @change="setTheme"
                    class="float-right"
                    label="Dark Mode"
                    persistent-hint>
          </v-switch>
        </v-flex>
      </v-layout>
    </v-app-bar>
    <v-layout wrap>
      <v-container>
        <span>About {{ dataJson.requestdata.total_results.toLocaleString() }} results</span>
        <v-list three-line v-if="dataJson.activities.length">
          <v-list-item-group>
            <v-skeleton-loader
                v-if="isLoading"
                v-bind="attrs"
                row="6"
                light
                type="list-item-avatar-three-line"
            ></v-skeleton-loader>
            <template v-for="(item, index) in dataJson.activities" v-if="!isLoading">
              <v-list-item :key="item.title">
                <template>
                  <v-list-item-avatar>
                    <v-img :src="item.actor.icon.url">
                      <template v-slot:placeholder>
                        <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                        >
                          <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.actor.name }}
                      <span>
                        <a :href="item.actor.id"> {{ item.actor.preferredUsername }}</a>
                      </span>
                    </v-list-item-title>
                    <v-list-item-subtitle
                        v-text="item.content"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text>{{ item.published  | timeAgo }}</v-list-item-action-text>
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-divider v-if="index < dataJson.length - 1" :key="index"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
        <div>
          <h3>No record found.</h3>
        </div>
        <v-btn class="primary" text v-if="dataJson.requestdata.lastid">
          Load More
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-container>
    </v-layout>
  </div>
  <!-- <div>{{ $router.currentRoute.query }}</div> -->
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
export default Vue.extend({
  name: 'search',

  data: () => ({
    selected: [2],
    attrs: {
      class: 'mb-6',
      boilerplate: true,
      elevation: 2,
    },
    isLoading: true,
    dataJson: {
      requestdata: {
        lastid: 0,
        total_results: 0,
      },
      activities: [
       
      ],
    },
  }),
  computed:{
    search_keyword(){
      return this.$router.currentRoute.query.keyword;
    }
  },
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
  created() {
    this.isLoading = true;
    axios.get(`http://cherokeestreet.mynetgear.com:6432/search?s=${this.search_keyword}`).then(response=>{
      this.isLoading = false;
      console.log(response.data)
    }).catch(error=>{
      this.isLoading = false;
    })
    // setInterval(() => {
    //   this.isLoading = false;
    // }, 50000);
  }
});
</script>

<style scoped>
.loadMore-btn {
  bottom: 90px;
}

/*@media only screen and (min-width: 1150px) {*/
/*  .side-logo {*/
/*    text-align: -webkit-left !important;*/
/*  }*/

/*}*/

/*.side-logo {*/
/*  text-align: -webkit-center;*/
/*}*/

/*@media only screen and (min-width: 1150px) {*/
/*  .custom-appbar {*/
/*    min-height: 48px !important;*/
/*  }*/
/*}*/

/*.custom-appbar {*/
/*  min-height: 80px;*/
/*}*/
</style>
