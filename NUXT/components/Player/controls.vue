<template>
  <div class="videoControls">
    <div class="videoControlsWrap">


      <v-btn class="centerVideoControls" @click="togglePlaying()" text>
        <v-icon x-large v-text="playing ? 'mdi-pause' : 'mdi-play' " ref="pausePlayIndicator" />
      </v-btn>

    </div>

  </div>
</template>

<style scoped>
  .centerVideoControls {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .pausePlay {
    min-height: 5em;
    min-width: 5em;
  }

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
    background: rgba(0, 0, 0, 0.5);
  }
</style>

<script>
  export default {
    props: ["video"],

    data() {
      return {
        playing: true,
      }
    },

    methods: {
      togglePlaying() {
        if (this.video.paused) {
          this.video.play()
          this.playing = true;
        } else {
          this.video.pause()
          this.playing = false;
        }

      }
    }
  }

</script>
