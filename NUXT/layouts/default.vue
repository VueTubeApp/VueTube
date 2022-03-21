<template>
  <v-app v-show="stateLoaded" style="background: black !important">
    <topNavigation
      @close-search="search = !search"
      @search-btn="searchBtn"
      @text-changed="textChanged"
      :search="search"
      :page="page"
    />

    <div class="accent" style="height: 100%; margin-top: 4rem">
      <div
        v-show="!search"
        class="background"
        style="
          overflow: hidden;
          height: calc(100vh - 8rem);
          transition-duration: 0.3s;
          transition-property: border-radius;
        "
        :style="{
          borderRadius: `${roundTweak / 2}rem`,
        }"
      >
        <!-- element above removes artifacting from things like v-ripple by -->
        <!-- scrollbox below must be a standalone div -->
        <div class="scroll-y" style="height: 100%">
          <nuxt v-show="!search" />
        </div>
      </div>

      <div
        v-show="search"
        class="accent2"
        style="
          padding: 0;
          overflow: hidden;
          height: calc(100vh - 4rem);
          transition-duration: 0.3s;
          transition-property: border-radius;
        "
      >
        <div class="scroll-y" style="height: 100%">
          <div style="min-width: 180px" v-if="search">
            <v-list-item v-for="(item, index) in response" :key="index">
              <v-icon>mdi-magnify</v-icon>
              <v-btn
                text
                dense
                class="info--text searchButton text-left text-capitalize"
                @click="youtubeSearch(item)"
                v-text="item[0]"
              />
            </v-list-item>
          </div>
        </div>
      </div>
    </div>

    <bottomNavigation v-if="!search" />

    <updateChecker />
  </v-app>
</template>

<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.scroll-y {
  overflow-y: scroll !important; /* has to be scroll, not auto */
  -webkit-overflow-scrolling: touch !important;
}
html,
body {
  background: black;
  overflow: hidden;
}

p,
span,
div {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
</style>

<script>
import { App as CapacitorApp } from "@capacitor/app";
import { mapState } from "vuex";
export default {
  data: () => ({
    search: false,
    response: [],
    stateLoaded: false,
  }),
  beforeCreate() {
    // initializes UI tweaks to the saved state
    this.$store.commit("tweaks/initTweaks");
  },
  mounted() {
    this.stateLoaded = true;
    //---   Back Button Listener   ---//
    CapacitorApp.addListener("backButton", ({ canGoBack }) => {
      //---   Back Closes Search   ---//
      if (this.search) {
        this.search = false;

        //---   Back Goes Back   ---//
      } else if (!canGoBack) {
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
  },
  computed: {
    ...mapState({
      roundTweak: (state) => state.tweaks.roundTweak,
    }),
    page: function () {
      const splitPath = this.$route.path.split("/");
      let pageName = splitPath[splitPath.length - 1];
      pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
      return pageName || "Home";
    },
  },

  methods: {
    textChanged(text) {
      this.$youtube.autoComplete(text, (res) => {
        const data = res.replace(/^.*?\(/, "").replace(/\)$/, ""); //Format Response
        this.response = JSON.parse(data)[1];
      });
    },

    youtubeSearch(item) {
      this.$router.push(`/search?q=${item[0]}`);
      this.search = false;
    },

    searchBtn(text) {
      const query = text;

      if (this.search === true) {
        if (query) {
          this.$router.push(`/search?q=${query}`);
          this.search = false;
        }
      } else {
        this.search = true;
      }
    },
  },
};
</script>
