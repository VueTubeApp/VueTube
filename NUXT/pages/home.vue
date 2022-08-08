<template>
  <!--
  * Videos are now polled from '~/components/recommended.vue'
  * This is to allow use of "recommended" videos on other pages such as /watch
  * -Front
  * -->

  <div>
    <!--   Video Loading Animation   -->
    <vid-load-renderer v-if="recommends.length == 0" :count="10" />
    <div v-for="(section, index) in recommends" :key="index">
      <horizontal-list-renderer :render="section.contents[0]" />
    </div>
    <vid-load-renderer v-if="loading" :count="1" />
    <observer @intersect="paginate" v-else-if="recommends.length > 0" />
  </div>
</template>

<script>
import horizontalListRenderer from "~/components/ListRenderers/horizontalListRenderer.vue";
import VidLoadRenderer from "~/components/vidLoadRenderer.vue";
import Observer from "~/components/observer.vue";
export default {
  components: { horizontalListRenderer, VidLoadRenderer, Observer },
  data: () => ({
    loading: false,
  }),

  computed: {
    recommends: {
      get() {
        return [...this.$store.state.recommendedVideos];
      },
      set(val) {
        this.$store.commit("updateRecommendedVideos", val);
      },
    },
  },
  methods: {
    paginate() {
      this.loading = true;
      const continuationCode = this.recommends[
        this.recommends.length - 1
      ].continuations.find((element) => element.nextContinuationData)
        ?.nextContinuationData.continuation;
      if (continuationCode) {
        this.$youtube
          .recommendContinuation(
            this.recommends[this.recommends.length - 1].continuations.find(
              (element) => element.nextContinuationData
            ).nextContinuationData.continuation,
            "browse"
          )
          .then((result) => {
            this.loading = false;
            this.recommends.push(result);
          });
      } else {
        this.loading = false;
      }
    },
  },

  mounted() {
    if (!this.recommends.length) {
      this.$youtube
        .recommend()
        .then((result) => {
          if (result) this.recommends = [result];
        })
        .catch(error => {});
    }
  },
};
</script>
