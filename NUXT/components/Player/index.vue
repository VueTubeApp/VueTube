<template>
  <div style="position: relative;">
    <video
      ref="player"
      autoplay
      :src="vidSrc"
      width="100%"
      style="max-height: 50vh; display: block"
      @webkitfullscreenchange="handleFullscreenChange"
    />
    <seekbar :video=$refs.player v-if="$refs.player" />



    <!--   Video Controls   -->
    <div class="videoControls" v-if="$refs.player">
      <div class="videoControlsWrap">


        <controls :video=$refs.player />


      </div>
    </div>
    <!--   End Video Controls   -->


    <!-- <v-slider v-model="value" step="0"></v-slider> -->
  </div>
</template>

<style scoped>
.videoControls {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.videoControlsWrap {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

<script>
import seekbar from '~/components/Player/seekbar.vue';
import controls from '~/components/Player/controls.vue';

export default {
  props: ["sources"],
  components: {
    seekbar,
    controls
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
