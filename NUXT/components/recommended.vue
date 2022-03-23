<template>
  <div>
    <!--   Video Loading Animation   -->
    <center v-if="recommends.length == 0">
      <v-skeleton-loader type="card-avatar, article, actions" />
      <v-skeleton-loader type="card-avatar, article, actions" />
    </center>

    <v-list-item v-for="(video, index) in recommends" :key="index" class="pa-0">
      <component
        :is="Object.keys(video)[0]"
        :key="video[Object.keys(video)[0]].videoId"
        :video="video[Object.keys(video)[0]]"
      ></component>
    </v-list-item>
  </div>
</template>

<script>
import gridVideoRenderer from "./VideoRenderers/gridVideoRenderer.vue";

export default {
  components: {
    gridVideoRenderer,
  },
  props: {
    recommends: Array,
  },

  methods: {
    parseBottom(video) {
      const bottomText = [video.channel, video.metadata.views];
      if (video.metadata.published) bottomText.push(video.metadata.published);
      return bottomText.join(" • ");
    },
  },
};
</script>
