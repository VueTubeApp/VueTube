<template>
  <v-btn fab text small @click="$emit('loop')">
    <v-icon>{{ loop ? "mdi-sync-circle" : "mdi-sync" }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    loop: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["loop"],
};
</script>
