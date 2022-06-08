<template>
  <div style="color: #fff; font-size: 0.75rem">
    {{ $vuetube.humanTime(currentTime) }}
    <span style="color: #aaa"> / {{ $vuetube.humanTime(duration) }} </span>
  </div>
</template>

<script>
export default {
  props: {
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
