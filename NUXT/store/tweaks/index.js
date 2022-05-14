export const state = () => ({
  roundTweak: 0,
  roundThumb: null,
  roundWatch: null,
});
export const mutations = {
  initTweaks(state) {
    // NOTE: localStorage is not reactive, so it will only be used on first load
    // currently called on mounted() in pages/index.vue
    if (process.client) {
      state.roundTweak = localStorage.getItem("roundTweak") || 0;
      state.roundThumb = localStorage.getItem("roundThumb");
      state.roundWatch = localStorage.getItem("roundWatch");
      console.log(state.roundThumb);
      console.log(state.roundWatch);
    }
  },
  setRoundTweak(state, payload) {
    if (!isNaN(payload)) {
      state.roundTweak = payload;
      localStorage.setItem("roundTweak", payload);
    }
  },
  setRoundThumb(state, payload) {
    state.roundThumb = payload;
    localStorage.setItem("roundThumb", payload);
  },
  setRoundWatch(state, payload) {
    state.roundWatch = payload;
    localStorage.setItem("roundWatch", payload);
  },
};
