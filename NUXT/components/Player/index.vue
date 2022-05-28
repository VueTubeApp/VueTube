<template>
  <!-- TODO: down: () => minimize, -->
  <div
    ref="vidcontainer"
    v-touch="{
      up: () => (contain = false),
      down: () => (contain = true),
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
      :class="controls ? 'dim' : ''"
      :style="contain ? 'object-fit: contain;' : 'object-fit: cover;'"
    />
    <!-- TODO: controls || seeking, take seeking out of <seekbar> component -->

    <v-btn
      v-if="controls"
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
      v-if="controls"
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
      <minimize />
      <loop />
      <captions />
      <close />

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
    <!-- NOTE: breaks in fullscreen -->
    <seekbar
      v-if="$refs.player"
      v-show="!isFullscreen || controls"
      :fullscreen="isFullscreen"
      :video="$refs.player"
      :sources="sources"
    />
  </div>
</template>

<script>
import loop from "~/components/Player/loop.vue";
import close from "~/components/Player/close.vue";
import speed from "~/components/Player/speed.vue";
import seekbar from "~/components/Player/seekbar.vue";
import quality from "~/components/Player/quality.vue";
import minimize from "~/components/Player/minimize.vue";
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
    minimize,
    quality,
    seekbar,
    speed,
    close,
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
      contain: true,
      vidSrc: "",
    };
  },
  mounted() {
    console.log("sources", this.sources);
    this.vidSrc = this.sources[this.sources.length - 1].url;
  },
  beforeDestroy() {
    this.exitFullscreen();
  },
  methods: {
    handleFullscreenChange() {
      if (document?.fullscreenElement === this.$refs.vidcontainer) {
        this.exitFullscreen();
      } else {
        this.openFullscreen();
      }
    },
    exitFullscreen() {
      const cancellFullScreen =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;
      cancellFullScreen.call(document);
      screen.orientation.lock("portrait");
      screen.orientation.unlock();
      this.$vuetube.navigationBar.show();
      this.$vuetube.statusBar.show();
      this.isFullscreen = false;
    },
    openFullscreen() {
      const element = this.$refs.vidcontainer;
      const requestFullScreen =
        element.requestFullscreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullScreen;
      requestFullScreen.call(element);
      screen.orientation.lock("landscape");
      this.$vuetube.navigationBar.hide();
      this.$vuetube.statusBar.hide();
      this.isFullscreen = true;
    },
    getPlayer() {
      return this.$refs.player;
    },
  },
};
</script>

<style>
.dim {
  filter: brightness(50%);
}
</style>
