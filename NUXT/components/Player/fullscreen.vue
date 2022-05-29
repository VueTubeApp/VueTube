<template>
  <v-btn
    fab
    text
    color="white"
    style="position: absolute; bottom: 0.25rem; right: 0.5rem"
    @click.stop="$emit('fullscreen')"
  >
    <v-icon>{{ fullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen" }}</v-icon>
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
