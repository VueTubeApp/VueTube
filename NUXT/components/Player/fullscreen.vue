<template>
  <v-btn fab text small color="white" @click.stop="$emit('fullscreen')">
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
