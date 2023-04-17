export const state = () => ({
  playlists: [],
  currentPlaylist: null,
});

// Shape of playlists
// [playlist, playlist]

// Shape of playlist
// {name: string, videos: []}

// Shape of currentPlaylist
// {index: number, name: string, videos: []}

export const mutations = {
  initPlaylists(state) {
    if (process.client) {
      // read local storage and parse the list of objects
      state.playlists = JSON.parse(localStorage.getItem("playlists"));
    }
  },
  createPlaylist(state, name) {
    state.playlists.push({ name, videos: [] });
    localStorage.setItem("playlists", JSON.stringify(state.playlists));
  },
  removePlaylist(state, index) {
    state.playlists.splice(index, 1);
    localStorage.setItem("playlists", JSON.stringify(state.playlists));
  },
  addToPlaylist(state, { index, video }) {
    state.playlists[index].videos.unshift(video);
    localStorage.setItem("playlists", JSON.stringify(state.playlists));
  },
  removeFromPlaylist(state, { playlistIndex, video }) {
    const videoIndex = state.playlists[playlistIndex].videos.findIndex(
      (playlistVideo) => playlistVideo.id === video.id
    );
    if (videoIndex === -1) throw new Error("Unable To Find Video");
    state.playlists[playlistIndex].videos.splice(videoIndex, 1);
    localStorage.setItem("playlists", JSON.stringify(state.playlists));
  },
  changeToPlaylist(state, videoIndex) {
    state.currentPlaylist = {
      index: videoIndex,
      ...state.playlists[videoIndex],
    };
  },
  exitPlaylist(state) {
    state.currentPlaylist = null;
  },
};
