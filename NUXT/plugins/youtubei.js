const module = {
  search(phrase, type, callback) {
    const ytclient = require("youtubei").Client;
    const youtube = new ytclient();

    youtube.search(phrase, { type: "video" }).then((results) => {
      callback(results);
    });
  }
}

export default ({ app }, inject) => {
  inject('youtube', module)
}
