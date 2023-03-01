export const state = () => ({
  roundTweak: null,
  roundThumb: null,
  roundWatch: null,
  launchTheme: null,
  launchIconTheme: null,
  navigationText: null,
  navigationShift: null,
  navigationIcons: null,
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

    state.navigationText = !(
      // false if false, defaults to true
      (JSON.parse(localStorage.getItem("navigationText")) === false)
    );
    state.navigationShift = !(
      // false if false, defaults to true
      (JSON.parse(localStorage.getItem("navigationShift")) === false)
    );
    state.navigationIcons =
      JSON.parse(localStorage.getItem("navigationIcons")) || 0; // defaults to 0
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
  setNavigationText(state, payload) {
    state.navigationText = payload;
    localStorage.setItem("navigationText", payload);
  },
  setNavigationShift(state, payload) {
    state.navigationShift = payload;
    localStorage.setItem("navigationShift", payload);
  },
  setNavigationIcons(state, payload) {
    state.navigationIcons = payload;
    localStorage.setItem("navigationIcons", payload);
  },
};
