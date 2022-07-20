export const state = () => ({
  loading: false,
});
export const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  },
};
