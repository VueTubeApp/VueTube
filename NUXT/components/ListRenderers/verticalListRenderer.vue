<template>
  <div class="fill-width">
    <v-list-item
      v-for="(video, index) in render.items"
      :key="index"
      class="pa-0 min-height-0"
    >
      <component
        :is="Object.keys(video)[0]"
        v-if="getComponents()[Object.keys(video)[0]]"
        :key="video[Object.keys(video)[0]].videoId"
        :video="video[Object.keys(video)[0]]"
      ></component>
    </v-list-item>
  </div>
</template>

<script>
import gridVideoRenderer from "~/components/gridRenderers/gridVideoRenderer.vue";
import compactVideoRenderer from "~/components/CompactRenderers/compactVideoRenderer.vue";

export default {
  components: {
    gridVideoRenderer,
    compactVideoRenderer,
  },
  props: ["render"],

  methods: {
    getComponents() {
      return this.$options.components;
    },
  },
};
</script>
