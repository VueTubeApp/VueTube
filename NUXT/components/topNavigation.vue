<template>
  <v-card style="display: flex" class="rounded-0 pa-3 topNav background">
    <!-- opacity with vue 😉 -->
    <!-- :style="{ background: $vuetify.theme.currentTheme.primary + '55' }" -->
    <h3
      v-show="!search"
      class="my-auto ml-4"
      v-text="
        $route.path.includes('channel') ? $store.state.channel.title : page
      "
    />

    <v-btn
      v-if="search"
      icon
      class="mr-3 my-auto"
      @click="$emit('close-search')"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-text-field
      v-if="search"
      v-model="text"
      solo
      dense
      flat
      autofocus
      label="Search"
      style="margin-top: 7px"
      :background-color="
        $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
      "
      @input="$emit('text-changed', text)"
      @keyup.enter="$emit('search-btn', text)"
    />

    <v-spacer v-if="!search" />

    <v-btn
      v-if="!search && $route.path.includes('/home')"
      v-show="page == 'Home'"
      icon
      tile
      class="ml-3 mr-1 my-auto fill-height"
      style="border-radius: 0.25rem !important"
      @click="refreshRecommendations"
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-btn
      v-if="$route.name !== 'settings' && !$route.path.includes('/mods')"
      icon
      tile
      :loading="$store.state.search.loading"
      class="ml-3 my-auto fill-height"
      style="border-radius: 0.25rem !important"
      @click="$emit('search-btn', text)"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn
      v-show="!search"
      icon
      tile
      class="ml-4 mr-2 my-auto fill-height rounded-xl"
      :style="$route.name == 'settings' ? 'transform: rotate(180deg)' : ''"
      @click="
        $route.name == 'settings' ? closeSettings() : $router.push('/settings')
      "
    >
      <v-icon>{{
        $route.name == "settings"
          ? "mdi-close"
          : $route.name.includes("mods")
          ? "mdi-arrow-left"
          : "mdi-cog-outline"
      }}</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    search: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      default: "Home",
    },
  },
  events: ["searchBtn", "textChanged", "closeSearch", "scrollToTop"],
  data: () => ({
    text: "",
    presettings: false,
  }),
  watch: {
    $route(next, prev) {
      if (this.$route.path == "/settings" && !prev.name.includes("mods")) {
        this.presettings = prev.path;
      }
      if (this.$route.path == "/search") {
        this.text = this.$route.query.q;
      }
    },
  },
  methods: {
    closeSettings() {
      this.presettings
        ? this.$router.push(this.presettings)
        : this.$router.go(-1);
      this.presettings = false;
    },
    refreshRecommendations() {
      this.$emit("scroll-to-top");

      const continuations =
        this.$store.state.recommendedVideos[
          this.$store.state.recommendedVideos.length - 1
        ].continuations;
      this.$store.commit("updateRecommendedVideos", []);
      this.$youtube
        .recommendContinuation(
          continuations.find((element) => element.reloadContinuationData)
            .reloadContinuationData.continuation,
          "browse"
        )
        .then((result) => {
          console.log(result);
          if (result) this.$store.commit("updateRecommendedVideos", [result]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.topNav {
  /* opacity with hex, wow 😉 */
  /* background: linear-gradient(var(--v-background-base) -1000%, #00000000 1000%); */
  /* box-shadow: inset 0 0 5rem var(--v-background-base) !important; */
  height: calc(4rem + env(safe-area-inset-top)) !important;
  padding-top: env(safe-area-inset-top) !important;
  box-shadow: none !important;
  position: fixed;
  width: 100%;
  top: 0;
}

.topNavSearch {
  margin-bottom: -10em;
  margin-left: 2em;
}
</style>
