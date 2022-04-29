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
    <v-progress-linear
      active
      background-color="primary"
      background-opacity="0.5"
      :buffer-value="buffered"
      color="primary"
      height="3"
      query
      :value="percentage"
    />
    <!-- <v-slider v-model="value" step="0"></v-slider> -->
    {{ vidSrc }}
  </div>
</template>

<script>
export default {
  props: ["sources"],
  data() {
    return {
      vidSrc: "",

      percentage: 0,
      buffered: 0,
    };
  },
  mounted() {
    this.vidSrc = this.sources[this.sources.length-1].url;

    let vid = this.$refs.player;
    vid.ontimeupdate = () => {
      this.percentage = (vid.currentTime / vid.duration) * 100;
    };
    vid.addEventListener("progress", () => {
      this.buffered = (vid.buffered.end(0) / vid.duration) * 100;
    });
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
