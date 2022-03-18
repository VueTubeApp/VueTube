<template>
  <v-app style="background: black !important;">
    <v-card
      :style="{
        borderRadius: roblox ? '0rem' : '1rem 1rem 0px 0px !important'
      }" 
      style="height: 4rem !important; display: flex; box-shadow: none !important;"
      color="accent white--text"
      class="topNav rounded-0"
      >
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


      <v-btn text class="toolbarAction mr-2 fill-height" color="white" @click="searchBtn()"><v-icon>mdi-magnify</v-icon></v-btn>
      <v-btn text class="toolbarAction fill-height" color="white" v-show="!search" to="/settings"><v-icon>mdi-dots-vertical</v-icon></v-btn>

    </v-card>


    <div style="height: calc(100% - 1rem); margin-top: 1rem; padding-top: 3rem; background: linear-gradient(var(--v-accent-base) 0%, var(--v-accent2-base) 100%); border-radius: 1rem;">
      <div 
        class="background scroll-y" 
        style="padding: 0; height: calc(100vh - 8rem); overflow-x: hidedn;"
        :style="{
          borderRadius: roblox ? '0rem' : '1rem'
        }"
      >

        <nuxt v-show="!search" />
        <div style="min-width: 180px;" v-if="search">
          <v-list-item v-for="(item, index) in response" :key="index">
            <v-btn text dense class="info--text searchButton text-left" @click="youtubeSearch(item)" v-text="item[0]" />
          </v-list-item>
        </div>

      </div>
    </div>

    <bottomNavigation v-if="!search"
      :style="{
        borderRadius: roblox ? '0rem' : '0 0 1rem 1rem !important'
      }"
    />

    <updateChecker />

  </v-app>
</template>

<style>
* {
  font-family: Arial, Helvetica, sans-serif !important;
}
.scroll-y {
  overflow-y: scroll !important; /* has to be scroll, not auto */
  -webkit-overflow-scrolling: touch !important;
}
html, body {
  background: black;
  overflow: hidden;
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
  width: 75%
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
    roblox: false,
  }),

  mounted() {
    //---   Load Saved Radius  ---//
    setInterval(() => { // im sorry I'll fix this later
      this.roblox = localStorage.getItem("roblox") == "true";
    }, 1000);
    
    //---   Load Saved Theme   ---//
    setTimeout(() => { //Set timeout is required to make it load properly... dont ask me why -Front
      const darkTheme = localStorage.getItem('darkTheme');
      if (darkTheme == "true") {
        this.$vuetify.theme.dark = darkTheme;
        
        const isOled = localStorage.getItem('isOled')
        
        if(isOled == "true") {
          this.$vuetify.theme.themes.dark.accent = '#000',
          this.$vuetify.theme.themes.dark.accent2 = '#000',
          this.$vuetify.theme.themes.dark.background = '#000'
        } else {
          this.$vuetify.theme.themes.dark.accent = '#222',
          this.$vuetify.theme.themes.dark.accent2 = '#222',
          this.$vuetify.theme.themes.dark.background = '#333'
        }
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
    // TODO: says localStorage is undefined, idk why 😭
    // roblox () {
    //     return localStorage.getItem("roblox") === null ? false : localStorage.getItem("roblox")
    // },
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
      this.search = false;
    },

    searchBtn() {
      const query = this.text;

      if (this.search === true) {
        this.$router.push(`/search?q=${query}`);
        this.search = false;
      } else {
        this.search = true;
      }
    }

  }
}
</script>
