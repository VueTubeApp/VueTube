const module = {
  search(phrase, type, callback) {
    const youtube = new require("youtubei").Client();

    youtube.search(phrase, { type: "video" }).then((results) => {
      callback(results);
    });
  }
}

export default ({ app }, inject) => {
  inject('youtube', module)
}
