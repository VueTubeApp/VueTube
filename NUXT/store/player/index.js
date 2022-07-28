export const state = () => ({
  loop: null,
  speed: 1,
  speedAutosave: null,
  preload: null,
  quality: null,
  // qualityAutoSwitch: null,
  // shortFullscreen: null,
  // autoplay: null,
  // shorts: null,
  // music: null,
});
export const mutations = {
  setLoop(state, payload) {
    state.loop = payload;
  },
  setSpeed(state, payload) {
    state.speed = payload;
  },
  setSpeedAutosave(state, payload) {
    state.speedAutosave = payload;
  },
  setPreload(state, payload) {
    state.preload = payload;
  },
  setQuality(state, payload) {
    state.quality = payload;
  },
};
