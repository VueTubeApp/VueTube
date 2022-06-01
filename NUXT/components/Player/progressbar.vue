<template>
  <v-progress-linear
    style="width: 100%; background: #ffffff22"
    background-opacity="0.5"
    background-color="primary"
    :buffer-value="buffered"
    :value="(currentTime / video.duration) * 100"
    :class="!fullscreen || controls ? '' : 'invisible'"
    color="primary"
    height="2"
    :style="
      fullscreen
        ? 'width: calc(100% - 2rem); left: 1rem; position: absolute; bottom: 3rem;'
        : 'width: 100%'
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
    fullscreen: {
      type: Boolean,
      required: true,
    },
    currentTime: {
      type: Number,
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
