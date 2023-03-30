<template>
  <div>
    <h4
      class="ml-7 mb-2 background--text"
      :class="$vuetify.theme.dark ? 'text--lighten-3' : 'text--darken-3'"
    >
      Local Playlists
    </h4>
    <playlist-card />
    <v-btn
      text
      class="entry text-left setting-btn no-spacing"
      to="/history"
      nuxt
      :style="{
        borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
        paddingLeft:
          $store.state.tweaks.roundTweak > 0 ? '' : '1.5rem !important',
      }"
    >
      <v-icon
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
        }"
        class=".icon"
        >mdi-history</v-icon
      >
      History
    </v-btn>
  </div>
</template>

<script>
import playlistCard from "../components/playlistCard.vue";
export default {
  components: { playlistCard },
};
</script>

<style scoped>
.setting-btn {
  /* overrides Vuetify defaults (all caps) */
  text-transform: none !important;
}
.setting-btn:first-letter {
  /* Capitalizes first-letter only */
  text-transform: uppercase !important;
}
.entry {
  width: 100%;
  font-size: 1.2em;
  justify-content: left !important;
  padding: 1.5em 0.5em 1.5em 0.5em !important;
}
.icon {
  margin-right: 0.5em;
}
</style>
