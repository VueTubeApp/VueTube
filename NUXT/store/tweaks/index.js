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
      state.roundTweak = JSON.parse(localStorage.getItem("roundTweak")) || 0;
      state.roundThumb =
        JSON.parse(localStorage.getItem("roundThumb")) === true;
      state.roundWatch =
        JSON.parse(localStorage.getItem("roundWatch")) === true;
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
