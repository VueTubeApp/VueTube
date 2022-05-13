export const state = () => ({
  roundTweak: 0,
  roundThumb: true,
  roundWatch: true,
});
export const mutations = {
  initTweaks(state) {
    // NOTE: localStorage is not reactive, so it will only be used on first load
    // currently called beforeCreate() in pages/default.vue
    if (process.client) {
      state.roundTweak = localStorage.getItem("roundTweak") || 0;
      state.roundThumb = localStorage.getItem("roundThumb") || true;
      state.roundWatch = localStorage.getItem("roundWatch") || true;
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
