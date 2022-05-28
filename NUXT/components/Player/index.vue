<template>
  <div
    ref="vidcontainer"
    v-touch="{
      down: () => ($refs.player.styles.width = '50% !important'),
      up: () => ($refs.player.styles['object-fit'] = 'contain !important'),
    }"
    class="d-flex flex-column"
    style="position: relative"
    :style="{
      borderRadius: $store.state.tweaks.roundWatch
        ? `${$store.state.tweaks.roundTweak / 3}rem`
        : '0',
    }"
    @click="controls = !controls"
  >
    <video
      ref="player"
      autoplay
      width="100%"
      :src="vidSrc"
      style="transition: filter 0.15s ease-in-out; max-height: 100vh"
      :style="
        controls
          ? 'filter: brightness(50%); object-fit: contain'
          : 'filter: none; object-fit: cover'
      "
    />
    <!-- @webkitfullscreenchange="handleFullscreenChange" -->

    <v-btn
      text
      tile
      style="
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        opacity: 0;
      "
      @dbclick.stop="$refs.player.currentTime -= $refs.player.duration / 10"
    >
      <v-icon>mdi-rewind</v-icon>
    </v-btn>

    <v-btn
      text
      tile
      style="
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        opacity: 0;
      "
      @dbclick.stop="$refs.player.currentTime += $refs.player.duration / 10"
    >
      <v-icon>mdi-fast-forward</v-icon>
    </v-btn>

    <div
      style="transition: opacity 0.15s ease-in-out"
      :style="controls ? 'opacity: 1;' : 'opacity: 0; pointer-events: none'"
    >
      <v-btn fab text style="position: absolute; top: 0; left: 0">
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
      <loop />
      <captions />
      <v-btn fab text style="position: absolute; top: 0; right: 0">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <playpause
        v-if="$refs.player"
        :video="$refs.player"
        @close="controls = false"
      />

      <watchtime v-if="$refs.player" :video="$refs.player" />
      <quality />
      <speed />
      <fullscreen
        :fullscreen="isFullscreen"
        @fullscreen="(controls = $refs.player.paused), handleFullscreenChange()"
      />
    </div>
    <seekbar v-if="$refs.player" :sources="sources" :video="$refs.player" />
  </div>
</template>

<script>
import loop from "~/components/Player/loop.vue";
import speed from "~/components/Player/speed.vue";
import seekbar from "~/components/Player/seekbar.vue";
import quality from "~/components/Player/quality.vue";
import captions from "~/components/Player/captions.vue";
import playpause from "~/components/Player/playpause.vue";
import watchtime from "~/components/Player/watchtime.vue";
import fullscreen from "~/components/Player/fullscreen.vue";
export default {
  components: {
    fullscreen,
    watchtime,
    playpause,
    captions,
    quality,
    seekbar,
    speed,
    loop,
  },
  props: {
    sources: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isFullscreen: false,
      controls: false,
      vidSrc: "",
    };
  },
  mounted() {
    console.log("sources", this.sources);
    this.vidSrc = this.sources[this.sources.length - 1].url;
  },
  methods: {
    handleFullscreenChange() {
      console.log(this.$refs.player);
      console.log(document.fullscreenElement);
      if (document?.fullscreenElement === this.$refs.vidcontainer) {
        // const cancellFullScreen =
        //   document.exitFullscreen ||
        //   document.mozCancelFullScreen ||
        //   document.webkitExitFullscreen ||
        //   document.msExitFullscreen;
        // cancellFullScreen.call(document);
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
        this.isFullscreen = false;
        this.$vuetube.statusBar.show();
        this.$vuetube.navigationBar.show();
      } else {
        // const element = document;
        // const requestFullScreen =
        //   element.requestFullscreen ||
        //   element.webkitRequestFullScreen ||
        //   element.mozRequestFullScreen ||
        //   element.msRequestFullScreen;
        // requestFullScreen.call(element);
        this.$refs.vidcontainer.requestFullscreen({
          requireOrientation: "landscape",
        });
        this.isFullscreen = true;
        this.$vuetube.statusBar.hide();
        this.$vuetube.navigationBar.hide();
      }
      // screen.orientation
      //   .lock("landscape")
      //   .then(function () {
      //     console.log("Locked");
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });
    },
    getPlayer() {
      return this.$refs.player;
    },
  },
};
</script>
