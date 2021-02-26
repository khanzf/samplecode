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
        <v-list three-line>
          <v-list-item-group>
            <v-skeleton-loader
                v-if="isLoading"
                v-bind="attrs"
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
                    <v-list-item-title v-text="item.actor.name"></v-list-item-title>
                    <v-list-item-subtitle
                        class="text--primary"
                        v-text="item.actor.preferredUsername"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle
                        v-text="item.content"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-action-text v-text="'15 min'"></v-list-item-action-text>
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
        <v-btn class="primary" text>
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
        total_results: 3,
      },
      activities: [
        {
          '@context': [
            'https://www.w3.org/ns/activitystreams',
            'https://social.farhan.codes/schemas/litepub-0.1.jsonld',
            {
              '@language': 'und'
            }
          ],
          actor: {
            id: 'https://social.farhan.codes/users/testacct555',
            tag: [],
            url: 'https://social.farhan.codes/users/testacct555',
            icon: {
              'url': 'https://social.farhan.codes/media/dafd1ad4381133a946d9ad3c5ca1acb21a1986f49bb4ef25650b87457bc8eed0.jpg',
              'type': 'Image'
            },
            name: 'testacct555',
            type: 'Person',
            image: {
              url: 'https://social.farhan.codes/media/fa21afc8dd8a9c9607466d62bce6c90eb2110b34b04a4c0d81d1f2c28263272b.jpeg',
              type: 'Image'
            },
            inbox: 'https://social.farhan.codes/users/testacct555/inbox',
            outbox: 'https://social.farhan.codes/users/testacct555/outbox',
            summary: 'profile',
            '@context': [
              'https://www.w3.org/ns/activitystreams',
              'https://social.farhan.codes/schemas/litepub-0.1.jsonld',
              {
                '@language': 'und'
              }
            ],
            endpoints: {
              'sharedInbox': 'https://social.farhan.codes/inbox',
              'uploadMedia': 'https://social.farhan.codes/api/ap/upload_media',
              'oauthTokenEndpoint': 'https://social.farhan.codes/oauth/token',
              'oauthRegistrationEndpoint': 'https://social.farhan.codes/api/v1/apps',
              'oauthAuthorizationEndpoint': 'https://social.farhan.codes/oauth/authorize'
            },
            followers: 'https://social.farhan.codes/users/testacct555/followers',
            following: 'https://social.farhan.codes/users/testacct555/following',
            publicKey: {
              'id': 'https://social.farhan.codes/users/testacct555#main-key',
              'owner': 'https://social.farhan.codes/users/testacct555',
              'publicKeyPem': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyBPbYwLkmD0TilWtf6iM\nOCOoXTl/nPGCh+BKCLdSj6swSyT8AN0DiQlruTE7zi3MHsinIKeS3hBMd22l2XUW\nENK0q++4MxLjG4ROgFbLnIYFc4/862OuGv8zkdNVHgk5ij6fc1whwbecU9NsSfDh\nBkClK0aB8h5nAxtJNjdB6s54tuKlhZrMsar6Szl9e6wjngDGKPuPAp9R3lpjmi0C\nOfgOpKBKukF3ilzHatRr/XDlG9iEtGbeJrlGfbZL74l5YHttFLbT1L4RliK42lqV\nG0dAary7KyyVNW7yeNC4B8wi0eh/OThhCtJMEmLy5KroDg/VAFOXojNA4jOV/cG6\nAQIDAQAB\n-----END PUBLIC KEY-----\n\n'
            },
            attachment: [],
            capabilities: {
              acceptsChatMessages: true
            },
            discoverable: false,
            preferredUsername: 'testacct555',
            manuallyApprovesFollowers: false
          },
          attachment: [],
          attributedTo: 'https://social.farhan.codes/users/testacct555',
          cc: [
            'https://social.farhan.codes/users/testacct555/followers'
          ],
          content: 'linux 3',
          context: 'https://social.farhan.codes/contexts/c5640ed9-91b2-44da-9ac5-d6796f8edf99',
          conversation: 'https://social.farhan.codes/contexts/c5640ed9-91b2-44da-9ac5-d6796f8edf99',
          id: 'https://social.farhan.codes/objects/18c40d1f-05de-40ae-a8c9-6825918252a9',
          published: '2021-02-26T01:45:51.461758Z',
          sensitive: false,
          source: 'linux 3',
          summary: '',
          tag: [],
          to: [
            'https://www.w3.org/ns/activitystreams#Public'
          ],
          type: 'Note'
        },
        {
          '@context': [
            'https://www.w3.org/ns/activitystreams',
            'https://social.farhan.codes/schemas/litepub-0.1.jsonld',
            {
              '@language': 'und'
            }
          ],
          actor: {
            id: 'https://social.farhan.codes/users/testacct555',
            tag: [],
            url: 'https://social.farhan.codes/users/testacct555',
            icon: {
              url: 'https://social.farhan.codes/media/dafd1ad4381133a946d9ad3c5ca1acb21a1986f49bb4ef25650b87457bc8eed0.jpg',
              type: 'Image'
            },
            name: 'testacct555',
            type: 'Person',
            image: {
              url: 'https://social.farhan.codes/media/fa21afc8dd8a9c9607466d62bce6c90eb2110b34b04a4c0d81d1f2c28263272b.jpeg',
              type: 'Image'
            },
            inbox: 'https://social.farhan.codes/users/testacct555/inbox',
            outbox: 'https://social.farhan.codes/users/testacct555/outbox',
            summary: 'profile',
            '@context': [
              'https://www.w3.org/ns/activitystreams',
              'https://social.farhan.codes/schemas/litepub-0.1.jsonld',
              {
                '@language': 'und'
              }
            ],
            endpoints: {
              sharedInbox: 'https://social.farhan.codes/inbox',
              uploadMedia: 'https://social.farhan.codes/api/ap/upload_media',
              oauthTokenEndpoint: 'https://social.farhan.codes/oauth/token',
              oauthRegistrationEndpoint: 'https://social.farhan.codes/api/v1/apps',
              oauthAuthorizationEndpoint: 'https://social.farhan.codes/oauth/authorize'
            },
            followers: 'https://social.farhan.codes/users/testacct555/followers',
            following: 'https://social.farhan.codes/users/testacct555/following',
            publicKey: {
              id: 'https://social.farhan.codes/users/testacct555#main-key',
              owner: 'https://social.farhan.codes/users/testacct555',
              publicKeyPem: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyBPbYwLkmD0TilWtf6iM\nOCOoXTl/nPGCh+BKCLdSj6swSyT8AN0DiQlruTE7zi3MHsinIKeS3hBMd22l2XUW\nENK0q++4MxLjG4ROgFbLnIYFc4/862OuGv8zkdNVHgk5ij6fc1whwbecU9NsSfDh\nBkClK0aB8h5nAxtJNjdB6s54tuKlhZrMsar6Szl9e6wjngDGKPuPAp9R3lpjmi0C\nOfgOpKBKukF3ilzHatRr/XDlG9iEtGbeJrlGfbZL74l5YHttFLbT1L4RliK42lqV\nG0dAary7KyyVNW7yeNC4B8wi0eh/OThhCtJMEmLy5KroDg/VAFOXojNA4jOV/cG6\nAQIDAQAB\n-----END PUBLIC KEY-----\n\n'
            },
            attachment: [],
            capabilities: {
              acceptsChatMessages: true
            },
            discoverable: false,
            preferredUsername: 'testacct555',
            manuallyApprovesFollowers: false
          },
          attachment: [],
          attributedTo: 'https://social.farhan.codes/users/testacct555',
          cc: [
            'https://social.farhan.codes/users/testacct555/followers'
          ],
          content: 'linux 1',
          context: 'https://social.farhan.codes/contexts/bc62c7c8-915f-413f-b9e3-7cd3659fb8a2',
          conversation: 'https://social.farhan.codes/contexts/bc62c7c8-915f-413f-b9e3-7cd3659fb8a2',
          id: 'https://social.farhan.codes/objects/2aa2046b-8112-4e1f-97e1-f04d98a1af50',
          published: '2021-02-26T01:45:46.293745Z',
          sensitive: false,
          source: 'linux 1',
          summary: '',
          tag: [],
          to: [
            'https://www.w3.org/ns/activitystreams#Public'
          ],
          type: 'Note'
        },
        {
          '@context': [
            'https://www.w3.org/ns/activitystreams',
            'https://social.farhan.codes/schemas/litepub-0.1.jsonld',
            {
              '@language': 'und'
            }
          ],
          actor: {
            id: 'https://social.farhan.codes/users/testacct555',
            tag: [],
            url: 'https://social.farhan.codes/users/testacct555',
            icon: {
              url: 'https://social.farhan.codes/media/dafd1ad4381133a946d9ad3c5ca1acb21a1986f49bb4ef25650b87457bc8eed0.jpg',
              type: 'Image'
            },
            name: 'testacct555',
            type: 'Person',
            image: {
              url: 'https://social.farhan.codes/media/fa21afc8dd8a9c9607466d62bce6c90eb2110b34b04a4c0d81d1f2c28263272b.jpeg',
              type: 'Image'
            },
            inbox: 'https://social.farhan.codes/users/testacct555/inbox',
            outbox: 'https://social.farhan.codes/users/testacct555/outbox',
            summary: 'profile',
            '@context': [
              'https://www.w3.org/ns/activitystreams',
              'https://social.farhan.codes/schemas/litepub-0.1.jsonld',
              {
                '@language': 'und'
              }
            ],
            endpoints: {
              sharedInbox: 'https://social.farhan.codes/inbox',
              uploadMedia: 'https://social.farhan.codes/api/ap/upload_media',
              oauthTokenEndpoint: 'https://social.farhan.codes/oauth/token',
              oauthRegistrationEndpoint: 'https://social.farhan.codes/api/v1/apps',
              oauthAuthorizationEndpoint: 'https://social.farhan.codes/oauth/authorize'
            },
            followers: 'https://social.farhan.codes/users/testacct555/followers',
            following: 'https://social.farhan.codes/users/testacct555/following',
            publicKey: {
              id: 'https://social.farhan.codes/users/testacct555#main-key',
              owner: 'https://social.farhan.codes/users/testacct555',
              publicKeyPem: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyBPbYwLkmD0TilWtf6iM\nOCOoXTl/nPGCh+BKCLdSj6swSyT8AN0DiQlruTE7zi3MHsinIKeS3hBMd22l2XUW\nENK0q++4MxLjG4ROgFbLnIYFc4/862OuGv8zkdNVHgk5ij6fc1whwbecU9NsSfDh\nBkClK0aB8h5nAxtJNjdB6s54tuKlhZrMsar6Szl9e6wjngDGKPuPAp9R3lpjmi0C\nOfgOpKBKukF3ilzHatRr/XDlG9iEtGbeJrlGfbZL74l5YHttFLbT1L4RliK42lqV\nG0dAary7KyyVNW7yeNC4B8wi0eh/OThhCtJMEmLy5KroDg/VAFOXojNA4jOV/cG6\nAQIDAQAB\n-----END PUBLIC KEY-----\n\n'
            },
            attachment: [],
            capabilities: {
              acceptsChatMessages: true
            },
            discoverable: false,
            preferredUsername: 'testacct555',
            manuallyApprovesFollowers: false
          },
          attachment: [],
          attributedTo: 'https://social.farhan.codes/users/testacct555',
          cc: [
            'https://social.farhan.codes/users/testacct555/followers'
          ],
          content: 'linux 2',
          context: 'https://social.farhan.codes/contexts/f01a77c7-064f-44d1-9a19-2de91031c8e5',
          conversation: 'https://social.farhan.codes/contexts/f01a77c7-064f-44d1-9a19-2de91031c8e5',
          id: 'https://social.farhan.codes/objects/4461fbb5-03f2-4773-aac4-9d8880cce369',
          published: '2021-02-26T01:45:48.940606Z',
          sensitive: false,
          source: 'linux 2',
          summary: '',
          tag: [],
          to: [
            'https://www.w3.org/ns/activitystreams#Public'
          ],
          type: 'Note'
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
  created() {
    setInterval(() => {
      this.isLoading = false;
    }, 1000);
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
