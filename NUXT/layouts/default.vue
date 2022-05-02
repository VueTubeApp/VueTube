<template>
  <v-app style="background: transparent !important">
    <topNavigation
      :search="search"
      :page="page"
      @close-search="search = !search"
      @search-btn="searchBtn"
      @text-changed="textChanged"
      @scroll-to-top="$refs.pgscroll.scrollTop = 0"
    />

    <div style="height: 100%; margin-top: 4rem">
      <div
        v-show="!search"
        class="scrollcontainer"
        style="overflow: hidden; height: calc(100vh - 8rem)"
      >
        <!-- element above removes artifacting from things like v-ripple by -->
        <!-- scrollbox below must be a standalone div -->
        <div ref="pgscroll" class="scroll-y" style="height: 100%">
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
            <v-list-item
              v-for="(item, index) in response"
              :key="index"
              class="px-0"
            >
              <v-btn
                text
                tile
                dense
                class="searchButton text-left text-none"
                @click="youtubeSearch(item)"
                v-emoji
              >
                <v-icon class="mr-5">mdi-magnify</v-icon>
                {{ item[0] || item.text }}
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

export default {
  data: () => ({
    search: false,
    response: [],
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
    this.$vuetube.resetBackActions();
    //---   Back Button Listener   ---//
    this.backHandler = CapacitorApp.addListener(
      "backButton",
      this.$vuetube.back
    );

    this.$vuetube.addBackAction(() => {
      this.search = false;
    }, this.search);

    // ---   External URL Handling   --- //
    CapacitorApp.addListener("appUrlOpen", (event) => {
      this.$logger("ExternalURL", event.url);
      // We only push to the route if there is a url present
      linkParser(event.url);
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

      //---   User Pastes Link, Direct Them To Video   ---//
      const isLink = linkParser(text);
      if (isLink) {
        this.response = [
          {
            text: `Watch Video from ID: ${isLink.searchParams.get("v")}`,
            id: isLink.searchParams.get("v"),
          },
        ];
        return;
      }
      //---   End User Pastes Link, Direct Them To Video   ---//

      //---   Auto Suggest   ---//
      this.$youtube.autoComplete(text, (res) => {
        const data = res.replace(/^.*?\(/, "").replace(/\)$/, ""); //Format Response
        this.response = JSON.parse(data)[1];
      });
    },

    youtubeSearch(item) {
      const link = item.id ? `/watch?v=${item.id}` : `/search?q=${item[0]}`;
      this.$router.push(link);
      this.search = false;
    },

    searchBtn(text) {
      const query = text;

      this.$logger(
        constants.LOGGER_NAMES.search,
        "Query: " + query + " this.search: " + this.search
      );

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

<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
*:focus::before {
  opacity: 0 !important;
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
  /* overflow-x: hidden; */
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
</style>

<style scoped>
.searchButton {
  width: 100%;
  justify-content: left !important;
}
</style>
