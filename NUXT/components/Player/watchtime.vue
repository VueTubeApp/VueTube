<template>
  <div
    style="color: #fff; left: 1rem; font-size: 0.75rem; position: absolute"
    :style="fullscreen ? 'bottom: 4.25rem' : 'bottom: 1rem'"
  >
    {{ $vuetube.humanTime(currentTime) }}
    <span style="color: #aaa"> / {{ $vuetube.humanTime(duration) }} </span>
  </div>
</template>

<script>
export default {
  props: {
    fullscreen: {
      type: Boolean,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    currentTime: {
      type: Number,
      required: true,
    },
  },
};
</script>
