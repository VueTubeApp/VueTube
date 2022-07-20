<template>
  <div
    v-if="isFullscreen"
    :style="
      verticalFullscreen
        ? 'position: absolute; height: calc(100vh - 14rem); bottom: 7rem; right: 0;'
        : ''
    "
    :class="verticalFullscreen ? 'd-flex flex-column justify-end' : ''"
  >
    <v-btn
      v-for="(item, index) in interactions"
      :key="index"
      fab
      text
      small
      color="white"
      :class="verticalFullscreen ? 'ma-2' : 'mr-2'"
      :disabled="item.disabled"
    >
      <v-icon v-text="item.icon" />
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    isFullscreen: {
      type: Boolean,
      required: true,
    },
    verticalFullscreen: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    interactions: [
      {
        icon: "mdi-thumb-up-outline",
        disabled: true,
      },
      {
        icon: "mdi-thumb-down-outline",
        disabled: true,
      },
      {
        icon: "mdi-share-outline",
        disabled: true,
      },
      {
        icon: "mdi-comment-text-outline",
        disabled: true,
      },
      {
        icon: "mdi-plus-box-multiple-outline",
        disabled: true,
      },
    ],
  }),
};
</script>
