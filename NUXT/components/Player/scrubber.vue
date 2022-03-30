<template>
  <div class="scrubber">
    <div id="progress" class="primary" />
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 0,
    },
    endDuration: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      percentage: 0,
    };
  },
  mounted() {
    const vm = this;
    setInterval(function () {
      vm.percentage = (vm.duration / vm.endDuration) * 100;

      document.getElementById("progress").style.width = vm.percentage + "%";
    }, 100);
  },
};
</script>

<style scoped>
.scrubber {
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
}
#progress {
  height: 100%;
}
</style>
