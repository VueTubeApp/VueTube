<template>
  <div
    style="color: #fff; left: 1rem; font-size: 0.75rem; position: absolute"
    :style="fullscreen ? 'bottom: 4.25rem' : 'bottom: 1rem'"
  >
    {{ watched }}
    <span style="color: #aaa"> / {{ duration }} </span>
  </div>
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
    duration: {
      type: Number,
      required: true,
    },
    watched: {
      type: Number,
      required: true,
    },
  },
};
</script>
