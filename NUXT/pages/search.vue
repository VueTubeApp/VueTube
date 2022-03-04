<template>
  <div>

    <center style="padding-top: 3em;" v-if="videos == null">
      <v-progress-circular
        size="50"
        indeterminate
        color="primary"
      />
    </center>

    <v-list-item v-for="(video, index) in videos" :key="index">
      <v-card class="entry">
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

<style scoped>
.entry {
  margin-top: 1em;
}
</style>

<script>
export default {
  data() {
    return {
      videos: null
    }
  },
  mounted() {
    const searchQuestion = this.$route.query.q
    const vm = this;
    this.$youtube.search(searchQuestion, (data) => {
      console.log(data)
      vm.videos = data;
    })
  }
}
</script>
