<template>
  <div>
    <v-app-bar app flat fixed dense :prominent="isMobile()">
      <v-layout :row="isMobile()" class="ma-auto pt-2">
        <v-flex xs12 v-if="isMobile()" class="pa-2">
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
        <v-flex sm3 xs12 v-else>
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
        <v-flex :class="isMobile() ? 'sm12 xs12': 'sm7 xs12'" class="text-field--display">
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
    <v-layout class="mx-auto">
      <v-container>
        <span>About {{ dataJson.requestdata.total_results.toLocaleString() }} results</span>
        <v-list three-line>
          <v-list-item-group>
            <template v-for="(item, index) in dataJson.activities">
              <v-list-item :key="item.title">
                <template>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.source"></v-list-item-title>
                    <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.headline"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                        v-text="item.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <!-- <v-list-item-action-text
                      v-text="item.action"
                    ></v-list-item-action-text> -->
                    <!-- <v-icon v-if="!active" color="grey lighten-1">
                      mdi-star-outline
                    </v-icon>
                    <v-icon v-else color="yellow darken-3"> mdi-star </v-icon> -->
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
        <div class="text-center">
          <v-btn class="primary">
            Load More
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-layout>

  </div>
  <!-- <div>{{ $router.currentRoute.query }}</div> -->
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'search',

  data: () => ({
    selected: [2],
    items: [
      {
        action: '15 min',
        headline: 'Brunch this weekend?',
        subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        title: 'Ali Connors',
      },
      {
        action: '2 hr',
        headline: 'Summer BBQ',
        subtitle: `Wish I could come, but I'm out of town this weekend.`,
        title: 'me, Scrott, Jennifer',
      },
      {
        action: '6 hr',
        headline: 'Oui oui',
        subtitle: 'Do you have Paris recommendations? Have you ever been?',
        title: 'Sandra Adams',
      },
      {
        action: '12 hr',
        headline: 'Birthday gift',
        subtitle:
            'Have any ideas about what we should get Heidi for her birthday?',
        title: 'Trevor Hansen',
      },
      {
        action: '18hr',
        headline: 'Recipe to try',
        subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        title: 'Britta Holt',
      },
    ],
    dataJson: {
      requestdata: {
        lastid: 123,
        total_results: 893475,
      },
      activities: [
        {
          cc: ['https://islamicate.space/users/fikran/followers'],
          id: 'https://islamicate.space/objects/f73c4420-04e1-4eca-9872-b034dc8bd886',
          to: ['https://www.w3.org/ns/activitystreams#Public'],
          tag: [],
          type: 'Note',
          actor: 'https://islamicate.space/users/fikran',
          source: 'Sleepy...',
          content: 'Sleepy...',
          context: 'https://islamicate.space/contexts/9cebd7a4-0093-449d-ae6f-80981055be63',
          summary: '',
          '@context': [
            'https://www.w3.org/ns/activitystreams',
            'https://islamicate.space/schemas/litepub-0.1.jsonld',
            {
              '@language': 'und',
            },
          ],
          published: '2021-02-11T06:24:08.347338Z',
          sensitive: false,
          attachment: [],
          attributedTo: 'https://islamicate.space/users/fikran',
          conversation:
              'https://islamicate.space/contexts/9cebd7a4-0093-449d-ae6f-80981055be63',
        },
        {
          cc: ['https://islamicate.space/users/fikran/followers'],
          id:
              'https://islamicate.space/objects/03ac1f66-fbda-4f56-ac75-9373570a9c81',
          to: [
            'https://gleasonator.com/users/alex',
            'https://www.w3.org/ns/activitystreams#Public',
          ],
          tag: [
            {
              href: 'https://gleasonator.com/users/alex',
              name: '@alex@gleasonator.com',
              type: 'Mention',
            },
          ],
          type: 'Note',
          actor: 'https://islamicate.space/users/fikran',
          source: '@alex@gleasonator.com good read!!',
          content:
              '<span class="h-card"><a class="u-url mention" data-user="9ySZCO1V7W0KkhgL0C" href="https://gleasonator.com/users/alex" rel="ugc">@<span>alex</span></a></span> good read!!',
          context:
              'https://gleasonator.com/contexts/ae2a7fc0-a181-4754-b152-bf8e78c66c9b',
          summary: '',
          '@context': [
            'https://www.w3.org/ns/activitystreams',
            'https://islamicate.space/schemas/litepub-0.1.jsonld',
            {
              '@language': 'und',
            },
          ],
          inReplyTo:
              'https://gleasonator.com/objects/1de57646-dab5-46c8-bbd0-2fe026d627ea',
          published: '2021-02-11T06:40:36.748096Z',
          sensitive: false,
          attachment: [],
          attributedTo: 'https://islamicate.space/users/fikran',
          conversation:
              'https://gleasonator.com/contexts/ae2a7fc0-a181-4754-b152-bf8e78c66c9b',
        },
        {
          cc: ['https://islamicate.space/users/fikran/followers'],
          id:
              'https://islamicate.space/objects/0993938f-e7c9-472f-975e-06574848888a',
          to: [
            'https://bitcoinhackers.org/users/cointastical',
            'https://www.w3.org/ns/activitystreams#Public',
          ],
          tag: [
            {
              href: 'https://bitcoinhackers.org/users/cointastical',
              name: '@cointastical@bitcoinhackers.org',
              type: 'Mention',
            },
          ],
          type: 'Note',
          actor: 'https://islamicate.space/users/fikran',
          source:
              '@cointastical@bitcoinhackers.org I am actively working on this. I NEED a front-end web developer!!',
          content:
              '<span class="h-card"><a class="u-url mention" data-user="A49joK7BvPtigdSLei" href="https://bitcoinhackers.org/@cointastical" rel="ugc">@<span>cointastical</span></a></span> I am actively working on this. I NEED a front-end web developer!!',
          context:
              'tag:bitcoinhackers.org,2021-02-10:objectId=8689098:objectType=Conversation',
          summary: '',
          '@context': [
            'https://www.w3.org/ns/activitystreams',
            'https://islamicate.space/schemas/litepub-0.1.jsonld',
            {
              '@language': 'und',
            },
          ],
          inReplyTo:
              'https://bitcoinhackers.org/users/cointastical/statuses/105707582142268758',
          published: '2021-02-11T06:50:52.432882Z',
          sensitive: false,
          attachment: [],
          attributedTo: 'https://islamicate.space/users/fikran',
          conversation:
              'tag:bitcoinhackers.org,2021-02-10:objectId=8689098:objectType=Conversation',
        },
      ],
    },
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

<style scoped>
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
