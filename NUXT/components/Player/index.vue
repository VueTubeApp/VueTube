<template>
  <!-- // TODO: down: () => minimize, -->
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
      :height="isFullscreen ? '100%' : 'auto'"
      :src="vidSrc"
      style="transition: filter 0.15s ease-in-out"
      :class="controls || seeking ? 'dim' : ''"
      :style="contain ? 'object-fit: contain;' : 'object-fit: cover;'"
    />

    <div
      v-if="isFullscreen && controls"
      style="
        position: absolute;
        width: calc(100% - 12rem);
        left: 3rem;
        top: 0.5rem;
      "
    >
      <h4>{{ video.title }}</h4>
      <div style="color: #aaa; font-size: 0.75rem">{{ video.channelName }}</div>
    </div>

    <!-- // TODO: merge the bottom 2 into 1 reusable component -->
    <v-btn
      text
      tile
      style="
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
      "
      @dblclick.stop="$refs.player.currentTime -= $refs.player.duration / 10"
    >
      <v-icon>mdi-rewind</v-icon>
    </v-btn>

    <v-btn
      text
      tile
      style="
        opacity: 0;
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
      "
      @dblclick.stop="$refs.player.currentTime += $refs.player.duration / 10"
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

      <v-btn
        fab
        text
        small
        style="
          position: absolute;
          top: calc(50% - 1.25rem);
          left: calc(50% - 9.5rem);
        "
        color="white"
        @click.stop="$refs.player.currentTime -= 5"
      >
        <v-icon size="1rem">mdi-rewind-5</v-icon>
      </v-btn>
      <v-btn
        fab
        text
        style="
          position: absolute;
          top: calc(50% - 1.75rem);
          left: calc(50% - 6rem);
        "
        color="white"
        disabled
        @click.stop=""
      >
        <v-icon size="2rem">mdi-skip-previous</v-icon>
      </v-btn>
      <playpause
        v-if="$refs.player"
        :video="$refs.player"
        @close="controls = false"
      />
      <v-btn
        fab
        text
        style="
          position: absolute;
          top: calc(50% - 1.75rem);
          left: calc(50% + 3rem);
        "
        color="white"
        disabled
        @click.stop=""
      >
        <v-icon size="2rem">mdi-skip-next</v-icon>
      </v-btn>
      <v-btn
        fab
        text
        small
        style="
          position: absolute;
          top: calc(50% - 1.25rem);
          left: calc(50% + 7rem);
        "
        color="white"
        @click.stop="$refs.player.currentTime += 5"
      >
        <v-icon size="1rem">mdi-fast-forward-5</v-icon>
      </v-btn>

      <watchtime v-if="$refs.player" :video="$refs.player" />
      <!-- // TODO: merge the bottom 2 into 1 reusable component -->
      <quality v-if="$refs.player" :video="$refs.player" :sources="sources" />
      <speed v-if="$refs.player" :video="$refs.player" />
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
      :controls="controls"
      @seeking="seeking = !seeking"
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
    video: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFullscreen: false,
      controls: false,
      seeking: false,
      contain: true,
      vidSrc: "",
    };
  },
  mounted() {
    console.log("sources", this.sources);
    this.vidSrc = this.sources[this.sources.length - 1].url;
    // TODO: detect orientation change and enter fullscreen
    // TODO: detect video loading state and send this.loading to play button :loading = loading
  },
  beforeDestroy() {
    if (this.isFullscreen) this.exitFullscreen();
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
.invisible {
  opacity: 0;
}
</style>
