<template>
  <div>
    <div class="content">
      <v-btn class="pausePlay" text @click="playing = !playing">
        <v-icon size="5em" color="white">mdi-{{ playing ? "pause" : "play" }}</v-icon>
      </v-btn>

      <div class="seekBar">
        <v-slider
          dense
          hide-details
          min="0"
          :max="videoEnd"
          :value="currentTime"
          @change="scrubTo()"
        />
      </div>

      <video
        ref="player"
        autoplay
        :src="vidSrc"
        width="100%"
        style="max-height: 50vh"
        @webkitfullscreenchange="handleFullscreenChange"
      />
    </div>

    <div v-for="(source, index) in sources" :key="index">
      {{ source.qualityLabel }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sources: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      //---   Basic Information   ---//
      playerVersion: 0.1,
      vidSrc: null,

      //---   Player State Information   ---//
      playing: true,
      currentTime: 0,
      videoEnd: 0,
    };
  },

  watch: {
    playing() {
      this.playing ? this.$refs.player.play() : this.$refs.player.pause();
    },
  },

  mounted() {
    const src = this.sources[this.sources.length - 1].url;
    this.vidSrc = src;

    setInterval(this.updateTiming, 100);
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

    scrubTo() {
      const player = this.$refs.player;
      player.currentTime = 0;
      console.log(val, this.currentTime, player.currentTime);
    },

    updateTiming() {
      const player = this.$refs.player;
      if (player == undefined) return;
      this.videoEnd = player.duration;
      this.currentTime = player.currentTime;
      console.log(player.currentTime, this.currentTime);
    },
  },
};
</script>

<style scoped>
/***   Overlay Information   ***/
.content {
  position: relative;
  width: 500px;
  margin: 0 auto;
}
.content video {
  width: 100%;
  display: block;
}
.content:before {
  content: "";
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/***   General Overlay Styling   ***/
.pausePlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.seekBar {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
