<template>
  <div>
    <v-app-bar app dense fixed prominent elevation="2">
      <v-layout :row="isMobile()" class="ma-auto pt-2">
        <v-flex xs12 v-if="isMobile()" class="pt-2 mb-4">
          <v-layout row>
            <v-flex xs4>
              <router-link to="/">
                <v-img
                  alt="Vuetify Name"
                  contain
                  height="35"
                  src="../../assets/logo_header.svg"
                  width="100"
                />
              </router-link>
            </v-flex>
            <v-flex xs4>
              <div class="font-weight-bold text-h6">DuckDuckGO</div>
            </v-flex>
            <v-flex xs4 class="text-right">
              <v-menu :close-on-content-click="true">
                <template v-slot:activator="{ on: menu }">
                  <v-btn
                    class="grey--text mr-2"
                    icon
                    slot="activator"
                    text
                    v-on="{ ...menu, ...tooltip }"
                    x-small
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list class="py-1">
                  <v-list-item @click="setTheme(!$vuetify.theme.dark)">
                    <v-list-item-avatar class="mr-1">
                      <v-icon v-if="$vuetify.theme.dark"
                        >mdi-invert-colors</v-icon
                      >
                      <v-icon v-else>mdi-invert-colors-off</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Dark Mode</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex sm2 xs12 v-else class="float-right">
          <v-layout>
            <v-flex sm6></v-flex>
            <v-flex sm6>
              <router-link to="/">
                <v-img
                  alt="Vuetify Name"
                  contain
                  height="50"
                  src="../../assets/logo_header.svg"
                />
              </router-link>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          :class="isMobile() ? 'sm12 xs12' : 'sm8 xs12'"
          class="text-field--display"
        >
          <v-layout>
            <v-flex sm11>
              <form action="/search">
                <v-text-field
                  required
                  class="search-keyword-field"
                  prepend-inner-icon="mdi-magnify"
                  name="keyword"
                  solo
                  single-line
                  hide-details
                  outlined
                  :value="$router.currentRoute.query.keyword"
                  clearable
                  placeholder="Search the Fediverse"
                >
                  <template v-slot:append-outer>
                    <v-btn text type="submit">
                      <v-icon large color="white">mdi-magnify</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </form>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex sm2 xs12 v-if="!isMobile()" class="pa-2">
          <v-switch
            v-model="$vuetify.theme.dark"
            dense
            inset
            @change="setTheme"
            class="float-right"
            label="Dark Mode"
            persistent-hint
          >
          </v-switch>
        </v-flex>
      </v-layout>
    </v-app-bar>
    <v-flex sm12 xs12>
      <v-layout wrap>
        <v-flex sm3 xs12 class="pa-1" v-if="!isMobile()">
          <v-card rounded class="mx-3 my-5">
            <v-card-title class="px-2 py-0 font-weight-bold text-h6"
              >Trends For you</v-card-title
            >
            <v-card-text class="pa-0">
              <v-list>
                <template v-for="(item, index) in 10">
                  <v-divider :key="index"></v-divider>
                  <v-list-item>
                    <v-list-item-content>
                      <div class="grey--text caption">Politics Trending</div>
                      <v-list-item-title class="font-weight-bold"
                        >#SenateElection2021</v-list-item-title
                      >
                      <v-list-item-subtitle class="caption"
                        >44.9K Tweets</v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-menu :close-on-content-click="true">
                        <template v-slot:activator="{ on: menu }">
                          <v-btn
                            class="grey--text mr-2"
                            icon
                            slot="activator"
                            text
                            v-on="menu"
                            x-small
                          >
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>
                      </v-menu>
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex sm6 xs12>
          <v-container>
            <span v-if="items.requestdata" class="font-weight-bold"
              >About
              {{
                items.requestdata&&items.requestdata.total_results?items.requestdata.total_results.toLocaleString():''
              }}
              results</span
            >
            <div v-if="items.activities">
              <v-list
                class="my-2 search-list"
                three-line
                v-if="items.activities.length"
              >
                <!--            <v-skeleton-loader-->
                <!--                v-if="isLoading"-->
                <!--                v-bind="attrs"-->
                <!--                row="6"-->
                <!--                light-->
                <!--                type="list-item-avatar-three-line"-->
                <!--            ></v-skeleton-loader>-->
                <!--            v-if="!isLoading"-->
                <template v-for="(item, index) in items.activities">
                  <v-list-item :key="item.title">
                    <template>
                      <v-list-item-avatar>
                        <v-img
                          v-if="
                            item.actor && item.actor.icon && item.actor.icon.url
                          "
                          :src="item.actor.icon.url"
                          contain
                          transition="slide-y-transition"
                          lazy-src="@/assets/logo.png"
                        >
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
                        <img v-else src="@/assets/noimage.png" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          >{{ item.actor.name }}
                          <span>
                            <a :href="item.actor.id">
                              {{ item.actor.preferredUsername }}</a
                            >
                          </span>
                        </v-list-item-title>
                        <v-list-item-subtitle
                          v-html="item.content"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text>{{
                          item.published | timeAgo
                        }}</v-list-item-action-text>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                  <v-divider
                    v-if="index < items.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list>
            </div>
            <div v-else>
              <h3>No results across the known fediverse.</h3>
            </div>
            <div v-if="toggleMessage">
              <h3>No additional search results.</h3>
            </div>
            <v-btn
              :loading="isLoading"
              class="primary"
              @click="
                getSearchResult({
                  lastId: items.requestdata.lastid,
                  isLoadMore: true,
                })
              "
              text
              v-if="items.requestdata.lastid"
            >
              More posts
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-container>
        </v-flex>
        <v-flex sm3 xs12 class="pa-1" v-if="!isMobile()">
          <v-card rounded class="mx-3 my-5">
            <v-card-title class="px-2 py-0 font-weight-bold text-h6"
              >Trends For you</v-card-title
            >
            <v-card-text class="pa-0">
              <v-list>
                <template v-for="(item, index) in 10">
                  <v-divider :key="index"></v-divider>
                  <v-list-item>
                    <v-list-item-content>
                      <div class="grey--text caption">Politics Trending</div>
                      <v-list-item-title class="font-weight-bold"
                        >#SenateElection2021</v-list-item-title
                      >
                      <v-list-item-subtitle class="caption"
                        >44.9K Tweets</v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-menu :close-on-content-click="true">
                        <template v-slot:activator="{ on: menu }">
                          <v-btn
                            class="grey--text mr-2"
                            icon
                            slot="activator"
                            text
                            v-on="menu"
                            x-small
                          >
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>
                      </v-menu>
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </div>
  <!-- <div>{{ $router.currentRoute.query }}</div> -->
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: 'search',
  data: () => ({
    selected: [2],
    attrs: {
      class: "mb-6",
      boilerplate: true,
      elevation: 2,
    },
    isLoadMore: false,
    isLoading: true,
    data: { requestdata: [], activities: [] },
    toggleMessage: false,
  }),
  computed: {
    items() {
      return this.data;
    },
    search_keyword() {
      return this.$router.currentRoute.query.keyword;
    },
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    setTheme(check: boolean): any {
      if (check) {
        localStorage.setItem("theme", "dark");
        this.$vuetify.theme.dark = true;
      } else {
        localStorage.removeItem("theme");
        this.$vuetify.theme.dark = false;
      }
      this.$forceUpdate();
    },
    getSearchResult(event: any): void {
      this.isLoading = true;
      let lastIdQuery = "";
      this.isLoadMore = event.isLoadMore;
      if (event.lastId) {
        lastIdQuery = `&o=${event.lastId}`;
      }

      this.$http({
        method: "get",
        url: `search?s=${this.search_keyword}${
          event.lastId ? lastIdQuery : ""
        }`,
        headers: {},
      })
        .then((response: any) => {
          this.isLoading = false;
          if (this.isLoadMore) {
            this.data.requestdata = response.data.requestdata;
            if (response.data.activities && response.data.activities.length) {
              response.data.activities.forEach((item: any) => {
                this.data.activities.push(item);
              });
            } else {
              this.toggleMessage = true;
            }
          } else {
            this.data = response.data;
          }
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getSearchResult({ isLoadMore: false });
    // setInterval(() => {
    //   this.isLoading = false;
    // }, 50000);
  },
});
</script>
