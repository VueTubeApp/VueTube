<template>
  <v-progress-linear
    style="
      z-index: 2;
      position: absolute;
      background: #ffffff22;
      transform: translateY(50%);
    "
    background-opacity="0.5"
    background-color="white"
    :buffer-value="buffered"
    :value="(currentTime / video.duration) * 100"
    :class="!fullscreen || controls ? '' : 'invisible'"
    color="primary"
    :height="seeking ? 4 : 2"
    :style="
      fullscreen
        ? 'width: calc(100% - 2rem); left: 1rem; bottom: 3.25rem;'
        : 'width: 100%; left: 0; bottom: 1px;'
    "
  />
</template>
<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },
    seeking: {
      type: Boolean,
      required: true,
    },
    fullscreen: {
      type: Boolean,
      required: true,
    },
    currentTime: {
      type: Number,
      required: true,
    },
    controls: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    buffered: 0,
  }),
  mounted() {
    this.video.addEventListener("loadeddata", (e) => {
      if (this.video.readyState >= 3) {
        this.video.addEventListener("progress", () => {
          this.buffered =
            (this.video.buffered.end(0) / this.video.duration) * 100;
        });
      }
    });
  },
};
</script>
