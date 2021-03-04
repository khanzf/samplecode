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
                <template v-slot:activator="{on:menu}">

                  <v-btn class="grey--text mr-2" icon
                         slot="activator" text v-on="{...menu,...tooltip}"
                         x-small>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list class="py-1">
                  <v-list-item @click="setTheme(!$vuetify.theme.dark)">
                    <v-list-item-avatar class="mr-1">
                      <v-icon v-if="$vuetify.theme.dark">mdi-invert-colors</v-icon>
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
        <v-flex :class="isMobile() ? 'sm12 xs12': 'sm8 xs12'" class="text-field--display">
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
                    <v-btn icon large text type="submit">
                      <v-icon large color="white">mdi-magnify</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </form>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex sm2 xs12 v-if="!isMobile()" class="pa-2">
          <v-switch v-model="$vuetify.theme.dark" dense inset
                    @change="setTheme"
                    class="float-right"
                    label="Dark Mode"
                    persistent-hint>
          </v-switch>
        </v-flex>
      </v-layout>
    </v-app-bar>
    <v-flex sm12 xs12>
      <v-layout wrap>
        <v-flex sm3 xs12 class="pa-1" v-if="!isMobile()">
          <v-card rounded class="mx-3 my-5">
            <v-card-title class="px-2 py-0 font-weight-bold text-h6">Trends For you</v-card-title>
            <v-card-text class="pa-0">
              <v-list>
                <template v-for="(item,index) in 10">
                  <v-divider :key="index"></v-divider>
                  <v-list-item>
                    <v-list-item-content>
                      <div class="grey--text caption">Politics Trending</div>
                      <v-list-item-title class="font-weight-bold">#SenateElection2021</v-list-item-title>
                      <v-list-item-subtitle class="caption">44.9K Tweets</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-menu :close-on-content-click="true">
                        <template v-slot:activator="{on:menu}">
                          <v-btn class="grey--text mr-2" icon
                                 slot="activator" text v-on="menu"
                                 x-small>
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
            <span v-if="items.activities" class="font-weight-bold">About
              {{ items.requestdata.total_results.toLocaleString() }} results</span>
            <div v-if="items.activities">
              <v-list class="my-2" three-line v-if="items.activities.length">
                <v-list-item-group>
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
                          <v-img v-if="item.actor && item.actor.icon && item.actor.icon.url" :src="item.actor.icon.url"
                                 contain
                                 transition="slide-y-transition"
                                 lazy-src="@/assets/logo.png">
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
                          <img v-else src="@/assets/noimage.png"/>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>{{ item.actor.name }}
                            <span>
                        <a :href="item.actor.id"> {{ item.actor.preferredUsername }}</a>
                      </span>
                          </v-list-item-title>
                          <v-list-item-subtitle
                              v-html="item.content"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-list-item-action-text>{{ item.published  | timeAgo }}</v-list-item-action-text>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                    <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </div>
            <div v-else>
              <h3>No results across the known fediverse.</h3>
            </div>
            <div v-if="toggleMessage">
              <h3>No additional search results.</h3>
            </div>
            <v-btn :loading="isLoading" class="primary"
                   @click="getSearchResult({lastId: items.requestdata.lastid, isLoadMore: true})" text
                   v-if="items.requestdata.lastid">
              More posts
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-container>
        </v-flex>
        <v-flex sm3 xs12 class="pa-1" v-if="!isMobile()">
          <v-card rounded class="mx-3 my-5">
            <v-card-title class="px-2 py-0 font-weight-bold text-h6">Trends For you</v-card-title>
            <v-card-text class="pa-0">
              <v-list>
                <template v-for="(item,index) in 10">
                  <v-divider :key="index"></v-divider>
                  <v-list-item>
                    <v-list-item-content>
                      <div class="grey--text caption">Politics Trending</div>
                      <v-list-item-title class="font-weight-bold">#SenateElection2021</v-list-item-title>
                      <v-list-item-subtitle class="caption">44.9K Tweets</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-menu :close-on-content-click="true">
                        <template v-slot:activator="{on:menu}">
                          <v-btn class="grey--text mr-2" icon
                                 slot="activator" text v-on="menu"
                                 x-small>
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
    isLoadMore: false,
    isLoading: true,
    data:
        {
          'requestdata': {
            'lastid': 10,
            'total_results': 19000,
          },
          'activities': [
            {
              '@context': ['https://www.w3.org/ns/activitystreams', 'https://fedi.absturztau.be/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
              'actor': {
                'id': 'https://fedi.absturztau.be/users/Stellar',
                'tag': [{
                  'id': 'https://fedi.absturztau.be/emoji/custom/verifiedsabakan.png',
                  'icon': {'url': 'https://fedi.absturztau.be/emoji/custom/verifiedsabakan.png', 'type': 'Image'},
                  'name': ':verifiedsabakan:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }],
                'url': 'https://fedi.absturztau.be/users/Stellar',
                'icon': {
                  'url': 'https://fedi.absturztau.be/media/65f5e335976437d36805f84ac390335656a124aefb1fb539bfa1780663ab2faa.gif',
                  'type': 'Image'
                },
                'name': 'Ｓｔｅｌｌａｒ :verifiedsabakan:​',
                'type': 'Person',
                'image': {
                  'url': 'https://fedi.absturztau.be/media/76f099d4165673f9ec7eadc2923ada8b4e776795ddb51f280e7ea55de26159c0.gif',
                  'type': 'Image'
                },
                'inbox': 'https://fedi.absturztau.be/users/Stellar/inbox',
                'outbox': 'https://fedi.absturztau.be/users/Stellar/outbox',
                'summary': 'I love music, I love abstract art, i love old computers and cars, i love vaporwave and i make art.',
                '@context': ['https://www.w3.org/ns/activitystreams', 'https://fedi.absturztau.be/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
                'endpoints': {
                  'sharedInbox': 'https://fedi.absturztau.be/inbox',
                  'uploadMedia': 'https://fedi.absturztau.be/api/ap/upload_media',
                  'oauthTokenEndpoint': 'https://fedi.absturztau.be/oauth/token',
                  'oauthRegistrationEndpoint': 'https://fedi.absturztau.be/api/v1/apps',
                  'oauthAuthorizationEndpoint': 'https://fedi.absturztau.be/oauth/authorize'
                },
                'followers': 'https://fedi.absturztau.be/users/Stellar/followers',
                'following': 'https://fedi.absturztau.be/users/Stellar/following',
                'publicKey': {
                  'id': 'https://fedi.absturztau.be/users/Stellar#main-key',
                  'owner': 'https://fedi.absturztau.be/users/Stellar',
                  'publicKeyPem': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv0mHjGTFyMf+qn7u/jC4\nPSoW+D5Vi0G5pF8EGueO6gepJsHGlYKYBwII/kA4nQjwsGtMkOldHmhihmcttKUj\numu6TKy2rcvlce5xufSoG4SZ8B7wO3oxKRpX5Kx5lFoUBxWruU/YrtMJUAnOqxGA\nx5fAMCc45u5M7h/4e4y7J9it8YKhiioHzF7NugGrDXQwQWFNfetJWHtmgN61DjkP\nWViSUnAapm/lUSWajQdHax2JkfHB4VhTg4u1ApGvGpO01vuIqcQ0k7n6+fnb8/T9\nDEH26gdBTK+jowPbY0MrvnSFnEdfs23BJwxctejt2cSyNSIGvnbY1pUm0emn3Lb4\nUQIDAQAB\n-----END PUBLIC KEY-----\n\n'
                },
                'attachment': [{'name': 'English', 'type': 'PropertyValue', 'value': 'French'}, {
                  'name': 'Very',
                  'type': 'PropertyValue',
                  'value': 'Lewd'
                }, {'name': 'DONT', 'type': 'PropertyValue', 'value': 'DEAD'}, {
                  'name': 'OPEN',
                  'type': 'PropertyValue',
                  'value': 'INSIDE'
                }],
                'alsoKnownAs': [],
                'capabilities': {'acceptsChatMessages': true},
                'discoverable': false,
                'preferredUsername': 'Stellar',
                'manuallyApprovesFollowers': false
              },
              'attachment': [{
                'url': 'https://fedi.absturztau.be/media/76f324a85eacad26174be20912482a6ae4f626606f7bf8892c63be4c1572b9ce.png?name=image.png',
                'name': '',
                'type': 'Document',
                'mediaType': 'image/png'
              }],
              'attributedTo': 'https://fedi.absturztau.be/users/Stellar',
              'cc': ['https://fedi.absturztau.be/users/Stellar/followers'],
              'content': 'found this on google images when i googled beard linux guy when trying to fing stallman\u0026#39;s name\u003cbr\u003e\u003ca href="https://fedi.absturztau.be/media/76f324a85eacad26174be20912482a6ae4f626606f7bf8892c63be4c1572b9ce.png?name=image.png" class=\'attachment\'\u003e\u003c/a\u003e',
              'context': 'https://fedi.absturztau.be/contexts/c02442ef-c98b-4004-9699-65d285e86c48',
              'conversation': 'https://fedi.absturztau.be/contexts/c02442ef-c98b-4004-9699-65d285e86c48',
              'id': 'https://fedi.absturztau.be/objects/01d50fdf-0095-4493-a869-7238e8ff4241',
              'published': '2021-03-02T07:46:10.213025Z',
              'sensitive': false,
              'source': 'found this on google images when i googled beard linux guy when trying to fing stallman\'s name',
              'summary': '',
              'tag': [],
              'to': ['https://www.w3.org/ns/activitystreams#Public'],
              'type': 'Note'
            },
            {
              '@context': ['https://www.w3.org/ns/activitystreams', 'https://spinster.xyz/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
              'actor': {
                'id': 'https://spinster.xyz/users/vegan_dyke',
                'tag': [],
                'url': 'https://spinster.xyz/users/vegan_dyke',
                'icon': {
                  'url': 'https://media.spinster.xyz/accounts/avatars/000/152/265/original/b59b245f2f67ba5d.jpg',
                  'type': 'Image'
                },
                'name': '¡Vegan Dyke!',
                'type': 'Person',
                'image': {
                  'url': 'https://media.spinster.xyz/503749d14114cfee22cf1e194aae9dc44404b9498b696997ee2e7c9509695acf.jpg',
                  'type': 'Image'
                },
                'inbox': 'https://spinster.xyz/users/vegan_dyke/inbox',
                'outbox': 'https://spinster.xyz/users/vegan_dyke/outbox',
                'summary': 'anti-civ anarchist, ethical vegan, linguaphile, bibliophile, sci-fi fan, Linux fan, gender non-conforming butchphile. not gc; more like radical feminist\u003cbr/\u003e\u003cbr/\u003eparle français\u003cbr/\u003ehablo español\u003cbr/\u003elerne deutsch',
                '@context': ['https://www.w3.org/ns/activitystreams', 'https://spinster.xyz/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
                'endpoints': {
                  'sharedInbox': 'https://spinster.xyz/inbox',
                  'uploadMedia': 'https://spinster.xyz/api/ap/upload_media',
                  'oauthTokenEndpoint': 'https://spinster.xyz/oauth/token',
                  'oauthRegistrationEndpoint': 'https://spinster.xyz/api/v1/apps',
                  'oauthAuthorizationEndpoint': 'https://spinster.xyz/oauth/authorize'
                },
                'followers': 'https://spinster.xyz/users/vegan_dyke/followers',
                'following': 'https://spinster.xyz/users/vegan_dyke/following',
                'publicKey': {
                  'id': 'https://spinster.xyz/users/vegan_dyke#main-key',
                  'owner': 'https://spinster.xyz/users/vegan_dyke',
                  'publicKeyPem': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzqm3L+mLSQnUuF0tKzpU\nkMVrL6tB90Tf8g4coyTXBUIX7cv4HLdhLfhoJsmQ4fG8jALdVuhHCRbKvqIybRbs\nrxW64bFFE6syacsQVkGm3HF3z+ShR12Lalxas7YTHop31oIJzgLCEe6RB246mVpZ\n5AvpypuePjIaRhD9jMrc/XeGCE78Ajc2QzdYAQNcGGlCLVBtC7zTEXZLBPGFvduZ\nhBqUHvV8IWXukqmWb0X5xINQywAJ8YR0yYeA4yPs5N2JAOm6xMZeOOFJqeOBVSTH\nzdqtccfEIvM2KfhNC/JyQQ07ChpKz7Ie+sY+HEyFgwj/m3t3fX0KTknoQcd7oaZy\nrwIDAQAB\n-----END PUBLIC KEY-----\n\n'
                },
                'attachment': [{'name': 'Pronouns', 'type': 'PropertyValue', 'value': 'it/you/theyself'}],
                'capabilities': {'acceptsChatMessages': true},
                'discoverable': false,
                'preferredUsername': 'vegan_dyke',
                'manuallyApprovesFollowers': false
              },
              'attachment': [],
              'attributedTo': 'https://spinster.xyz/users/vegan_dyke',
              'cc': ['https://spinster.xyz/users/vegan_dyke/followers'],
              'content': 'love these Arch linux pgp errors',
              'context': 'https://spinster.xyz/contexts/a4dead8a-3197-45f9-9f37-e6e6fbd5567b',
              'conversation': 'https://spinster.xyz/contexts/a4dead8a-3197-45f9-9f37-e6e6fbd5567b',
              'id': 'https://spinster.xyz/objects/df5a7c28-4bb6-4e06-9932-bfa0eded2069',
              'published': '2021-03-02T07:07:49.231949Z',
              'sensitive': false,
              'source': 'love these Arch linux pgp errors',
              'summary': '',
              'tag': [],
              'to': ['https://www.w3.org/ns/activitystreams#Public'],
              'type': 'Note'
            },
            {
              '@context': ['https://www.w3.org/ns/activitystreams', 'https://weeaboo.space/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
              'actor': {
                'id': 'https://weeaboo.space/users/quad',
                'tag': [],
                'url': 'https://weeaboo.space/users/quad',
                'icon': {
                  'url': 'https://weeaboo.space/media/44cae0659f1db97ebdabbfe7f1dcc8d3eded7a8a8e92cd7f8ed712ef33b24c61.png',
                  'type': 'Image'
                },
                'name': 'Quad 🌸',
                'type': 'Person',
                'image': {
                  'url': 'https://weeaboo.space/media/c68b4ebd-2343-4751-9bf3-897703b49167/a3de3fe07ab9bf229f0ab598add9deb511294bd74895a9992d8b759b70835c21.png',
                  'type': 'Image'
                },
                'inbox': 'https://weeaboo.space/users/quad/inbox',
                'outbox': 'https://weeaboo.space/users/quad/outbox',
                'summary': 'Norwegian guy addicted to boxes with blinky lights. I admin this place.',
                '@context': ['https://www.w3.org/ns/activitystreams', 'https://weeaboo.space/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
                'endpoints': {
                  'sharedInbox': 'https://weeaboo.space/inbox',
                  'uploadMedia': 'https://weeaboo.space/api/ap/upload_media',
                  'oauthTokenEndpoint': 'https://weeaboo.space/oauth/token',
                  'oauthRegistrationEndpoint': 'https://weeaboo.space/api/v1/apps',
                  'oauthAuthorizationEndpoint': 'https://weeaboo.space/oauth/authorize'
                },
                'followers': 'https://weeaboo.space/users/quad/followers',
                'following': 'https://weeaboo.space/users/quad/following',
                'publicKey': {
                  'id': 'https://weeaboo.space/users/quad#main-key',
                  'owner': 'https://weeaboo.space/users/quad',
                  'publicKeyPem': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0IwxnYQHF01mug43RTUN\nbPIeUNPyFXZrp6UZRB4MfeDwBKJSc9NIXS9vkGbqgYctKXoSV9aTle/C+wxuNxTG\nwDTaf92tRQpcvUzZ2xnWbrcajW01PUL8QCXRvL79kc+uGOd7CSlpPlhtI5uZFBQH\nFWXnxqQHU14EaTjJN9eYzaeyBCB40FtHx2VGsQlmwLycNbe51yLAQqHwx5J8hVdL\neH+PI1XzHeIm81saQ9dS7DTIEA72gUr7Ez29Sgph4Q64YXRPqUi9f66BVboKo2s9\nwRitvPodsgb9AzAu3ZgJCM6oeveM15Co6RsXrF0APy3Zo8B0mRaJpdWMCur4kQvb\n/wIDAQAB\n-----END PUBLIC KEY-----\n\n'
                },
                'attachment': [],
                'capabilities': {'acceptsChatMessages': true},
                'discoverable': false,
                'preferredUsername': 'quad',
                'manuallyApprovesFollowers': false
              },
              'attachment': [],
              'attributedTo': 'https://weeaboo.space/users/quad',
              'cc': ['https://weeaboo.space/users/quad/followers'],
              'content': '\u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="9uskxWa1TPSklBrk2a" href="https://biribiri.dev/users/normandy" rel="ugc"\u003e@\u003cspan\u003enormandy\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e They didn\u0026#39;t really feature it that prominently. I think Mozilla just didn\u0026#39;t give a shit since they only viewed it as the future backend of Firefox.\u003cbr\u003e\u003cbr\u003eIn November 2020 Servo was taken under the Linux Foundation as their own project, after which they probably realized that maybe they should replace the doge logo',
              'context': 'https://biribiri.dev/contexts/d903b0a1-4efb-4802-b74a-5d1486f83dc6',
              'conversation': 'https://biribiri.dev/contexts/d903b0a1-4efb-4802-b74a-5d1486f83dc6',
              'id': 'https://weeaboo.space/objects/965731be-1bab-4b29-90c0-c0c5b8a24224',
              'inReplyTo': 'https://biribiri.dev/objects/e0ff2822-56b4-40f8-a9ae-148706ab160a',
              'published': '2021-03-01T08:00:39.994136Z',
              'sensitive': false,
              'source': '@normandy@biribiri.dev They didn\'t really feature it that prominently. I think Mozilla just didn\'t give a shit since they only viewed it as the future backend of Firefox.\n\nIn November 2020 Servo was taken under the Linux Foundation as their own project, after which they probably realized that maybe they should replace the doge logo',
              'summary': '',
              'tag': [{
                'href': 'https://biribiri.dev/users/normandy',
                'name': '@normandy@biribiri.dev',
                'type': 'Mention'
              }],
              'to': ['https://biribiri.dev/users/normandy', 'https://www.w3.org/ns/activitystreams#Public'],
              'type': 'Note'
            },
            {
              '@context': ['https://www.w3.org/ns/activitystreams', 'https://blob.cat/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
              'actor': {
                'id': 'https://blob.cat/users/allison',
                'tag': [{
                  'id': 'https://blob.cat/emoji/custom/blobcats/blobcatancap.png',
                  'icon': {'url': 'https://blob.cat/emoji/custom/blobcats/blobcatancap.png', 'type': 'Image'},
                  'name': ':blobcatancap:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://blob.cat/emoji/custom/blobcats/blobcatautism2.png',
                  'icon': {'url': 'https://blob.cat/emoji/custom/blobcats/blobcatautism2.png', 'type': 'Image'},
                  'name': ':blobcatautism2:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://blob.cat/emoji/custom/blobcats/blobcatenby.png',
                  'icon': {'url': 'https://blob.cat/emoji/custom/blobcats/blobcatenby.png', 'type': 'Image'},
                  'name': ':blobcatenby:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://blob.cat/emoji/custom/blobcats/blobcatlesbian.png',
                  'icon': {'url': 'https://blob.cat/emoji/custom/blobcats/blobcatlesbian.png', 'type': 'Image'},
                  'name': ':blobcatlesbian:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://blob.cat/emoji/custom/blobcats/blobcatoutage.png',
                  'icon': {'url': 'https://blob.cat/emoji/custom/blobcats/blobcatoutage.png', 'type': 'Image'},
                  'name': ':blobcatoutage:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://blob.cat/emoji/custom/blobcats/blobcattrans.png',
                  'icon': {'url': 'https://blob.cat/emoji/custom/blobcats/blobcattrans.png', 'type': 'Image'},
                  'name': ':blobcattrans:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }],
                'url': 'https://blob.cat/users/allison',
                'icon': {
                  'url': 'https://blobcdn.blob.cat/blobcatfiles/a14a92aafb4d121755e7a0225ce0ba4e8fa40521962cb9d7dadf930d470eabc5.png',
                  'type': 'Image'
                },
                'name': 'Cryptolibertarian Catgirl',
                'type': 'Person',
                'image': {
                  'url': 'https://blobcdn.blob.cat/blobcatfiles/867dc893a1519e7d6f4383d091ea53c8c3389c143069766c57b9b2cb42be3d2f.jpg?name=banner.jpg',
                  'type': 'Image'
                },
                'inbox': 'https://blob.cat/users/allison/inbox',
                'outbox': 'https://blob.cat/users/allison/outbox',
                'summary': 'You can take the girl out of the 8chan, but you can never take the 8chan out of the girl.\u003cbr/\u003e(Pleroma Chat open, XMPP azurexp@404.city, Discord imst-allison#5341, any admin related inquiries can go to these places as well)\u003cbr/\u003e(she/her/男の娘, my position: \u003ca href="http://ants.9gridchan.org/doc/mantsifesto.txt"\u003ehttp://ants.9gridchan.org/doc/mantsifesto.txt\u003c/a\u003e )\u003cbr/\u003e(seriousposting and tech alt on \u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="A0nySOetKlssTssOw4" href="https://decept.org/users/azr" rel="ugc"\u003e@\u003cspan\u003eazr@decept.org\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e , lewd alt on \u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="9vDawkJcXYa6rWgMfg" href="https://blob.cat/users/allinyan" rel="ugc"\u003e@\u003cspan\u003eallinyan@blob.cat\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e )\u003cbr/\u003e:blobcattrans: :blobcatenby: :blobcatlesbian: :blobcatautism2: :blobcatancap: :blobcatoutage:',
                '@context': ['https://www.w3.org/ns/activitystreams', 'https://blob.cat/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
                'endpoints': {
                  'sharedInbox': 'https://blob.cat/inbox',
                  'uploadMedia': 'https://blob.cat/api/ap/upload_media',
                  'oauthTokenEndpoint': 'https://blob.cat/oauth/token',
                  'oauthRegistrationEndpoint': 'https://blob.cat/api/v1/apps',
                  'oauthAuthorizationEndpoint': 'https://blob.cat/oauth/authorize'
                },
                'followers': 'https://blob.cat/users/allison/followers',
                'following': 'https://blob.cat/users/allison/following',
                'publicKey': {
                  'id': 'https://blob.cat/users/allison#main-key',
                  'owner': 'https://blob.cat/users/allison',
                  'publicKeyPem': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzL0I/Yz9e4gEsAdP7v8P\nSZTkWRwdYBUytsMDaU9EJ/DexldBcnc2cLjakxTfBgfK4rI1CWlrRxUqDSCKV3AD\nsMlSxsn1qbRSSCnuZyuxAWrFVCYKIMO5HX4ZjuLvRlBRYQ8dLBx6rtOp8rp5Ug5Y\ndWByC460lO/aHCyDzjTnflScFWDSW6iP8AtmPfBG36BPyMrWkKNH00iMkTZ5MO/F\nqHnYGdhOGbxdN2Ar/rORfG5u5CIpM3ir8lqzuGKMGLVL3Tp2IF0534dhJNU7wh5V\n/LtJhT/wa9OIJPmtXs1h5LI0Vc/n6b8HwIv/Qhj8JXjtxL4oM+ROF5zVuC1+6vCo\nvwIDAQAB\n-----END PUBLIC KEY-----\n\n'
                },
                'attachment': [],
                'alsoKnownAs': [],
                'capabilities': {'acceptsChatMessages': true},
                'discoverable': false,
                'preferredUsername': 'allison',
                'manuallyApprovesFollowers': false
              },
              'attachment': [],
              'attributedTo': 'https://blob.cat/users/allison',
              'cc': ['https://blob.cat/users/allison/followers'],
              'content': '\u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="A2R1ZZuTp6uQEQEiky" href="https://merveilles.town/@dogstar" rel="ugc"\u003e@\u003cspan\u003edogstar\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e If Linux users cared for aesthetics, they\u0026#39;d rectify the font situation themselves.  As it is, they don\u0026#39;t.',
              'context': 'tag:merveilles.town,2021-03-02:objectId=7077668:objectType=Conversation',
              'conversation': 'tag:merveilles.town,2021-03-02:objectId=7077668:objectType=Conversation',
              'id': 'https://blob.cat/objects/a3022b74-7b24-44b9-b3a9-8f4b8aa09cf8',
              'inReplyTo': 'https://merveilles.town/users/dogstar/statuses/105817510060267678',
              'published': '2021-03-02T01:26:32.863780Z',
              'sensitive': false,
              'source': '@dogstar@merveilles.town If Linux users cared for aesthetics, they\'d rectify the font situation themselves.  As it is, they don\'t.',
              'summary': '',
              'tag': [{
                'href': 'https://merveilles.town/users/dogstar',
                'name': '@dogstar@merveilles.town',
                'type': 'Mention'
              }],
              'to': ['https://merveilles.town/users/dogstar', 'https://www.w3.org/ns/activitystreams#Public'],
              'type': 'Note'
            },
            {
              '@context': ['https://www.w3.org/ns/activitystreams', 'https://neckbeard.xyz/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
              'actor': {
                'id': 'https://neckbeard.xyz/users/fortunebot',
                'tag': [],
                'url': 'https://neckbeard.xyz/users/fortunebot',
                'icon': {
                  'url': 'https://neckbeard.xyz/media/21b306d12d5e80fd12f44dfd977ef6b7be03ef1c9e1bc46be86fc68f5a93b3d2.png?name=Fortune_cookie.png',
                  'type': 'Image'
                },
                'name': 'Fortune Bot',
                'type': 'Service',
                'inbox': 'https://neckbeard.xyz/users/fortunebot/inbox',
                'outbox': 'https://neckbeard.xyz/users/fortunebot/outbox',
                'summary': 'Fortune Bot posts a random fortune from a grab-bag of thousands of Unix fortunes. Fortunes are posted every 30 minutes.\u003cbr/\u003e\u003cbr/\u003eExpect to see all kinds of things including insulting copypastas, IRC logs, Bible verses, spam messages, TV and movie quotes and much much more. All fortunes are less than 160 characters and offensive fortunes are included.\u003cbr/\u003e\u003cbr/\u003ePowered by Fortudon: \u003ca href="http://github.com/redblade7/fortudon"\u003egithub.com/redblade7/fortudon\u003c/a\u003e\u003cbr/\u003e\u003cbr/\u003eAccount owned by \u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="9j1McOLz2l0Tgb32um" href="https://neckbeard.xyz/users/redneonglow" rel="ugc"\u003e@\u003cspan\u003eredneonglow\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e\u003cbr/\u003e\u003cbr/\u003eOther fun bots: \u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="9rPKgaf6oHbBEk2xuq" href="https://neckbeard.xyz/users/BitchX" rel="ugc"\u003e@\u003cspan\u003eBitchX\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e \u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="9ongNod32C9Rsbxw0W" href="https://neckbeard.xyz/users/darkweb" rel="ugc"\u003e@\u003cspan\u003edarkweb\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e \u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="A0axOjODHZ6RpI6FtY" href="https://neckbeard.xyz/users/loliaword" rel="ugc"\u003e@\u003cspan\u003eloliaword\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e \u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="9rbOG704ghecqEvfY8" href="https://neckbeard.xyz/users/ShowerThoughts" rel="ugc"\u003e@\u003cspan\u003eShowerThoughts\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e \u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="9tlldosHr3wVZLcEHg" href="https://neckbeard.xyz/users/weebaword" rel="ugc"\u003e@\u003cspan\u003eweebaword\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e \u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="9rN6NOkz3u2d8XpTt2" href="https://neckbeard.xyz/users/YKYWTMSMW" rel="ugc"\u003e@\u003cspan\u003eYKYWTMSMW\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e ',
                '@context': ['https://www.w3.org/ns/activitystreams', 'https://neckbeard.xyz/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
                'endpoints': {
                  'sharedInbox': 'https://neckbeard.xyz/inbox',
                  'uploadMedia': 'https://neckbeard.xyz/api/ap/upload_media',
                  'oauthTokenEndpoint': 'https://neckbeard.xyz/oauth/token',
                  'oauthRegistrationEndpoint': 'https://neckbeard.xyz/api/v1/apps',
                  'oauthAuthorizationEndpoint': 'https://neckbeard.xyz/oauth/authorize'
                },
                'followers': 'https://neckbeard.xyz/users/fortunebot/followers',
                'following': 'https://neckbeard.xyz/users/fortunebot/following',
                'publicKey': {
                  'id': 'https://neckbeard.xyz/users/fortunebot#main-key',
                  'owner': 'https://neckbeard.xyz/users/fortunebot',
                  'publicKeyPem': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoO/6F4r9lrr07OPPQURF\nkUu2N1FZ9U/O/SNr23WMhR7FusszYuJw8Wb4foKc2F/8trBCeBZG1SE7d4wzgEEg\nQgXCe9OXvxnDCq2G+fw0cEGhFXnPcNUTIVnpcrgeyE1UeiuY0dfy28YfqBL1eumz\nKAmNPuYzbJ6vSOdOlclZSMgthXpCfpcmRLAc6+H9419XGw7PK+k76u8x5SWBiUgG\nMDHeMv27reBcQZjeEkXeTBVcOsa3wN7PKSkHanCylhhsF3Ov6ezteCDNZr7hFFPk\neK6ACVc9vC5foQyAvgogbojPjwJdE/zGVgpP/cxlLgE3P6MAgegGhR6G1uVZGgp5\n7wIDAQAB\n-----END PUBLIC KEY-----\n\n'
                },
                'attachment': [],
                'alsoKnownAs': [],
                'capabilities': {'acceptsChatMessages': true},
                'discoverable': true,
                'preferredUsername': 'fortunebot',
                'manuallyApprovesFollowers': false
              },
              'attachment': [],
              'attributedTo': 'https://neckbeard.xyz/users/fortunebot',
              'cc': ['https://neckbeard.xyz/users/fortunebot/followers'],
              'content': '\u0026gt;Ever heard of .cshrc?\u003cbr\u003eThat\u0026#39;s a city in Bosnia.  Right?\u003cbr\u003e\t-- Discussion in comp.os.linux.misc on the intuitiveness of commands',
              'context': 'https://neckbeard.xyz/contexts/035338e0-a72d-47a7-ba80-124334e789b4',
              'conversation': 'https://neckbeard.xyz/contexts/035338e0-a72d-47a7-ba80-124334e789b4',
              'id': 'https://neckbeard.xyz/objects/b0c954ac-3097-43de-98ac-ded19e6fdf74',
              'published': '2021-03-02T01:20:01.969732Z',
              'sensitive': false,
              'source': '\u003eEver heard of .cshrc?\nThat\'s a city in Bosnia.  Right?\n\t-- Discussion in comp.os.linux.misc on the intuitiveness of commands',
              'summary': '',
              'tag': [],
              'to': ['https://www.w3.org/ns/activitystreams#Public'],
              'type': 'Note'
            },
            {
              '@context': ['https://www.w3.org/ns/activitystreams', 'https://pleroma.envs.net/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
              'actor': {
                'id': 'https://pleroma.envs.net/users/itZzenXX',
                'tag': [{
                  'id': 'https://pleroma.envs.net/emoji/logos/android.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/logos/android.png', 'type': 'Image'},
                  'name': ':android:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/logos/archlinux.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/logos/archlinux.png', 'type': 'Image'},
                  'name': ':archlinux:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/logos/bitcoin.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/logos/bitcoin.png', 'type': 'Image'},
                  'name': ':bitcoin:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/logos/debian.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/logos/debian.png', 'type': 'Image'},
                  'name': ':debian:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/logos/fdroid.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/logos/fdroid.png', 'type': 'Image'},
                  'name': ':fdroid:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/logos/gentoo.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/logos/gentoo.png', 'type': 'Image'},
                  'name': ':gentoo:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/logos/gnu.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/logos/gnu.png', 'type': 'Image'},
                  'name': ':gnu:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/logos/i3wm.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/logos/i3wm.png', 'type': 'Image'},
                  'name': ':i3wm:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/custom/linux.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/custom/linux.png', 'type': 'Image'},
                  'name': ':linux:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/solarsystem/moon_photo.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/solarsystem/moon_photo.png', 'type': 'Image'},
                  'name': ':moon_photo:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/logos/onion.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/logos/onion.png', 'type': 'Image'},
                  'name': ':onion:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/logos/opensource.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/logos/opensource.png', 'type': 'Image'},
                  'name': ':opensource:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }, {
                  'id': 'https://pleroma.envs.net/emoji/logos/xmpp.png',
                  'icon': {'url': 'https://pleroma.envs.net/emoji/logos/xmpp.png', 'type': 'Image'},
                  'name': ':xmpp:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }],
                'url': 'https://pleroma.envs.net/users/itZzenXX',
                'icon': {
                  'url': 'https://pleroma.envs.net/media/1fa58f8062c29bcfae7ae5853d0010b22e7464cefeded0b146d3b56863e913a6.YHT93GSS850M',
                  'type': 'Image'
                },
                'name': '★ itZzenXX ★',
                'type': 'Person',
                'image': {
                  'url': 'https://pleroma.envs.net/media/c70b31226879c61f80441a719e8831839b55c5432e706b35d351e518acf7388d.1MNCHKV33YLM',
                  'type': 'Image'
                },
                'inbox': 'https://pleroma.envs.net/users/itZzenXX/inbox',
                'outbox': 'https://pleroma.envs.net/users/itZzenXX/outbox',
                'summary': '★ Hello! my name is zen, and I am a 14 year old computer geek. I enjoy playing around with tech, learning more about foss software, watching youtube and peertube all day, and socializing with people! ★\u003cbr/\u003e\u003cbr/\u003e★ “If the users don\u0026#39;t control the program, the program controls the users.” ★\u003cbr/\u003e\u003cbr/\u003e★ :onion: :xmpp: :gnu: :gentoo: :debian::archlinux: :linux: :android: :fdroid: :i3wm: :opensource: :bitcoin: ★',
                '@context': ['https://www.w3.org/ns/activitystreams', 'https://pleroma.envs.net/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
                'endpoints': {
                  'sharedInbox': 'https://pleroma.envs.net/inbox',
                  'uploadMedia': 'https://pleroma.envs.net/api/ap/upload_media',
                  'oauthTokenEndpoint': 'https://pleroma.envs.net/oauth/token',
                  'oauthRegistrationEndpoint': 'https://pleroma.envs.net/api/v1/apps',
                  'oauthAuthorizationEndpoint': 'https://pleroma.envs.net/oauth/authorize'
                },
                'followers': 'https://pleroma.envs.net/users/itZzenXX/followers',
                'following': 'https://pleroma.envs.net/users/itZzenXX/following',
                'publicKey': {
                  'id': 'https://pleroma.envs.net/users/itZzenXX#main-key',
                  'owner': 'https://pleroma.envs.net/users/itZzenXX',
                  'publicKeyPem': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnLy3q1+2YiQMSJEy6BcH\npsOHd8H2vlIa0kvb4GshsndVzvnrD7b85RJJSsPV71WzeZxXj2YzpJfAwRgizRRE\nyXif9Np+l+6196ZaPOhHvYtosbuBtayhtDwHubaKE5mLwjp6qdKoOacknYfxn4e6\nVzvWe10SjzMaYzf/SHRF0fJLfZRHQp2Lysjg57kn67nZgVWTQP1vA00jt8WdUfsc\nSlKaJu58b5f7nhEFFahalIqU8ulU1GrTBN1iupkOliQksbq/ooVZGyKjinZc6xZF\nV2MT6+kUrm7aHlzye/Tu0QHWCSewuC1FG9p0H4ShbrBTEj2O29TEEug/u1GJqI3q\nxQIDAQAB\n-----END PUBLIC KEY-----\n\n'
                },
                'attachment': [{
                  'name': 'OS ',
                  'type': 'PropertyValue',
                  'value': ':archlinux: :gentoo: :debian: :android: '
                }, {'name': 'Browsers', 'type': 'PropertyValue', 'value': ':onion: :moon_photo:'}, {
                  'name': 'Pronouns',
                  'type': 'PropertyValue',
                  'value': 'He / Him'
                }, {
                  'name': 'Website',
                  'type': 'PropertyValue',
                  'value': '\u003ca href="http://www.itzzen.net" rel="ugc"\u003ewww.itzzen.net\u003c/a\u003e'
                }],
                'capabilities': {'acceptsChatMessages': true},
                'discoverable': true,
                'preferredUsername': 'itZzenXX',
                'manuallyApprovesFollowers': false
              },
              'attachment': [],
              'attributedTo': 'https://pleroma.envs.net/users/itZzenXX',
              'cc': ['https://pleroma.envs.net/users/itZzenXX/followers'],
              'content': '\u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="9rVFbSvGSMPLFo3DWa" href="https://blob.cat/users/allison" rel="ugc"\u003e@\u003cspan\u003eallison\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e Linux:\u003cbr\u003eGentoo on my thinkpad and gaming rig\u003cbr\u003eArch Linux on a bootable USB \u003cbr\u003eDevuan on my server laptop\u003cbr\u003emacOS:\u003cbr\u003eOS X Leopard on my iMac G4',
              'context': 'https://blob.cat/contexts/99bd1f8a-536e-4aa0-8ead-7a92dea95a13',
              'conversation': 'https://blob.cat/contexts/99bd1f8a-536e-4aa0-8ead-7a92dea95a13',
              'id': 'https://pleroma.envs.net/objects/93ec2321-6333-4ffe-9979-d9a4baaea4ea',
              'inReplyTo': 'https://blob.cat/objects/4d99f097-382f-45a8-a6bf-78fa6b0b704a',
              'published': '2021-03-02T06:15:58.234270Z',
              'sensitive': false,
              'source': '@allison@blob.cat Linux:\nGentoo on my thinkpad and gaming rig\nArch Linux on a bootable USB \nDevuan on my server laptop\nmacOS:\nOS X Leopard on my iMac G4',
              'summary': '',
              'tag': [{'href': 'https://blob.cat/users/allison', 'name': '@allison@blob.cat', 'type': 'Mention'}],
              'to': ['https://blob.cat/users/allison', 'https://www.w3.org/ns/activitystreams#Public'],
              'type': 'Note'
            },
            {
              '@context': ['https://www.w3.org/ns/activitystreams', 'https://poa.st/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
              'actor': {
                'id': 'https://poa.st/users/MischievousTomato',
                'tag': [{
                  'id': 'https://poa.st/emoji/custom/verified_badges/verified.png',
                  'icon': {'url': 'https://poa.st/emoji/custom/verified_badges/verified.png', 'type': 'Image'},
                  'name': ':verified:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }],
                'url': 'https://poa.st/users/MischievousTomato',
                'icon': {
                  'url': 'https://poa.st/media/cba895eb315cd01383a4d1107a400815af87e7cf54da9424d860b1c5d5be46e9.0V3D4OC94SMK',
                  'type': 'Image'
                },
                'name': 'MischievousTomato :verified:',
                'type': 'Person',
                'inbox': 'https://poa.st/users/MischievousTomato/inbox',
                'outbox': 'https://poa.st/users/MischievousTomato/outbox',
                'summary': '\u003ca href="http://Poa.st"\u003ePoa.st\u003c/a\u003e account for MischievousTomato, also on fse.\u003cbr/\u003eTHE ONE, THE ONLY\u003cbr/\u003eRun, I could run for miles.\u003cbr/\u003eIt\u0026#39;s gonna take a while, to bring myself back to you\u003cbr/\u003eSend feet pics to my Telegram!\u003cbr/\u003e\u003ca class="hashtag" data-tag="nobot" href="https://poa.st/tag/nobot"\u003e#nobot\u003c/a\u003e is needed, apparently.',
                '@context': ['https://www.w3.org/ns/activitystreams', 'https://poa.st/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
                'endpoints': {
                  'sharedInbox': 'https://poa.st/inbox',
                  'uploadMedia': 'https://poa.st/api/ap/upload_media',
                  'oauthTokenEndpoint': 'https://poa.st/oauth/token',
                  'oauthRegistrationEndpoint': 'https://poa.st/api/v1/apps',
                  'oauthAuthorizationEndpoint': 'https://poa.st/oauth/authorize'
                },
                'followers': 'https://poa.st/users/MischievousTomato/followers',
                'following': 'https://poa.st/users/MischievousTomato/following',
                'publicKey': {
                  'id': 'https://poa.st/users/MischievousTomato#main-key',
                  'owner': 'https://poa.st/users/MischievousTomato',
                  'publicKeyPem': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoKJUpvHQA0MiGsoSHli4\na6ULQ49odxsbqDcVAUQ/dA5OxfKDG/+DoQeFoI3OP6cg8z80SrRzXtN/CZsetSaN\n7JqAzAd2+eaER7ChMf9WSoiFEC9tKJqTG6Lw25EC4cquMdwklDiYxf7Jd7Xf6yyq\nisRWrrS354Gvsd/HQOfLU+3ggPKG+oPaO3ZvjWDeJxuK3+agY0/fbBYW2TVvLkbq\nDu7wJ0W2WxwEodlBd2lCRzO1MNyEHyT66e3hfld39PuZFtrZCtdHRTZ3PxWFE2ce\n2Zwh+TENVxINinjenQkft7pV+7cLHlkhKv6bYeIfo7XUra32RV5FwBOXYDcW4nBF\n+QIDAQAB\n-----END PUBLIC KEY-----\n\n'
                },
                'attachment': [{
                  'name': 'Discord',
                  'type': 'PropertyValue',
                  'value': 'No longer have one'
                }, {
                  'name': 'Telegram',
                  'type': 'PropertyValue',
                  'value': '\u003ca href="https://poa.st/users/MischievousTomato" rel="ugc"\u003e@mischievoustomato\u003c/a\u003e'
                }, {'name': 'In need of', 'type': 'PropertyValue', 'value': 'Gf/trap'}, {
                  'name': 'Guilded',
                  'type': 'PropertyValue',
                  'value': 'MischievousTomato'
                }],
                'capabilities': {'acceptsChatMessages': true},
                'discoverable': false,
                'preferredUsername': 'MischievousTomato',
                'manuallyApprovesFollowers': false
              },
              'attachment': [],
              'attributedTo': 'https://poa.st/users/MischievousTomato',
              'cc': ['https://poa.st/users/MischievousTomato/followers'],
              'content': '\u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="A4m651svEHosUT3VfU" href="https://poa.st/users/TakInitialD" rel="ugc"\u003e@\u003cspan\u003eTakInitialD\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e I don\u0026#39;t have driver issues aside from the wifi driver not supporting my laptop\u0026#39;s wifi chip variant and the fingerprint sensor not being usable due to the algorithm used in the fingerprint tool not being appropiate for it. Aside from that all is fine. I get around 90% of the battery life I get on Windows but I\u0026#39;m sure it can be better than it.\u003cbr\u003eI\u0026#39;m studying CS at uni so using Linux is so much better than using Windows. Plus as a normal user it also feels better.',
              'context': 'https://poa.st/contexts/ff086336-dde3-4c4e-a0dd-005b2518f786',
              'conversation': 'https://poa.st/contexts/ff086336-dde3-4c4e-a0dd-005b2518f786',
              'id': 'https://poa.st/objects/179d5d18-80a7-4786-bbc1-0ed506885c40',
              'inReplyTo': 'https://poa.st/objects/ab401f8a-8710-468a-8b66-e131fa96c90e',
              'published': '2021-03-02T06:04:01.551551Z',
              'sensitive': false,
              'source': '@TakInitialD I don\'t have driver issues aside from the wifi driver not supporting my laptop\'s wifi chip variant and the fingerprint sensor not being usable due to the algorithm used in the fingerprint tool not being appropiate for it. Aside from that all is fine. I get around 90% of the battery life I get on Windows but I\'m sure it can be better than it.\nI\'m studying CS at uni so using Linux is so much better than using Windows. Plus as a normal user it also feels better.',
              'summary': '',
              'tag': [{'href': 'https://poa.st/users/TakInitialD', 'name': '@TakInitialD', 'type': 'Mention'}],
              'to': ['https://poa.st/users/TakInitialD', 'https://www.w3.org/ns/activitystreams#Public'],
              'type': 'Note'
            },
            {
              '@context': ['https://www.w3.org/ns/activitystreams', 'https://notnow.dev/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
              'actor': {
                'id': 'https://notnow.dev/users/zhuowei',
                'tag': [],
                'url': 'https://notnow.dev/users/zhuowei',
                'name': 'zhuowei',
                'type': 'Person',
                'inbox': 'https://notnow.dev/users/zhuowei/inbox',
                'outbox': 'https://notnow.dev/users/zhuowei/outbox',
                'summary': '',
                '@context': ['https://www.w3.org/ns/activitystreams', 'https://notnow.dev/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
                'endpoints': {
                  'sharedInbox': 'https://notnow.dev/inbox',
                  'uploadMedia': 'https://notnow.dev/api/ap/upload_media',
                  'oauthTokenEndpoint': 'https://notnow.dev/oauth/token',
                  'oauthRegistrationEndpoint': 'https://notnow.dev/api/v1/apps',
                  'oauthAuthorizationEndpoint': 'https://notnow.dev/oauth/authorize'
                },
                'followers': 'https://notnow.dev/users/zhuowei/followers',
                'following': 'https://notnow.dev/users/zhuowei/following',
                'publicKey': {
                  'id': 'https://notnow.dev/users/zhuowei#main-key',
                  'owner': 'https://notnow.dev/users/zhuowei',
                  'publicKeyPem': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvbI8dfvqoEJbDfzHOeHo\n00CqDQsnag5jM0rflFKGqkDpOihSSA4OPVYsD+inDpMH/sS0UYtqQv7ipJL62aiI\nypZfKqBm9g1fOOj6twQ4Nu2qCx8yH6OWj4Os2QjRXKciQwW9SAHA8BWgQteR8sBt\nDeiwCHmjPV2svkUtpTxDAgGQDKJniMOl3e/Pnvu+c1c96CNQUHpt/r+uLxOv1K6z\ncfyiOYWJi9ZosxW4+nX+aYk4iuJZJovyac3D9kmPHY8k5Lo73yXJsa1SCIPO0Ki4\nD1aARmbJpzALbMLnn+7oCKgGAcNs4dedWlJiE4MGuZJYBfHYAyPe5a1TLWTeZuq5\nswIDAQAB\n-----END PUBLIC KEY-----\n\n'
                },
                'attachment': [],
                'capabilities': {'acceptsChatMessages': true},
                'discoverable': false,
                'preferredUsername': 'zhuowei',
                'manuallyApprovesFollowers': false
              },
              'attachment': [],
              'attributedTo': 'https://notnow.dev/users/zhuowei',
              'cc': ['https://notnow.dev/users/zhuowei/followers'],
              'content': '\u003cp\u003eLinux malware renders systems unbootable by running \u003ccode\u003epacman -Syu\u003c/code\u003e\u003c/p\u003e',
              'context': 'https://notnow.dev/contexts/9ba80b41-1c4e-4023-8aa1-e6b19a74a3b9',
              'conversation': 'https://notnow.dev/contexts/9ba80b41-1c4e-4023-8aa1-e6b19a74a3b9',
              'id': 'https://notnow.dev/objects/ecbc27cb-21b5-405c-ba03-240247cf3d1d',
              'published': '2021-02-18T23:05:25.083692Z',
              'sensitive': false,
              'source': 'Linux malware renders systems unbootable by running `pacman -Syu`',
              'summary': '',
              'tag': [],
              'to': ['https://www.w3.org/ns/activitystreams#Public'],
              'type': 'Note'
            },
            {
              '@context': ['https://www.w3.org/ns/activitystreams', 'https://poa.st/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
              'actor': {
                'id': 'https://poa.st/users/MischievousTomato',
                'tag': [{
                  'id': 'https://poa.st/emoji/custom/verified_badges/verified.png',
                  'icon': {'url': 'https://poa.st/emoji/custom/verified_badges/verified.png', 'type': 'Image'},
                  'name': ':verified:',
                  'type': 'Emoji',
                  'updated': '1970-01-01T00:00:00Z'
                }],
                'url': 'https://poa.st/users/MischievousTomato',
                'icon': {
                  'url': 'https://poa.st/media/cba895eb315cd01383a4d1107a400815af87e7cf54da9424d860b1c5d5be46e9.0V3D4OC94SMK',
                  'type': 'Image'
                },
                'name': 'MischievousTomato :verified:',
                'type': 'Person',
                'inbox': 'https://poa.st/users/MischievousTomato/inbox',
                'outbox': 'https://poa.st/users/MischievousTomato/outbox',
                'summary': '\u003ca href="http://Poa.st"\u003ePoa.st\u003c/a\u003e account for MischievousTomato, also on fse.\u003cbr/\u003eTHE ONE, THE ONLY\u003cbr/\u003eRun, I could run for miles.\u003cbr/\u003eIt\u0026#39;s gonna take a while, to bring myself back to you\u003cbr/\u003eSend feet pics to my Telegram!\u003cbr/\u003e\u003ca class="hashtag" data-tag="nobot" href="https://poa.st/tag/nobot"\u003e#nobot\u003c/a\u003e is needed, apparently.',
                '@context': ['https://www.w3.org/ns/activitystreams', 'https://poa.st/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
                'endpoints': {
                  'sharedInbox': 'https://poa.st/inbox',
                  'uploadMedia': 'https://poa.st/api/ap/upload_media',
                  'oauthTokenEndpoint': 'https://poa.st/oauth/token',
                  'oauthRegistrationEndpoint': 'https://poa.st/api/v1/apps',
                  'oauthAuthorizationEndpoint': 'https://poa.st/oauth/authorize'
                },
                'followers': 'https://poa.st/users/MischievousTomato/followers',
                'following': 'https://poa.st/users/MischievousTomato/following',
                'publicKey': {
                  'id': 'https://poa.st/users/MischievousTomato#main-key',
                  'owner': 'https://poa.st/users/MischievousTomato',
                  'publicKeyPem': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoKJUpvHQA0MiGsoSHli4\na6ULQ49odxsbqDcVAUQ/dA5OxfKDG/+DoQeFoI3OP6cg8z80SrRzXtN/CZsetSaN\n7JqAzAd2+eaER7ChMf9WSoiFEC9tKJqTG6Lw25EC4cquMdwklDiYxf7Jd7Xf6yyq\nisRWrrS354Gvsd/HQOfLU+3ggPKG+oPaO3ZvjWDeJxuK3+agY0/fbBYW2TVvLkbq\nDu7wJ0W2WxwEodlBd2lCRzO1MNyEHyT66e3hfld39PuZFtrZCtdHRTZ3PxWFE2ce\n2Zwh+TENVxINinjenQkft7pV+7cLHlkhKv6bYeIfo7XUra32RV5FwBOXYDcW4nBF\n+QIDAQAB\n-----END PUBLIC KEY-----\n\n'
                },
                'attachment': [{
                  'name': 'Discord',
                  'type': 'PropertyValue',
                  'value': 'No longer have one'
                }, {
                  'name': 'Telegram',
                  'type': 'PropertyValue',
                  'value': '\u003ca href="https://poa.st/users/MischievousTomato" rel="ugc"\u003e@mischievoustomato\u003c/a\u003e'
                }, {'name': 'In need of', 'type': 'PropertyValue', 'value': 'Gf/trap'}, {
                  'name': 'Guilded',
                  'type': 'PropertyValue',
                  'value': 'MischievousTomato'
                }],
                'capabilities': {'acceptsChatMessages': true},
                'discoverable': false,
                'preferredUsername': 'MischievousTomato',
                'manuallyApprovesFollowers': false
              },
              'attachment': [],
              'attributedTo': 'https://poa.st/users/MischievousTomato',
              'cc': ['https://poa.st/users/MischievousTomato/followers'],
              'content': 'I really love linux but until shit like Intel DTPF and other low level, power management stuff works as expected, 1:1 compared to windows or better, battery life and thermals will be annoying and shitty.',
              'context': 'https://poa.st/contexts/ff086336-dde3-4c4e-a0dd-005b2518f786',
              'conversation': 'https://poa.st/contexts/ff086336-dde3-4c4e-a0dd-005b2518f786',
              'id': 'https://poa.st/objects/0d551f31-a7b0-4f40-8712-07762ddee43b',
              'published': '2021-03-02T05:54:12.416161Z',
              'sensitive': false,
              'source': 'I really love linux but until shit like Intel DTPF and other low level, power management stuff works as expected, 1:1 compared to windows or better, battery life and thermals will be annoying and shitty.',
              'summary': '',
              'tag': [],
              'to': ['https://www.w3.org/ns/activitystreams#Public'],
              'type': 'Note'
            },
            {
              '@context': ['https://www.w3.org/ns/activitystreams', 'https://shitposter.club/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
              'actor': {
                'id': 'https://shitposter.club/users/pernia',
                'tag': [],
                'url': 'https://shitposter.club/users/pernia',
                'icon': {
                  'url': 'https://shitposter.club/media/f2e3a128d9a0b21dfdabfae10ac398dd129f4c6f15a842073cade2feafeef222.jpg?name=blob.jpg',
                  'type': 'Image'
                },
                'name': 'pernia',
                'type': 'Person',
                'image': {
                  'url': 'https://shitposter.club/media/843c7c7e914ee206239b3379f223ae0ac0ededb132e8126b80803f06318fe557.jpg?name=31-birthday-boy.w710.h473.jpg',
                  'type': 'Image'
                },
                'inbox': 'https://shitposter.club/users/pernia/inbox',
                'outbox': 'https://shitposter.club/users/pernia/outbox',
                'summary': 'c:',
                '@context': ['https://www.w3.org/ns/activitystreams', 'https://shitposter.club/schemas/litepub-0.1.jsonld', {'@language': 'und'}],
                'endpoints': {
                  'sharedInbox': 'https://shitposter.club/inbox',
                  'uploadMedia': 'https://shitposter.club/api/ap/upload_media',
                  'oauthTokenEndpoint': 'https://shitposter.club/oauth/token',
                  'oauthRegistrationEndpoint': 'https://shitposter.club/api/v1/apps',
                  'oauthAuthorizationEndpoint': 'https://shitposter.club/oauth/authorize'
                },
                'followers': 'https://shitposter.club/users/pernia/followers',
                'following': 'https://shitposter.club/users/pernia/following',
                'publicKey': {
                  'id': 'https://shitposter.club/users/pernia#main-key',
                  'owner': 'https://shitposter.club/users/pernia',
                  'publicKeyPem': '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvrdB8mndUYpai6m2JFfB\nPXGNSI+uzQG+mftJCgzwZxFLuYnXRqShn2Znnsdj+fsq8lprSjgGi3XOLCvM/P/s\nbTPuNdHu9HaVhL6+MO77ajb8coT19sP81rsOlajhnA+Y+cCC3bZNIlWUE526pOmm\n/uAlOfGDXD00rUBygr8qU1Z3gkn5kt+d6FZL8GJ4vzYnr32CJiTiZ48hEXOtyJuX\nBAmPAV7myAGM5Af1HH1kGIgOW9GppOasriQsvv2Mts8bx4UsgFmForXVfYSvtj2d\ne9qtLaUGwPSPZIxyI6qX9TywlSO9GY5Cnsopyolahri5gYT9JhWwNPSikTKZI3qQ\nQQIDAQAB\n-----END PUBLIC KEY-----\n\n'
                },
                'attachment': [],
                'capabilities': {'acceptsChatMessages': true},
                'discoverable': true,
                'preferredUsername': 'pernia',
                'manuallyApprovesFollowers': false
              },
              'attachment': [],
              'attributedTo': 'https://shitposter.club/users/pernia',
              'cc': ['https://shitposter.club/users/pernia/followers'],
              'content': '\u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="A3Phm2QUHmSBYKn5FI" href="https://collapsitarian.io/users/dubh" rel="ugc"\u003e@\u003cspan\u003edubh\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e \u003cspan class="h-card"\u003e\u003ca class="u-url mention" data-user="75591" href="https://freespeechextremist.com/users/p" rel="ugc"\u003e@\u003cspan\u003ep\u003c/span\u003e\u003c/a\u003e\u003c/span\u003e have a cluster of pis(s) and just manage them with drawterm on a linux pseudoterminal',
              'context': 'https://shitposter.club/contexts/47dc38a8-bfb5-43ed-ae8f-7fcd4c04a8dc',
              'conversation': 'https://shitposter.club/contexts/47dc38a8-bfb5-43ed-ae8f-7fcd4c04a8dc',
              'id': 'https://shitposter.club/objects/83b5dc73-11d3-4507-a230-396d6fd9919e',
              'inReplyTo': 'https://collapsitarian.io/objects/700726d9-d96a-4833-b993-65c4342fe22b',
              'published': '2021-03-01T18:19:09.866163Z',
              'sensitive': false,
              'source': '@dubh@collapsitarian.io @p@freespeechextremist.com have a cluster of pis(s) and just manage them with drawterm on a linux pseudoterminal',
              'summary': '',
              'tag': [{
                'href': 'https://collapsitarian.io/users/dubh',
                'name': '@dubh@collapsitarian.io',
                'type': 'Mention'
              }, {
                'href': 'https://freespeechextremist.com/users/p',
                'name': '@p@freespeechextremist.com',
                'type': 'Mention'
              }],
              'to': ['https://collapsitarian.io/users/dubh', 'https://www.w3.org/ns/activitystreams#Public', 'https://freespeechextremist.com/users/p'],
              'type': 'Note'
            }],
        },
    toggleMessage: false,
  }),
  computed: {
    items() {
      return this.data;
    },
    search_keyword() {
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
        this.$vuetify.theme.dark = true;
      } else {
        localStorage.removeItem('theme');
        this.$vuetify.theme.dark = false;
      }
      this.$forceUpdate();
    },
    getSearchResult(event: any) {
      this.isLoading = true;
      let lastIdQuery = '';
      this.isLoadMore = event.isLoadMore;
      if (event.lastId) {
        lastIdQuery = `&lastid=${event.lastId}`;
      }
      axios({
        method: 'get',
        url: `http://cherokeestreet.mynetgear.com:6432/search?s=${this.search_keyword}${event.lastId ? lastIdQuery : ''}`,
        headers: {}
      }).then(response => {
        this.isLoading = false;
        if (this.isLoadMore) {
          this.data.requestdata = response.data.requestdata;
          if (response.data.activities && response.data.activities.length) {
            response.data.activities.forEach(item => {
              this.data.activities.push(item);
            });
          } else {
            this.toggleMessage = true;
          }
        } else {
          this.data = response.data;
        }
      }).catch(() => {
        this.isLoading = false;
      });
    },
  },
  created() {
    this.getSearchResult({isLoadMore: false});
    // setInterval(() => {
    //   this.isLoading = false;
    // }, 50000);
  }
});
</script>
