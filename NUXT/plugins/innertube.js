// Code specific to working with the innertube API
// https://www.youtube.com/youtubei/v1

import { Http } from "@capacitor-community/http";
import { getBetweenStrings } from "./utils";
import constants from "./constants";

class Innertube {
  //--- Initiation ---//

  constructor(ErrorCallback) {
    this.ErrorCallback = ErrorCallback || undefined;
    this.retry_count = 0;
  }

  checkErrorCallback() {
    return typeof this.ErrorCallback === "function";
  }

  async initAsync() {
    const html = await Http.get({
      url: constants.URLS.YT_URL,
      params: { hl: "en" },
    }).catch((error) => error);
    try {
      if (html instanceof Error && this.checkErrorCallback)
        this.ErrorCallback(html.message, true);
      try {
        const data = JSON.parse(
          getBetweenStrings(html.data, "ytcfg.set(", ");")
        );
        if (data.INNERTUBE_CONTEXT) {
          this.key = data.INNERTUBE_API_KEY;
          this.context = data.INNERTUBE_CONTEXT;
          this.logged_in = data.LOGGED_IN;

          this.context.client = constants.INNERTUBE_CLIENT(this.context.client);
          this.header = constants.INNERTUBE_HEADER(this.context.client);
        }
      } catch (err) {
        console.log(err);
        if (this.checkErrorCallback) this.ErrorCallback(err, true);
        if (this.retry_count >= 10) {
          this.initAsync();
        } else {
          if (this.checkErrorCallback)
            this.ErrorCallback("Failed to retrieve Innertube session", true);
        }
      }
    } catch (error) {
      this.ErrorCallback(error, true);
    }
  }

  static async createAsync(ErrorCallback) {
    const created = new Innertube(ErrorCallback);
    await created.initAsync();
    return created;
  }

  //--- API Calls ---//

  async browseAsync(action_type) {
    let data = { context: this.context };

    switch (action_type) {
      case "recommendations":
        data.browseId = "FEwhat_to_watch";
        break;
      case "playlist":
        data.browseId = args.browse_id;
        break;
      default:
    }

    console.log(data);

    const response = await Http.post({
      url: `${constants.URLS.YT_BASE_API}/browse?key=${this.key}`,
      data: data,
      headers: { "Content-Type": "application/json" },
    }).catch((error) => error);

    if (response instanceof Error)
      return {
        success: false,
        status_code: response.status,
        message: response.message,
      };

    return {
      success: true,
      status_code: response.status,
      data: response.data,
    };
  }

  static getThumbnail(id, resolution) {
    if (resolution == "max") {
      const url = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      let img = new Image();
      img.src = url;
      img.onload = function () {
        if (img.height !== 120) return url;
      };
    }
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }

  async getVidAsync(id) {
    let data = { context: this.context, videoId: id };
    const response = await Http.get({
      url: `https://m.youtube.com/watch?v=${id}&pbj=1`,
      params: {},
      headers: Object.assign(this.header, {
        referer: `https://m.youtube.com/watch?v=${id}`,
        "x-youtube-client-name": constants.YT_API_VALUES.CLIENT_WEB,
        "x-youtube-client-version": constants.YT_API_VALUES.VERSION_WEB,
      }),
    }).catch((error) => error);

    const responseMobile = await Http.post({
      url: `${constants.URLS.YT_BASE_API}/player?key=${this.key}`,
      data: data,
      headers: constants.INNERTUBE_HEADER(this.context),
    }).catch((error) => error);

    if (response instanceof Error)
      return {
        success: false,
        status_code: response.response.status,
        message: response.message,
      };

    return {
      success: true,
      status_code: response.status,
      data: { webOutput: response.data, appOutput: responseMobile.data },
    };
  }

  // Simple Wrappers
  async getRecommendationsAsync() {
    const rec = await this.browseAsync("recommendations");
    console.log(rec.data);
    return rec;
  }

  async VidInfoAsync(id) {
    let response = await this.getVidAsync(id);

    if (
      response.success &&
      response.data.webOutput[2].playerResponse?.playabilityStatus?.status ==
        ("ERROR" || undefined)
    )
      throw new Error(
        `Could not get information for video: ${response[2].playerResponse?.playabilityStatus?.status} - ${response[2].playerResponse?.playabilityStatus?.reason}`
      );
    const responseWeb = response.data.webOutput;
    const responseApp = response.data.appOutput;
    const details = responseWeb[2].playerResponse?.videoDetails;
    const microformat =
      responseWeb[2].playerResponse?.microformat?.playerMicroformatRenderer;
    const renderedPanels = responseWeb[3].response?.engagementPanels;
    const columnUI =
      responseWeb[3].response?.contents.singleColumnWatchNextResults?.results
        ?.results;
    const resolutions = responseApp.streamingData;

    console.log(columnUI.contents.length);

    return {
      id: details.videoId,
      title: details.title || microformat.title?.runs[0].text,
      isLive:
        details.isLiveContent ||
        microformat.liveBroadcastDetails?.isLiveNow ||
        false,
      channelName: details.author || microformat.ownerChannelName,
      channelUrl: microformat.ownerProfileUrl,
      availableResolutions: resolutions?.formats,
      availableResolutionsAdaptive: resolutions?.adaptiveFormats,
      metadata: {
        description: microformat.description?.runs[0].text,
        descriptionShort: details.shortDescription,
        thumbnails:
          details.thumbnails?.thumbnails || microformat.thumbnails?.thumbnails,
        isFamilySafe: microformat.isFamilySafe,
        availableCountries: microformat.availableCountries,
        liveBroadcastDetails: microformat.liveBroadcastDetails,
        uploadDate: microformat.uploadDate,
        publishDate: microformat.publishDate,
        isPrivate: details.isPrivate,
        viewCount: details.viewCount || microformat.viewCount,
        lengthSeconds: details.lengthSeconds || microformat.lengthSeconds,
        likes: parseInt(
          columnUI?.contents[1].slimVideoMetadataSectionRenderer?.contents[1].slimVideoActionBarRenderer?.buttons[0].slimMetadataToggleButtonRenderer?.button?.toggleButtonRenderer?.defaultText?.accessibility?.accessibilityData?.label?.replace(
            /\D/g,
            ""
          )
        ), // Yes. I know.
      },
      renderedData: {
        description:
          renderedPanels[0].engagementPanelSectionListRenderer?.content
            .structuredDescriptionContentRenderer?.items[1]
            .expandableVideoDescriptionBodyRenderer?.descriptionBodyText.runs,
        recommendations:
          columnUI?.contents[columnUI.contents.length - 1].itemSectionRenderer
            ?.contents,
      },
    };
  }
}

export default Innertube;
