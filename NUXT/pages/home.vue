<template>
  <!--
  * Videos are now polled from '~/components/recommended.vue'
  * This is to allow use of "recommended" videos on other pages such as /watch
  * -Front
  * -->

  <div>
    <!--   Video Loading Animation   -->
    <vid-load-renderer v-if="!recommends" />
    <horizontal-list-renderer v-else :render="recommends" />
  </div>
</template>

<script>
import horizontalListRenderer from "~/components/ListRenderers/horizontalListRenderer.vue";
import VidLoadRenderer from "~/components/vidLoadRenderer.vue";
export default {
  components: { horizontalListRenderer, VidLoadRenderer },

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
    if (!this.recommends.items || !this.recommends.items.length) {
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
