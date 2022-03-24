import Vue from "vue";

export const state = () => ({
  recommendedVideos: [],
});

export const mutations = {
  updateRecommendedVideos(state, payload) {
    Vue.set(state, "recommendedVideos", payload);
  },
};
