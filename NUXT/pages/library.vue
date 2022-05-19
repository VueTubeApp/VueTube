<template>
  <div>
    <h4 class="ml-7 mb-2">Local Playlists</h4>
    <playlist-card />
  </div>
</template>

<script>
import playlistCard from "../components/playlistCard.vue";
export default {
  components: { playlistCard },
};
</script>
