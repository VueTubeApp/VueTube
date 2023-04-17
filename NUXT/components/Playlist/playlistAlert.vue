<template>
  <v-dialog v-if="dialog" width="500">
    <v-card
      class="rounded-lg"
      :class="
        $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
      "
    >
      <v-card-title class="text-h5">Save To Playlist</v-card-title>
      <v-checkbox
        v-for="(playlist, index) in playlist"
        :key="index"
        :v-model="
          !(
            playlist.videos.findIndex(
              (playlistVideo) => playlistVideo.id !== currentVideo.id
            ) === -1
          )
        "
        :label="playlist.name"
      />
      <v-divider />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="$emit('close')"> Done </v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>

<script>
export default {
  props: { dialog: Boolean, currentVideo: { type: Object, required: true } },
  computed: {
    playlists() {
      return this.$store.state.playlist.playlists;
    },
  },
  methods: {},
};
</script>
