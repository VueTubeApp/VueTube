<template>
  <v-app>
    <v-card class="topNav rounded-0" style="display: flex; box-shadow: none !important;" color="accent white--text">
      <h2 v-text="page" v-show="!search" />

      <v-text-field
        label="Search"
        v-model="text"
        @input="textChanged"
        class="searchBar"
        color="white"
        v-if="search"
      />

      <v-spacer />

      <v-btn text class="toolbarAction mr-2 fill-height" color="white" @click="search = !search"><v-icon>mdi-magnify</v-icon></v-btn>

      <v-btn text class="toolbarAction fill-height" color="white" v-show="!search" to="/settings"><v-icon>mdi-dots-vertical</v-icon></v-btn>

    </v-card>


    <div class="accent" style="height: 100%">
      <div class="background">
        <nuxt v-show="!search" />


        <div style="min-width: 180px;" v-if="search">
          <v-list-item v-for="(item, index) in response" :key="index">
            <v-btn text dense class="info--text searchButton text-left" @click="youtubeSearch(item)" v-text="item[0]" />
          </v-list-item>
        </div>


      </div>
    </div>

    <bottomNavigation v-if="!search" />

    <updateChecker />


  </v-app>
</template>

<style>
* {
  font-family: Arial, Helvetica, sans-serif !important;
}
html, body {
  overflow-x: hidden;
}

p, span, div {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
</style>

<style scoped>
.toolbarAction {
  min-width: 40px !important;
}
.topNav {
  padding: 1rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
  /*border-radius: 0 0 1em 1em !important;*/
}
.topNavSearch {
  margin-bottom: -10em;
  margin-left: 2em;
  /*transform: translateY(-2.5%);*/
}
.background {
  height: 100%;
  padding: 4em 0 4em 0; /* Account for Top/Bottom Novigation */
}
.searchBar {
  margin: 0;
  position: absolute;
  transform: translateY(-10%);
  width: 80%
}
.searchButton {
  width: 100%;
  justify-content: left !important;
}
</style>

<script>
import { App as CapacitorApp } from '@capacitor/app';
export default {
  data: () => ({
    search: false,

    text: null,
    response: [],
  }),

  mounted() {

    //---   Load Saved Theme   ---//
    setTimeout(() => { //Set timeout is required to make it load properly... dont ask me why -Front
      const darkTheme = localStorage.getItem('darkTheme');
      if (darkTheme == "true") {
        this.$vuetify.theme.dark = darkTheme;
        this.$vuetify.theme.themes.dark.accent = '#222',
        this.$vuetify.theme.themes.dark.accent2 = '#222',
        this.$vuetify.theme.themes.dark.background = '#333'
      }
    }, 0);

    //---   Back Button Listener   ---//
    CapacitorApp.addListener('backButton', ({canGoBack}) => {

      //---   Back Closes Search   ---//
      if (this.search) {
        this.search = false;

      //---   Back Goes Back   ---//
      } else if (!canGoBack){
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
  },
  computed: {
    page: function () {
      const splitPath = this.$route.path.split("/");
      let pageName = splitPath[splitPath.length-1];
      pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
      return pageName || "Home";
    }
  },

  methods: {
    textChanged() {
      this.$youtube.autoComplete(this.text, (res) => {
        const data = res.replace(/^.*?\(/,'').replace(/\)$/,''); //Format Response
        this.response = JSON.parse(data)[1]
      });
    },

    youtubeSearch(item) {
      this.$router.push(`/search?q=${item[0]}`);
    }
  }
}
</script>
