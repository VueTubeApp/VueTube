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
  methods: {
    calcDuration() {
      this.humanDuration = this.$vuetube.humanTime(this.duration);
    }
  },
  mounted() {
    //---   Only call 'calcDuration()' when 'this.duration' becomes defined   ---//
    const durationTimer = setInterval(() => {
      if (this.duration) {
        this.calcDuration();
        return clearInterval(durationTimer);
      }
    }, 100);
    //---   END Only call 'calcDuration()' when 'this.duration' becomes defined   ---//
  }
};
</script>
