<template>
  <div style="color: #fff; font-size: 0.75rem">
    {{ humanWatchTime }}
    <span style="color: #aaa"> / {{ humanDuration }} </span>
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
    controls: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    humanDuration() {
      if (this.duration) return this.$vuetube.humanTime(this.duration);
      return "0:00";
    },
    humanWatchTime() {
      if (this.currentTime) return this.$vuetube.humanTime(this.currentTime);
      return "0:00";
    },
  },
};
</script>
