<template>
  <v-app style="background: transparent !important">
    <topNavigation
      :search="search"
      :page="page"
      style="z-index: 696969"
      @search-btn="searchBtn"
      @text-changed="textChanged"
      @close-search="search = !search"
      @scroll-to-top="$refs.pgscroll.scrollTop = 0"
    />

    <!-- channel-tabs -->
    <v-tabs
      v-if="$route.path.includes('/channel') && !search"
      mobile-breakpoint="0"
      style="
        position: fixed;
        top: calc(4rem + env(safe-area-inset-top));
        z-index: 696969;
      "
      background-color="background"
      :color="$vuetify.theme.dark ? 'white' : 'black'"
    >
      <v-tab
        v-for="tab in channelTabs"
        :key="tab.name"
        :to="tab.to"
        exact
        :v-ripple="false"
      >
        {{ tab.name }}
      </v-tab>
    </v-tabs>

    <div
      style="
        height: 100%;
        padding-bottom: calc(4rem + env(safe-area-inset-bottom));
      "
      :style="{
        paddingTop:
          $route.path.includes('/channel') && !search
            ? 'calc(7rem + env(safe-area-inset-top))'
            : 'calc(4rem + env(safe-area-inset-top))',
      }"
    >
      <div v-show="!search">
        <!-- class="scrollcontainer" -->
        <!-- style="overflow: hidden; height: calc(100vh - 8rem)" -->
        <!-- element above removes artifacting from things like v-ripple by -->
        <!-- scrollbox below must be a standalone div -->
        <div ref="pgscroll" style="height: 100%">
          <nuxt />
        </div>
      </div>

      <div
        v-show="search"
        class="scrollcontainer"
        style="overflow: hidden; height: calc(100vh - 4rem)"
      >
        <div class="scroll-y" style="height: 100%">
          <div v-if="search" style="min-width: 180px">
            <v-list-item v-for="item in response" :key="item[0]" class="px-0">
              <v-btn
                v-emoji
                text
                tile
                dense
                class="searchButton text-left text-none no-spacing"
                @click="youtubeSearch(item)"
              >
                <v-icon class="mr-5">mdi-magnify</v-icon>
                {{ item[0] }}
              </v-btn>
            </v-list-item>
          </div>
        </div>
      </div>
    </div>

    <bottomNavigation v-if="!search" />

    <updateChecker />
  </v-app>
</template>

<script>
import { App as CapacitorApp } from "@capacitor/app";
import { mapState } from "vuex";
import constants from "~/plugins/constants";
import { linkParser } from "~/plugins/utils";
import backType from "~/plugins/classes/backType";

export default {
  data: () => ({
    search: false,
    response: [],
    channelTabs: [
      { name: "Home", to: "/channel" },
      { name: "Videos", to: "/channel/videos" },
      { name: "Playlists", to: "/channel/playlists" },
      { name: "Community", to: "/channel/community" },
      { name: "Channels", to: "/channel/channels" },
      { name: "About", to: "/channel/about" },
    ],
  }),

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

  watch: {
    // Watch for any changes in the route string
    // When change is detected, scroll main div back to the top
    $route() {
      this.$refs.pgscroll.scrollTop = 0; // scroll back to top when moving to new route
      // Exit fullscreen if currently in fullscreen
      this.$vuetube.statusBar.show();
      this.$vuetube.navigationBar.show();
    },
  },

  mounted() {
    if (!process.browser) this.$vuetube.resetBackActions();

    // ---   External URL Handling   --- //
    CapacitorApp.addListener("appUrlOpen", (event) => {
      // We only push to the route if there is a url present
      const result = linkParser(event.url);
      if (result) this.$router.push(result.pathname + result.search);
    });

    // ---   Import Twemoji   ---///
    const plugin = document.createElement("script");
    plugin.setAttribute("src", "//twemoji.maxcdn.com/v/latest/twemoji.min.js");
    plugin.setAttribute("crossorigin", "anonymous");
    document.head.appendChild(plugin);
  },

  beforeDestroy() {
    if (this.backHandler) this.backHandler.remove();
  },

  methods: {
    textChanged(text) {
      if (text.length <= 0) {
        this.response = [];
        return;
      } // No text found, no point in calling API

      const isLink = linkParser(text);
      if (!isLink) {
        //---   Auto Suggest   ---//
        this.$youtube.autoComplete(text, (res) => {
          const data = res.replace(/^.*?\(/, "").replace(/\)$/, ""); //Format Response
          this.response = JSON.parse(data)[1];
          console.log(this.response);
        });
      } else {
        //---   User Pastes Link, Direct Them To Video   ---//
        this.response = [
          [
            `Watch Video from ID: ${isLink.searchParams.get("v")}`,
            { id: isLink.searchParams.get("v") },
          ],
        ];
        console.log("this.response: ", this.response);
        return;
        //---   End User Pastes Link, Direct Them To Video   ---//
      }
    },

    youtubeSearch(item) {
      const link = item[1].id
        ? `/watch?v=${item[1].id}` // link pasted
        : `/search?q=${item[0]}`; // regular suggestion
      this.$router.push(link);
      this.search = false;
    },

    searchBtn(text) {
      const query = text;

      if (this.search === true) {
        if (query) {
          this.$store.commit("search/setLoading", true);
          this.$router.push(`/search?q=${query}`);
          this.search = false;
        }
      } else {
        this.search = true;

        // Adds to the back stack
        const closeSearch = new backType(
          () => {
            this.search = false;
          },
          () => {
            return this.search;
          }
        );
        this.$vuetube.addBackAction(closeSearch);
      }
    },
  },
};
</script>

<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
*:focus::before {
  opacity: 0 !important;
}
.v-slide-group__prev {
  display: none !important;
}
.v-slide-group__next {
  display: none !important;
}
.v-input--selection-controls__input {
  margin-right: 0 !important;
}
.v-input__slot {
  margin: 0 !important;
}
.v-slider {
  margin: 0 !important;
}

.container-max-height {
  min-height: calc(
    100vh - 8rem - env(safe-area-inset-top) - env(safe-area-inset-bottom)
  ) !important;
}
.background-opaque {
  background: linear-gradient(var(--v-background-base) -1000%, #00000000 1000%);
}
.border-primary {
  border: 2px solid var(--v-primary-base) !important;
}
.glassy {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
.transparent-lighten-1 {
  background: #ffffff22;
}
.transparent-darken-1 {
  background: #00000022;
}
.debug {
  outline: 1px solid red;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute !important;
  width: 100%;
}

.scrollcontainer {
  overflow: hidden;
  /* ios notch & gesture nav */
  padding: env(safe-area-inset-top) env(safe-area-inset-right)
    env(safe-area-inset-bottom) env(safe-area-inset-left) !important;
}

.scroll-y {
  overflow-y: scroll !important;
  /* has to be scroll, not auto */
  overflow-x: hidden !important;
  -webkit-overflow-scrolling: touch !important;
}
html,
body {
  background: var(--v-background-base);
  -webkit-overflow-scrolling: touch !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
}

p,
span,
div {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.invert {
  filter: invert(100%);
}

.emoji {
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: -0.1em;
  margin: 0 2px;
}

.min-height-0 {
  min-height: 0 !important;
}

.fill-width {
  width: 100% !important;
}

.container {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.no-spacing {
  letter-spacing: 0px !important;
}
</style>

<style scoped>
.searchButton {
  width: 100%;
  justify-content: left !important;
}
</style>
