// this is an loading animation for videos
<template>
  <div>
    <v-sheet color="background" v-for="i in count" :key="i">
      <v-skeleton-loader type="image, list-item-avatar-two-line" />
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: ["count"],
};
</script>
