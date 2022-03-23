<template>
  <div class="accent">
    <center v-if="videos.length == -1">
      <v-skeleton-loader type="card-avatar, article, actions" />
      <v-skeleton-loader type="card-avatar, article, actions" />
    </center>

    <horizontal-list-renderer :recommends="videos" />
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
import horizontalListRenderer from "../components/horizontalListRenderer.vue";
export default {
  components: { horizontalListRenderer },
  data() {
    return {
      videos: [],
    };
  },
  mounted() {
    this.getSearch();
  },
  methods: {
    getSearch() {
      const searchQuestion = this.$route.query.q;
      this.$youtube.search(searchQuestion).then((response) => {
        this.videos = response.items;
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
