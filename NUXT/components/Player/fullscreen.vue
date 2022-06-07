<template>
  <v-btn
    fab
    text
    small
    color="white"
    style="position: absolute; right: 0.25rem"
    :style="fullscreen ? 'bottom: 3.5rem' : 'bottom: 0.25rem'"
    @click.stop="$emit('fullscreen')"
  >
    <v-icon size="1.25rem">{{
      fullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen"
    }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    fullscreen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["fullscreen"],
};
</script>
