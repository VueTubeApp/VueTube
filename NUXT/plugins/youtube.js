//---   Modules/Imports   ---//
import { Http } from "@capacitor-community/http";
import Innertube from "./innertube";
import constants from "./constants";
import rendererUtils from "./renderers";
import { Buffer } from "buffer";

//---   Logger Function   ---//
function logger(func, data, isError = false) {
  searchModule.logs.unshift({
    name: func,
    time: Date.now(),
    data: data,
    error: isError,
  });
}

function getEncoding(contentType) {
  const re = /charset=([^()<>@,;:\"/[\]?.=\s]*)/i;
  const content = re.exec(contentType);
  console.log(content);
  if (!content || content[1].toLowerCase() == "utf-8") {
    return "utf8";
  }
  if (content[1].toLowerCase() == "iso-8859-1") {
    return "latin1";
  }
  if (content[1].toLowerCase() == "utf16le") {
    return "utf16le";
  }
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
        const data = buffer.toString(getEncoding(contentType));
        logger(constants.LOGGER_NAMES.autoComplete, data);
        callback(data);
      })
      .catch((err) => {
        logger(constants.LOGGER_NAMES.autoComplete, err, true);
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
        logger("rydData", res.data);
        callback(res.data);
      })
      .catch((err) => {
        logger("codeRun", err, true);
        callback(err);
      });
  },
};

//---   Recommendations   ---//

let InnertubeAPI;

// Loads Innertube object. This will be the object used in all future Innertube API calls. getAPI Code provided by Lightfire228 (https://github.com/Lightfire228)
// These are just a way for the backend Javascript to communicate with the front end Vue scripts. Essentially a wrapper inside a wrapper
const innertubeModule = {
  async getAPI() {
    if (!InnertubeAPI) {
      InnertubeAPI = await Innertube.createAsync((message, isError) => {
        logger(constants.LOGGER_NAMES.innertube, message, isError);
      });
    }
    return InnertubeAPI;
  },

  async getVid(id) {
    try {
      return await InnertubeAPI.VidInfoAsync(id);
    } catch (error) {
      logger(constants.LOGGER_NAMES.watch, error, true);
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
    console.log(final);
    return final;
  },

  async search(query) {
    try {
      const response = await InnertubeAPI.getSearchAsync(query);
      return response.contents.sectionListRenderer;
    } catch (err) {
      logger(constants.LOGGER_NAMES.search, err, true);
    }
  },
};

//---   Start   ---//
export default ({ app }, inject) => {
  inject("youtube", { ...searchModule, ...innertubeModule });
  inject("logger", logger);
  inject("rendererUtils", rendererUtils);
};
logger(constants.LOGGER_NAMES.init, "Program Started");
