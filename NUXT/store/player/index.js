export const state = () => ({
  loop: null,
  speed: null,
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
    state.loading = payload;
  },
  setPreload(state, payload) {
    state.preload = payload;
  },
  setQuality(state, payload) {
    state.quality = payload;
  },
};
