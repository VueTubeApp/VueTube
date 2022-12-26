export const state = () => ({
  roundTweak: 0,
  roundThumb: null,
  roundWatch: null,
  launchTheme: null,
  launchIconTheme: null,
});
export const mutations = {
  initTweaks(state) {
    if (process.client) {
      state.roundTweak = JSON.parse(localStorage.getItem("roundTweak")) || 0; // defaults to 0
      state.roundThumb =
        JSON.parse(localStorage.getItem("roundThumb")) === true; // defaults to false
      state.roundWatch =
        JSON.parse(localStorage.getItem("roundWatch")) === true; // defaults to false
    }
    state.launchTheme = JSON.parse(localStorage.getItem("launchTheme")) || 0; // defaults to 0
    state.launchIconTheme =
      JSON.parse(localStorage.getItem("launchIconTheme")) === true; // defaults to false
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
  setLaunchTheme(state, payload) {
    state.launchTheme = payload;
    localStorage.setItem("launchTheme", payload);
  },
  setLaunchIconTheme(state, payload) {
    state.launchIconTheme = payload;
    localStorage.setItem("launchIconTheme", payload);
  },
};
