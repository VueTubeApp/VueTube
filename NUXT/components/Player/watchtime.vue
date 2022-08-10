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
  data() {
    return {
      humanWatchTime: "0:00",
      humanDuration: "0:00",

      runWatchTimeUpdates: null
    }
  },
  mounted() {
    //---   Only show end duration when 'this.duration' becomes defined   ---//
    const durationTimer = setInterval(() => {
      if (this.duration) {
        this.humanDuration = this.$vuetube.humanTime(this.duration);
        return clearInterval(durationTimer);
      }
    }, 100);
    //---   END Only show end duration when 'this.duration' becomes defined   ---//
  },

  methods: {
    updateWatchTime() {
      this.humanWatchTime = this.$vuetube.humanTime(this.currentTime);
    }
  },

  watch: {
    controls(newVal) {
      if (newVal) { // controls are VISIBLE
        this.updateWatchTime(); // Call to immediately update
        this.runWatchTimeUpdates = setInterval(this.updateWatchTime, 500);
      } else { // Controls are INVISIBLE
        clearInterval(this.runWatchTimeUpdates);
      }
    }
  }

};
</script>
