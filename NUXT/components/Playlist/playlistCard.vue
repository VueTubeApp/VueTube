<template>
  <v-btn
    v-ripple
    text
    class="background d-flex flex-row overflow-hidden mb-4 mx-7 mainCard px-0"
    to="/playlist"
    style="height: 6rem !important"
    :class="
      $store.state.tweaks.roundThumb && $store.state.tweaks.roundTweak > 0
        ? $vuetify.theme.dark
          ? 'lighten-1'
          : 'darken-1'
        : ''
    "
    :style="{
      borderRadius: $store.state.tweaks.roundThumb
        ? `${$store.state.tweaks.roundTweak / 3}rem`
        : '0',
    }"
    @click.native="clickHandler"
  >
    <v-img
      contain
      :src="thumbnail"
      class="background"
      style="position: relative; max-width: 8rem !important"
      :class="$vuetify.theme.dark ? 'lighten-3' : 'darken-3'"
      :style="{
        borderRadius: $store.state.tweaks.roundThumb
          ? `${$store.state.tweaks.roundTweak / 3}rem`
          : '0',
      }"
    >
      <div
        class="d-flex flex-column justify-center align-center background-opaque"
        style="position: absolute; top: 0; right: 0; width: 50%; height: 100%"
      >
        <div>{{ playlist.videos.length }}</div>
        <v-icon>mdi-playlist-play</v-icon>
      </div>
    </v-img>
    <div v-emoji class="pa-4 text-left" style="font-size: 0.75rem !important">
      <b>{{ playlist.name }}</b>

      <div
        class="background--text caption mt-2"
        :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
      >
        Bottom Text <br />
        {{ playlist.videos.length }} videos
      </div>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex flex-column">
      <!-- <v-btn
        text
        tile
        elevation="0"
        class="flex-grow-1"
        style="width: 2rem !important"
      >
        <v-icon>mdi-share-outline</v-icon>
      </v-btn>
      <v-btn
        text
        tile
        elevation="0"
        class="flex-grow-1"
        style="width: 2rem !important"
      >
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn> -->
    </div>
  </v-btn>
</template>

<script>
export default {
  props: {
    playlist: { type: Object, required: true },
  },
  computed: {
    thumbnail() {
      try {
        const videoId =
          this.playlist.videos.length === 0 ? "" : this.playlist.videos[0].id;
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      } catch (e) {
        alert(e.message);
        return `https://img.youtube.com/vi//hqdefault.jpg`;
      }
    },
  },
  methods: {
    clickHandler() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.mainCard {
  text-transform: none !important;
  letter-spacing: normal !important;
}
</style>
