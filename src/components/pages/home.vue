<template>
  <v-container  align="center">
    <v-row no-gutters align="center"
      justify="center">
      <v-col cols="12" sm="12">
        <v-layout >
          <v-flex xs4></v-flex>
          <v-flex xs4 justify-center>
            <div>
            <img style="width:45%;display:block;margin:0 auto"  alt="Vue logo" src="../../assets/logo.png" />
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
            <v-flex xs2 >
            </v-flex>
            <v-flex xs8 >
              <v-text-field required label="Search..." solo name="keyword"></v-text-field>
            </v-flex>
            <v-flex xs2 >
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class App extends Vue {
  private mounted() {
    // alert('test');
  }
}
</script>
