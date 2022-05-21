<template>
  <div>
    <h4
      class="ml-7 mb-2 background--text"
      :class="$vuetify.theme.dark ? 'text--lighten-3' : 'text--darken-3'"
    >
      Local Playlists
    </h4>
    <playlist-card />
  </div>
</template>

<script>
import playlistCard from "../components/playlistCard.vue";
export default {
  components: { playlistCard },
};
</script>
