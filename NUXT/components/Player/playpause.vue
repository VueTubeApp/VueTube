<template>
  <v-btn
    fab
    text
    large
    color="white"
    :loading="buffering"
    @click="
      (paused = !video.paused), video.paused ? $emit('play') : $emit('pause')
    "
  >
    <v-icon size="3.5rem">
      {{ paused ? "mdi-play" : "mdi-pause" }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },
    buffering: {
      type: Boolean,
      required: false,
    },
  },
  emits: ["play", "pause"],
  data: () => ({
    paused: false,
  }),
};
</script>
