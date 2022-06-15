<template>
  <v-progress-linear
    style="
      position: absolute;
      background: #ffffff22;
      transform: translateY(50%);
    "
    background-opacity="0.5"
    background-color="white"
    :buffer-value="buffered"
    :value="(currentTime / duration) * 100"
    :class="!fullscreen || controls ? '' : 'invisible'"
    color="primary"
    :height="seeking ? 4 : 2"
    :style="
      fullscreen
        ? 'width: calc(100% - 2rem); left: 1rem; bottom: 3.5rem;'
        : 'width: 100%; left: 0; bottom: 1px;'
    "
  />
</template>
<script>
export default {
  props: {
    duration: {
      type: Number,
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
    buffered: {
      type: Number,
      required: true,
    },
  },
};
</script>
