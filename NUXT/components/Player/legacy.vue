<template>
  <div
    style="position: relative"
    class="overflow-hidden"
    :style="{
      borderRadius: $store.state.tweaks.roundWatch
        ? `${$store.state.tweaks.roundTweak / 3}rem`
        : '0',
    }"
  >
    <video
      ref="player"
      autoplay
      controls
      width="100%"
      :src="vidSrc"
      @webkitfullscreenchange="handleFullscreenChange"
    />

    <!-- <div
      v-if="$refs.player"
      class="background overflow-hidden"
      :style="{
        borderRadius: $store.state.tweaks.roundWatch
          ? `${$store.state.tweaks.roundTweak}rem !important`
          : '0',
      }"
      style="width: 100%; position: relative; height: 100%"
    > -->

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
    </v-btn>

    <v-btn
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
    </v-btn>

    <div
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
    </v-btn>
-->
    <v-progress-linear
      active
      style="position: absolute; bottom: 0rem; left: 0; width: 100%"
      background-color="primary"
      background-opacity="0.5"
      :buffer-value="buffered"
      color="primary"
      height="3"
      query
      :value="percent"
    />
    <!-- </div> -->
    <!-- <v-slider
      style="position: absolute; bottom: -1rem; left: 0; width: 100%"
      :value="progress"
      :max="duration"
    /> -->
  </div>
</template>

<script>
export default {
  props: ["vidSrc"],
  data() {
    return {
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
      //Video should now be loaded but we can add a second check
      if (vid.readyState >= 3) {
        vid.ontimeupdate = () => {
          this.duration = vid.duration;
          this.progress = vid.currentTime;
          this.percent = (vid.currentTime / vid.duration) * 100;
          this.watched = this.$vuetube.humanTime(vid.currentTime);
          this.total = this.$vuetube.humanTime(vid.duration);
        };
        vid.addEventListener("progress", () => {
          this.buffered = (vid.buffered.end(0) / vid.duration) * 100;
        });
      }
    });
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
  },
};
</script>
