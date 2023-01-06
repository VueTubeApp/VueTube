//---   Modules/Imports   ---//
import { Http } from "@capacitor-community/http";
import Innertube from "./innertube";
import constants from "./constants";
import rendererUtils from "./renderers";
import { Buffer } from "buffer";
import iconv from "iconv-lite";
import { Toast } from "@capacitor/toast";

function getEncoding(contentType) {
  const re = /charset=([^()<>@,;:\"/[\]?.=\s]*)/i;
  const content = re.exec(contentType);
  console.log(content);
  return content[1].toLowerCase();
}

const searchModule = {
  logs: new Array(),
  //---   Get YouTube's Search Auto Complete   ---//
  autoComplete(text, callback) {
    Http.get({
      url: `${constants.URLS.YT_SUGGESTIONS}/search?q=${encodeURIComponent(
        text
      )}&client=youtube&ds=yt`,
      responseType: "arraybuffer",
    })
      .then((res) => {
        const contentType = res.headers["Content-Type"];
        // make a new buffer object from res.data
        const buffer = Buffer.from(res.data, "base64");
        // convert res.data from iso-8859-1 to utf-8
        const data = iconv.decode(buffer, getEncoding(contentType));
        callback(data);
      })
      .catch((err) => {
        callback(err);
      });
  },

  getReturnYoutubeDislike(id, callback) {
    Http.request({
      method: "GET",
      url: `https://returnyoutubedislikeapi.com/votes`,
      params: { videoId: id },
    })
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        callback(err);
      });
  },
  getSponsorBlock(id, callback) {
    Http.request({
      method: "GET",
      url: `https://sponsor.ajay.app/api/skipSegments`,
      params: { videoID: id },
    })
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        callback(err);
      });
  },
  showToast(text) {
    Toast.show({ text: text });
  },
};

//---   Recommendations   ---//

let InnertubeAPI;

// Loads Innertube object. This will be the object used in all future Innertube API calls. getAPI Code provided by Lightfire228 (https://github.com/Lightfire228)
// These are just a way for the backend Javascript to communicate with the front end Vue scripts. Essentially a wrapper inside a wrapper
const innertubeModule = {
  async getAPI() {
    if (!InnertubeAPI) {
      InnertubeAPI = await Innertube.createAsync(
        (message, isError, shortMessage) => {
          if (shortMessage) {
            Toast.show({ text: shortMessage });
          }
        }
      );
    }
    return InnertubeAPI;
  },

  async getVid(id) {
    try {
      return await InnertubeAPI.VidInfoAsync(id);
    } catch (error) {
      console.error(error);
    }
  },

  getThumbnail(id, resolution, backupThumbnail) {
    if (resolution == "max") {
      const url = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      let img = new Image();
      img.src = url;
      img.onload = function () {
        if (img.height !== 120) return url;
      };
    }
    if (backupThumbnail[backupThumbnail.length - 1])
      return backupThumbnail[backupThumbnail.length - 1].url;
    else return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  },

  async getChannel(url) {
    try {
      const response = await InnertubeAPI.getChannelAsync(url);
      return response.data;
    } catch (error) {}
  },

  // It just works™
  // Front page recommendation
  async recommend() {
    const response = await InnertubeAPI.getRecommendationsAsync();

    if (!response.success)
      throw new Error("An error occurred and innertube failed to respond");

    const contents =
      response.data.contents.singleColumnBrowseResultsRenderer.tabs[0]
        .tabRenderer.content.sectionListRenderer.contents;
    const final = contents.map((shelves) => {
      const video = shelves.shelfRenderer?.content?.horizontalListRenderer;

      if (video) return video;
    });
    const continuations =
      response.data.contents.singleColumnBrowseResultsRenderer.tabs[0]
        .tabRenderer.content.sectionListRenderer.continuations;
    console.log({ continuations: continuations, contents: final });
    return { continuations: continuations, contents: final };
  },

  async recommendContinuation(continuation, endpoint) {
    const response = await this.getContinuation(continuation, endpoint);
    const contents =
      response.data.continuationContents.sectionListContinuation.contents;
    const final = contents.map((shelves) => {
      const video = shelves.shelfRenderer?.content?.horizontalListRenderer;
      if (video) return video;
    });
    const continuations =
      response.data.continuationContents.sectionListContinuation.continuations;
    return { continuations: continuations, contents: final };
  },

  async getContinuation(continuation, endpoint, mode = "android") {
    let contextAdditional = {};
    if (mode.toLowerCase() == "web") {
      contextAdditional = {
        ...contextAdditional,
        ...{
          client: {
            clientName: constants.YT_API_VALUES.CLIENT_WEB_D,
            clientVersion: constants.YT_API_VALUES.VERSION_WEB,
          },
        },
      };
    }
    return await InnertubeAPI.getContinuationsAsync(
      continuation,
      endpoint,
      contextAdditional
    );
  },

  async search(query) {
    try {
      const response = await InnertubeAPI.getSearchAsync(query);
      return response.contents.sectionListRenderer;
    } catch (err) {}
  },

  async saveApiStats(query, url) {
    await InnertubeAPI.apiStats(query, url);
  },
};

//---   Start   ---//
export default ({ app }, inject) => {
  inject("youtube", { ...searchModule, ...innertubeModule });
  inject("rendererUtils", rendererUtils);
};
