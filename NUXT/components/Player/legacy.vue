<template>
  <div
    class="d-flex flex-column"
    style="position: relative"
    :style="{
      borderRadius: $store.state.tweaks.roundWatch
        ? `${$store.state.tweaks.roundTweak / 3}rem`
        : '0',
    }"
  >
    <video
      ref="player"
      controls
      autoplay
      width="100%"
      :src="vidSrc"
      @webkitfullscreenchange="handleFullscreenChange"
    />
    <video
      ref="playerfake"
      autoplay
      volume="0"
      style="display: none"
      :src="vidSrc"
    />
    <v-progress-linear
      query
      active
      style="width: 100%"
      background-color="primary"
      background-opacity="0.5"
      :buffer-value="buffered"
      :value="percent"
      color="primary"
      height="4"
    />

    <!-- <v-btn
      text
      tile
      class="debug"
      style="position: absolute; top: 0; left: 0; width: 50%; height: 100%"
    >
      <v-icon>mdi-rewind</v-icon>
    </v-btn>

    <v-btn
      text
      tile
      class="debug"
      style="position: absolute; top: 0; left: 50%; width: 50%; height: 100%"
    >
      <v-icon>mdi-fast-forward</v-icon>
    </v-btn>

    <v-btn
      text
      class="debug"
      style="position: absolute; top: 1rem; left: 1rem; border-radius: 2rem"
      to="home"
      disabled
    >
      <v-icon>mdi-chevron-down</v-icon>
    </v-btn>

    <v-btn
      text
      class="debug"
      style="position: absolute; top: 1rem; right: 1rem; border-radius: 2rem"
      to="home"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn> -->

    <!-- <v-btn
      v-if="$refs.player"
      fab
      text
      style="
        height: 5rem;
        width: 5rem;
        position: absolute;
        top: calc(50% - 2.5rem);
        left: calc(50% - 2.5rem);
      "
      class="debug"
      color="white"
      @click="$refs.player.paused ? $refs.player.play() : $refs.player.pause()"
    >
      <v-icon
        ref="pausePlayIndicator"
        size="5rem"
        v-text="$refs.player.paused ? 'mdi-play' : 'mdi-pause'"
      />
    </v-btn> -->

    <!-- <div
      v-if="$vuetify"
      class="debug px-4 rounded-xl"
      style="position: absolute; bottom: 2rem; left: 1rem"
    >
      {{ watched }}
      <span style="color: #999"> / {{ total }} </span>
    </div>

    <v-btn
      text
      class="debug"
      style="
        position: absolute;
        bottom: 2rem;
        right: 1rem;
        border-radius: 0 2rem 2rem 0;
      "
    >
      HD
    </v-btn>
    <v-btn
      text
      class="debug"
      style="
        position: absolute;
        bottom: 2rem;
        right: 5rem;
        border-radius: 2rem 0 0 2rem;
      "
    >
      1X
    </v-btn> -->
    <v-slider
      v-if="$refs.player"
      dense
      height="4"
      hide-details
      style="
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 69420;
      "
      :value="progress"
      :max="duration"
      @start="scrubbing = true"
      @end="scrubbing = false"
      @input="seek($event)"
      @change="scrub($event)"
    >
      <template #thumb-label="{ value }">
        <canvas
          ref="preview"
          class="rounded-lg mb-8"
          style="
            border: 4px solid var(--v-primary-base);
            margin-top: -20px !important;
            top: -20px !important;
          "
          :width="$refs.player.clientWidth / 4"
          :height="$refs.player.clientHeight / 4"
        ></canvas>
      </template>
    </v-slider>
  </div>
</template>

<script>
export default {
  props: ["vidSrc"],
  data() {
    return {
      scrubbing: false,
      percent: 0,
      progress: 0,
      buffered: 0,
      duration: 0,
      watched: 0,
      total: 0,
    };
  },
  mounted() {
    let vid = this.$refs.player;
    vid.addEventListener("loadeddata", (e) => {
      console.log("%c loadeddata", "color: #00ff00");
      console.log(e);
      //Video should now be loaded but we can add a second check
      if (vid.readyState >= 3) {
        vid.ontimeupdate = () => {
          console.log("%c timeupdate", "color: #aaaaff");
          this.duration = vid.duration;
          if (!this.scrubbing) this.progress = vid.currentTime;
          this.percent = (vid.currentTime / vid.duration) * 100;
          this.watched = this.$vuetube.humanTime(vid.currentTime);
          this.total = this.$vuetube.humanTime(vid.duration);
        };
        vid.onprogress = () => {
          console.log("%c progress", "color: #ff00ff");
          this.buffered = (vid.buffered.end(0) / vid.duration) * 100;
        };
      }
    });
  },
  methods: {
    seek(e) {
      console.log(`scrubbing ${e}`);
      let vid = this.$refs.playerfake;
      let canvas = this.$refs.preview;
      this.$refs.playerfake.currentTime = e;
      canvas
        .getContext("2d")
        .drawImage(
          vid,
          0,
          0,
          this.$refs.player.clientWidth / 4,
          this.$refs.player.clientHeight / 4
        );
    },
    scrub(e) {
      this.$refs.player.currentTime = e;
    },
    handleFullscreenChange() {
      if (document.fullscreenElement === this.$refs.player) {
        this.$vuetube.statusBar.hide();
        this.$vuetube.navigationBar.hide();
      } else {
        this.$vuetube.statusBar.show();
        this.$vuetube.navigationBar.show();
      }
    },
  },
};
</script>
