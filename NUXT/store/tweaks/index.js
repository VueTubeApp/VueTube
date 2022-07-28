export const state = () => ({
  roundTweak: 0,
  roundThumb: null,
  roundWatch: null,
});
export const mutations = {
  initTweaks(state) {
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
