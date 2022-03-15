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
      <v-card class="entry" :to="`/watch?v=${video.id}`">
        <v-card-text>
          <div style="position: relative;">
            <v-img :src="video.thumbnails[video.thumbnails.length - 1].url" />
            <p v-text="video.runtime" class="videoRuntimeFloat" style="color: #fff;" />
          </div>
          <div v-text="video.title" style="margin-top: 0.5em;" />
          <div v-text="`${video.views} • ${video.uploaded}`" />
        </v-card-text>
      </v-card>
    </v-list-item>
  </div>
</template>

<style scoped>
.entry {
  margin-top: 1em;
  width: 100%; /* Prevent Loading Issues */
}
.videoRuntimeFloat {
  position: absolute;
  bottom: 0;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 1em;
  padding: 3px;
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
