<template>
  <div class="background">
    <!--   Video Loading Animation   -->
    <vid-load-renderer v-if="renderer.length <= 0" />
    <sectionListRenderer :render="renderer" />
  </div>
</template>

<script>
import sectionListRenderer from "~/components/ListRenderers/sectionListRenderer.vue";
import VidLoadRenderer from "~/components/vidLoadRenderer.vue";

export default {
  components: {
    sectionListRenderer,
    VidLoadRenderer,
  },
  data() {
    return {
      renderer: [],
    };
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
  mounted() {
    this.getSearch();
  },
  methods: {
    getSearch() {
      this.$store.commit("search/setLoading", true); // in case navigated to the page not from top bar
      const searchQuestion = this.$route.query.q;
      this.$youtube.search(searchQuestion).then((response) => {
        this.$store.commit("search/setLoading", false);
        this.renderer = response;
      });
    },
  },
};
</script>

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
