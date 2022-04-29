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
    <seekbar :video=$refs.player v-if="$refs.player" />
    <!-- <v-slider v-model="value" step="0"></v-slider> -->
    {{ vidSrc }}
  </div>
</template>

<script>
import seekbar from '~/components/Player/seekbar.vue';

export default {
  props: ["sources"],
  components: {
    seekbar
  },
  data() {
    return {
      vidSrc: "",
    };
  },
  mounted() {
    this.vidSrc = this.sources[this.sources.length-1].url;
  },
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
