<template>
  <div>
    <div
      v-for="(video, index) in render.contents"
      :key="index"
      class="pa-0 fill-screen"
    >
      <component
        v-if="getComponents()[Object.keys(video)[0]]"
        :is="Object.keys(video)[0]"
        :key="video[Object.keys(video)[0]].videoId"
        :video="video[Object.keys(video)[0]]"
      ></component>
    </div>
    <div
      v-if="
        render.separatorDetails && render.separatorDetails.hasBottomSeparator
      "
      class="separator-bottom background"
      :class="$vuetify.theme.dark ? 'lighten-4' : 'darken-4'"
      :style="{ height: render.separatorDetails.height + 'px' }"
    ></div>
  </div>
</template>

<style scoped>
.shelf-header {
  width: 100%; /* Prevent Loading Weirdness */
  padding: 10px;
}

.fill-screen {
  width: 100vw; /* Very Hacky */
}
</style>

<script>
import compactVideoRenderer from "~/components/CompactRenderers/compactVideoRenderer.vue";
import compactChannelRenderer from "~/components/CompactRenderers/compactChannelRenderer.vue";
import gridVideoRenderer from "~/components/gridRenderers/gridVideoRenderer.vue";

export default {
  components: {
    gridVideoRenderer,
    compactVideoRenderer,
    compactChannelRenderer,
  },
  props: ["render"],

  methods: {
    getComponents() {
      return this.$options.components;
    },
  },
};
</script>
