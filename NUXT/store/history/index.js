export const state = () => ({
    historyVideos: [],
  });
  
  export const mutations = {
    initHistory(state) {
      if (process.client) {
        // read local storage and parse the list of objects
        state.historyVideos = localStorage
          .getItem("historyVideos")
          .split(",")
          .map((video) => JSON.parse(video));
      }
    },
    addHistory(state, video) {
      state.historyVideos = state.historyVideos.filter((v) => v.id != video.id); // remove video if it is already in the history list
      state.historyVideos.unshift(video);
      localStorage.setItem(
        "historyVideos",
        state.historyVideos.map((video) => JSON.stringify(video))
      );
    },
    removeHistory(state, index) {
      state.historyVideos.splice(index, 1);
      localStorage.setItem(
        "historyVideos",
        state.historyVideos.map((video) => JSON.stringify(video))
      );
    },
    clearHistory(state) {
      state.historyVideos = [];
      localStorage.setItem(
        "historyVideos",
        state.historyVideos.map((video) => JSON.stringify(video))
      );
    },
  };
  