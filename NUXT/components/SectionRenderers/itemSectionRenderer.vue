<template>
  <div class="fill-width">
    <v-list-item
      v-for="(video, index) in render.contents"
      :key="index"
      class="pa-0 min-height-0"
    >
      <component
        v-if="getComponents()[Object.keys(video)[0]]"
        :is="Object.keys(video)[0]"
        :key="video[Object.keys(video)[0]].videoId"
        :video="video[Object.keys(video)[0]]"
      ></component>
    </v-list-item>
    <div
      v-if="
        render.separatorDetails &&
        render.separatorDetails.hasBottomSeparator &&
        !($store.state.tweaks.roundThumb && $store.state.tweaks.roundTweak > 0)
      "
      class="separator-bottom background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      :style="{ height: render.separatorDetails.height + 'px' }"
    ></div>
  </div>
</template>

<style scoped>
.shelf-header {
  width: 100%; /* Prevent Loading Weirdness */
  padding: 10px;
}
</style>

<script>
import compactVideoRenderer from "~/components/CompactRenderers/compactVideoRenderer.vue";
import compactChannelRenderer from "~/components/CompactRenderers/compactChannelRenderer.vue";
import gridVideoRenderer from "~/components/gridRenderers/gridVideoRenderer.vue";
import videoWithContextRenderer from "~/components/gridRenderers/videoWithContextRenderer.vue";

export default {
  components: {
    gridVideoRenderer,
    compactVideoRenderer,
    compactChannelRenderer,
    videoWithContextRenderer,
  },
  props: ["render"],

  methods: {
    getComponents() {
      return this.$options.components;
    },
  },
};
</script>
