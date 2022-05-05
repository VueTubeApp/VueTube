<template>
  <div class="controls" @click="toggleControls()">
    <div class="controlsWrap" ref="controlsWrap">

      <div  class="centerVideoControls">
        <v-btn @click="togglePlaying()" text style="height: 5em; width: 5em;">
          <v-icon size="5em" v-text="playing ? 'mdi-pause' : 'mdi-play' " ref="pausePlayIndicator" />
        </v-btn>
      </div>

      <div class="bottomVideoControls">
        {{ watched }} <span style="color: #999;">/ {{ $vuetube.humanTime(video.duration) }}</span>
      </div>

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

<script>
  export default {
    props: ["video"],

    data() {
      return {
        playing: true,
        controls: true,

        watched: 0,
      }
    },

    mounted() {
      this.video.ontimeupdate = () => {
        console.log(this.video.currentTime)
        this.watched = this.$vuetube.humanTime(this.video.currentTime);
      };
    },

    methods: {
      togglePlaying() {
        if (this.video.paused) {
          this.video.play()
          this.playing = true;
        } else {
          this.video.pause()
          this.playing = false;
        };
        this.toggleControls(); // Prevent Screen From Closing
      },

      toggleControls() {
        const setControls = this.controls ? 'none' : 'block';
        this.$refs.controlsWrap.style.display = setControls;
        this.controls = !this.controls;
      }

    }
  }

</script>
