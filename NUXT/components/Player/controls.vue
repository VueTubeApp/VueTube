<template>
  <div>


    <v-btn class="centerVideoControls" @click="togglePlaying()" text>
      <v-icon x-large v-text="playing ? 'mdi-pause' : 'mdi-play' " ref="pausePlayIndicator" />
    </v-btn>


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
