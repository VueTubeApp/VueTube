<template>
  <!--
  * Videos are now polled from '~/components/recommended.vue'
  * This is to allow use of "recommended" videos on other pages such as /watch
  * -Front
  * -->

  <div>
    <!--   Video Loading Animation   -->
    <vid-load-renderer v-if="!recommends.contents" />
    <horizontal-list-renderer v-else :render="recommends.contents[0]" />
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

  mounted() {
    if (!this.recommends.items || !this.recommends.items.length) {
      this.$youtube
        .recommend()
        .then((result) => {
          if (result) this.recommends = result;
        })
        .catch((error) => this.$logger("Home Page", error, true));
    }
  },
};
</script>
