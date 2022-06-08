<template>
  <div>
    <v-progress-linear
      v-for="block in blocks"
      :key="block.UUID"
      :buffer-value="(block.segment[1] / video.duration) * 100"
      :value="(block.segment[0] / video.duration) * 100"
      style="
        z-index: 3;
        position: absolute;
        pointer-events: none;
        background: transparent;
        transform: translateY(50%);
      "
      :class="!fullscreen || controls ? '' : 'invisible'"
      background-color="white"
      background-opacity="1"
      color="transparent"
      :height="seeking ? 4 : 2"
      :style="
        fullscreen
          ? 'width: calc(100% - 2rem); left: 1rem; bottom: 3.25rem;'
          : 'width: 100%; left: 0; bottom: 1px;'
      "
    />
    <!-- // TODO:background-color="colors[block.category]" -->
  </div>
</template>

<script>
export default {
  props: {
    blocks: {
      type: Array,
      required: true,
    },
    duration: {
      type: Object,
      required: true,
    },
    seeking: {
      type: Boolean,
      required: true,
    },
    fullscreen: {
      type: Boolean,
      required: true,
    },
    controls: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    colors: {
      sponsor: "green",
      selfpromo: "yellow",
      exclusive_access: "teal",
      interaction: "fuchsia",
      poi_highlight: "deeppink",
      intro: "lightblue",
      outro: "blue",
      music_offtopic: "orange",
      filter: "purple",
    },
  }),
};
</script>
