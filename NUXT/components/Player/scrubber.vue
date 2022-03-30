<template>
  <div>

    <div class="scrubber">

    </div>

  </div>
</template>

<script>
export default {
  duration: {
    type: Number,
    default: 0,
  },
  endDuration: {
    type: Number,
    default: 0,
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
