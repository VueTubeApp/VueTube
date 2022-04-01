<template>
  <div>
    <div @click="toggleControls()" class="content" :style="showControls ? 'background: rgba(0, 0, 0, 0.5);' : '' ">

      <div v-show="showControls">
        <v-btn class="pausePlay" text @click="playing = !playing">
          <v-icon size="5em" color="white">mdi-{{ playing ? "pause" : "play" }}</v-icon>
        </v-btn>

        <scrubber class="scrubber" :duration="duration" :endDuration="endDuration" />
      </div>

      <video
        ref="player"
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
import scrubber from "./scrubber.vue";

export default {
  components: {
    scrubber,
  },
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
      showControls: false,
      playing: false,
      duration: 0,
      endDuration: 0,
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

    updateTiming() {
      const player = this.$refs.player;
      if (player == undefined) return;
      this.duration = player.currentTime;
      this.endDuration = player.duration;
    },

    toggleControls() {
      this.showControls = !this.showControls;
    }

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
  height: 5em !important;
  width: 5em !important;
}
.scrubber {
  position: absolute;
  bottom: 0;
}


</style>
