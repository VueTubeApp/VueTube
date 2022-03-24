<template>
  <!--
  * Videos are now polled from '~/components/recommended.vue'
  * This is to allow use of "recommended" videos on other pages such as /watch
  * -Front
  * -->
  <horizontal-list-renderer :recommends="recommends" class="video-list" />
</template>

<script>
import horizontalListRenderer from "../components/horizontalListRenderer.vue";
export default {
  components: { horizontalListRenderer },

  computed: {
    recommends: {
      get() {
        return this.$store.state.recommendedVideos;
      },
      set(val) {
        this.$store.commit("updateRecommendedVideos", val);
      },
    },
  },

  // The following code is only a demo for debugging purposes, note that each "shelfRenderer" has a "title" value that seems to align to the categories at the top of the vanilla yt app

  mounted() {
    if (!this.recommends.length) {
      this.$youtube
        .recommend()
        .then((result) => {
          if (result) this.recommends = result[0];
        })
        .catch((error) => this.$logger("Home Page", error, true));
    }
  },
};
</script>
