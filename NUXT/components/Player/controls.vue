<template>
  <div class="controls" @click="toggleControls()">
    <div ref="controlsWrap" class="controlsWrap">
      <div class="centerVideoControls">
        <v-btn
          text
          style="height: 5em; width: 5em"
          color="white"
          @click="togglePlaying()"
        >
          <v-icon
            ref="pausePlayIndicator"
            size="5rem"
            v-text="playing ? 'mdi-pause' : 'mdi-play'"
          />
        </v-btn>
      </div>

      <div class="bottomVideoControls white--text">
        <div class="pl-4">
          {{ watched }}
          <span style="color: #999">
            / {{ $vuetube.humanTime(video.duration) }}
          </span>
        </div>
        <!-- <v-slider
          id="slider"
          v-model="video.currentTime"
          :max="video.duration"
          style="margin-bottom: -2rem !important"
        /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["video"],

  data() {
    return {
      playing: true,
      controls: true,

      watched: 0,
    };
  },

  mounted() {
    console.log("videovideovideo");
    console.log(this.video);
    this.video.ontimeupdate = () => {
      console.log(this.video.currentTime);
      this.watched = this.$vuetube.humanTime(this.video.currentTime);
    };
  },

  methods: {
    togglePlaying() {
      if (this.video.paused) {
        this.video.play();
        this.playing = true;
      } else {
        this.video.pause();
        this.playing = false;
      }
      this.toggleControls(); // Prevent Screen From Closing
    },

    toggleControls() {
      const setControls = this.controls ? "none" : "block";
      this.$refs.controlsWrap.style.display = setControls;
      this.controls = !this.controls;
    },
  },
};
</script>

<style scoped>
#slider * {
  padding: 0 !important;
  margin: 0 !important;
}
.centerVideoControls {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bottomVideoControls {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.pausePlay {
  min-height: 5em;
  min-width: 5em;
}

.controls {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}

.controlsWrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
