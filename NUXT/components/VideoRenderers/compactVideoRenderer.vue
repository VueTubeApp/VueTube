<template>
  <v-card class="entry compactVideoRenderer" :to="`/watch?v=${video.id}`">
    <v-card-text>
      <div style="position: relative">
        <v-img :src="video.thumbnail" />
        <div
          class="videoRuntimeFloat"
          style="color: #fff"
          v-text="video.metadata.overlay[0]"
        />
      </div>
      <div style="margin-top: 0.5em" v-text="video.title" />
      <div v-text="parseBottom(video)" />
    </v-card-text>
  </v-card>
</template>

<style scoped>
.entry {
  width: 100%; /* Prevent Loading Weirdness */
}
.videoRuntimeFloat {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 0px 4px 0px 4px;
}
</style>

<script>
export default {
  props: {
    video: Object,
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
