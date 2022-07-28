export const state = () => ({
  loop: null,
  speed: 1,
  speedAutosave: null,
  preload: null,
  // quality: null,
  // qualityAutoSwitch: null,
  // shortFullscreen: null,
  // autoplay: null,
  // shorts: null,
  // music: null,
});
export const mutations = {
  initPlayer(state) {
    if (process.client) {
      state.loop = JSON.parse(localStorage.getItem("loop")) === true; // defaults to false
      state.speed = JSON.parse(localStorage.getItem("speed")) || 1; // defaults to 1
      state.speedAutosave = !(
        // false if false, defaults to true
        (JSON.parse(localStorage.getItem("speedAutosave")) === false)
      );
      state.preload = JSON.parse(localStorage.getItem("preload")) === true; // defaults to false
    }
  },
  setLoop(state, payload) {
    state.loop = payload;
    localStorage.setItem("loop", payload);
  },
  setSpeed(state, payload) {
    state.speed = payload;
    localStorage.setItem("speed", payload);
  },
  setSpeedAutosave(state, payload) {
    state.speedAutosave = payload;
    localStorage.setItem("speedAutosave", payload);
  },
  setPreload(state, payload) {
    state.preload = payload;
    localStorage.setItem("preload", payload);
  },
};
