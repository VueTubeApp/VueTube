<template>
  <div>

    <div class="scrubber">
      <div ref="progress" class="progress" />
      <div ref="background" class="background" />
    </div>

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
}
</script>

<style scoped>
.scrubber {
  width: 100%;
  height: 1em;
  background: #000;
}
</style>
