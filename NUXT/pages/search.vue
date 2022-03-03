<template>
  <div>
    <v-list-item v-for="(video, index) in videos" :key="index">
      <v-card>
        <v-card-title v-text="video.compactVideoRenderer.title.runs[0].text" />
        <v-card-text>
          <p v-text="video.compactVideoRenderer.videoId" />
          <p v-text="video.compactVideoRenderer.lengthText.runs[0].text" />
          <p v-text="video.compactVideoRenderer.publishedTimeText.runs[0].text" />
          <p v-text="video.compactVideoRenderer.viewCountText.runs[0].text" />
        </v-card-text>
      </v-card>
    </v-list-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: []
    }
  },
  mounted() {
    const vm = this;
    this.$youtube.search("TEST", (data) => {
      vm.videos = data;
    })
  }
}
</script>
