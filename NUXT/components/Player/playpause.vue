<template>
  <v-btn
    fab
    text
    style="
      width: 5rem;
      height: 5rem;
      position: absolute;
      top: calc(50% - 2.5rem);
      left: calc(50% - 2.5rem);
    "
    color="white"
    @click.stop="
      (paused = !video.paused),
        video.paused ? (video.play(), $emit('close')) : video.pause()
    "
  >
    <v-icon size="5rem">
      {{ paused ? "mdi-play" : "mdi-pause" }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: ["video"],
  emits: ["close"],
  data: () => ({
    paused: false,
  }),
};
</script>
