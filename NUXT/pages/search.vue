<template>
  <div class="accent">
    <center v-if="videos.length == -1">
      <v-skeleton-loader type="card-avatar, article, actions" />
      <v-skeleton-loader type="card-avatar, article, actions" />
    </center>

    <v-list-item v-for="(video, index) in videos" :key="index" class="pa-0">
      <v-card class="entry background" :to="`/watch?v=${video.id}`" flat>
        <div style="position: relative">
          <v-img :src="video.thumbnails[video.thumbnails.length - 1].url" />
          <div
            class="videoRuntimeFloat"
            style="color: #fff"
            v-text="video.runtime"
          />
        </div>
        <div class="px-4 pt-4" v-text="video.title" />
        <v-card-text class="pt-0">
          <div v-text="`${video.views} • ${video.uploaded}`" />
        </v-card-text>
      </v-card>
    </v-list-item>
  </div>
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
  data() {
    return {
      videos: [],
    };
  },
  mounted() {
    getSearch();
  },
  methods: {
    getSearch() {
      const searchQuestion = this.$route.query.q;
      const vm = this;
      this.$youtube.search(searchQuestion, (data) => {
        vm.videos = data;
      });
    },
  },
  watch: {
    // Watches for new searches while the current search page is active.
    $route: {
      deep: true,
      handler(newSearch, oldSearch) {
        if (newSearch.query.q != oldSearch.query.q) {
          this.getSearch();
        }
      },
    },
  },
};
</script>
