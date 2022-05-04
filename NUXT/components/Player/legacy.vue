<template>
  <div>
    <video
      ref="player"
      controls
      autoplay
      :src="vidSrc"
      width="100%"
      style="max-height: 50vh; display: block"
      @webkitfullscreenchange="handleFullscreenChange"
    />
    <!-- <v-slider v-model="value" step="0"></v-slider> -->
  </div>
</template>

<script>
export default {
  props: ["vidSrc"],
  methods: {
    handleFullscreenChange() {
      if (document.fullscreenElement === this.$refs.player) {
        this.$vuetube.statusBar.hide();
        this.$vuetube.navigationBar.hide();
      } else {
        this.$vuetube.statusBar.show();
        this.$vuetube.navigationBar.show();
      }
    },

    getPlayer() {
      return this.$refs.player;
    },
  },
};
</script>
