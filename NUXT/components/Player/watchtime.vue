<template>
  <div style="color: #fff; font-size: 0.75rem">
    {{ $vuetube.humanTime(currentTime) }}
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
  },
  data() {
    return {
      humanDuration: 0,
    }
  },
  mounted() {
    //---   Only set video duration when 'this.duration' becomes defined   ---//
    const durationTimer = setInterval(() => {
      if (this.duration) {
        this.humanDuration = this.$vuetube.humanTime(this.duration);
        return clearInterval(durationTimer);
      }
    }, 100);
    //---   END Only set video duration when 'this.duration' becomes defined   ---//
  }
};
</script>
