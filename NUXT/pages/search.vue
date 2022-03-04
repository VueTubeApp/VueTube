<template>
  <div>
    <v-list-item v-for="(video, index) in videos" :key="index">
      <v-card>
        <v-card-title v-text="video.raw.compactVideoRenderer.title.runs[0].text" />
        <v-card-text>
          <v-img :src="video.thumbnails[video.thumbnails.length - 1].url" />
          <p v-text="video.id" />
          <p v-text="video.uploaded" />
          <p v-text="video.runtime" />
          <p v-text="video.views" />
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
