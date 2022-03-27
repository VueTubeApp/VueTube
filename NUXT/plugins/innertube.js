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

  async getVidAsync(id) {
    let data = { context: this.context, videoId: id };
    const responseNext = await Http.post({
      url: `${constants.URLS.YT_BASE_API}/next?key=${this.key}`,
      data: data,
      headers: constants.INNERTUBE_HEADER(this.context.client),
    }).catch((error) => error);

    const response = await Http.post({
      url: `${constants.URLS.YT_BASE_API}/player?key=${this.key}`,
      data: data,
      headers: constants.INNERTUBE_HEADER(this.context.client),
    }).catch((error) => error);

    if (response.error)
      return {
        success: false,
        status_code: response.status,
        message: response.message,
      };
    else if (responseNext.error)
      return {
        success: false,
        status_code: responseNext.status,
        message: responseNext.message,
      };

    return {
      success: true,
      status_code: response.status,
      data: { output: response.data, outputNext: responseNext.data },
    };
  }

  async searchAsync(query) {
    let data = { context: this.context, query: query };

    const response = await Http.post({
      url: `${constants.URLS.YT_BASE_API}/search?key=${this.key}`,
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

  // Static methods

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

  // Simple Wrappers
  async getRecommendationsAsync() {
    const rec = await this.browseAsync("recommendations");
    console.log(rec.data);
    return rec;
  }

  async VidInfoAsync(id) {
    let response = await this.getVidAsync(id);

    if (
      response.success == false ||
      response.data.output?.playabilityStatus?.status == ("ERROR" || undefined)
    )
      throw new Error(
        `Could not get information for video: ${
          response.status_code ||
          response.data.output?.playabilityStatus?.status
        } - ${
          response.message || response.data.output?.playabilityStatus?.reason
        }`
      );
    const responseInfo = response.data.output;
    const responseNext = response.data.outputNext;
    const details = responseInfo.videoDetails;
    // const columnUI =
    //   responseInfo[3].response?.contents.singleColumnWatchNextResults?.results
    //     ?.results;
    const resolutions = responseInfo.streamingData;
    const columnUI =
      responseNext.contents.singleColumnWatchNextResults.results.results;

    const vidData = {
      id: details.videoId,
      title: details.title,
      isLive: details.isLiveContent,
      channelName: details.author,
      channelUrl:
        columnUI?.contents[0].slimVideoMetadataSectionRenderer?.contents.find(
          (contents) => contents.elementRenderer
        )?.newElement?.type?.componentType?.model?.channelBarModel
          ?.videoChannelBarData?.onTap?.innertubeCommand?.browseEndpoint
          ?.canonicalBaseUrl,
      channelImg:
        columnUI?.contents[0].slimVideoMetadataSectionRenderer?.contents.find(
          (contents) => contents.elementRenderer
        )?.newElement?.type?.componentType?.model?.channelBarModel
          ?.videoChannelBarData?.avatar?.image?.sources[0].url,
      availableResolutions: resolutions?.formats,
      availableResolutionsAdaptive: resolutions?.adaptiveFormats,
      metadata: {
        description: details.shortDescription,
        thumbnails: details.thumbnails?.thumbnails,
        uploadDate:
          columnUI?.contents[0].slimVideoMetadataSectionRenderer?.contents.find(
            (contents) => contents.slimVideoDescriptionRenderer
          )?.slimVideoDescriptionRenderer.publishDate.runs[0].text,
        isPrivate: details.isPrivate,
        viewCount: details.viewCount,
        lengthSeconds: details.lengthSeconds,
        likes: parseInt(
          columnUI?.contents[0].slimVideoMetadataSectionRenderer?.contents
            .find((contents) => contents.slimVideoScrollableActionBarRenderer)
            ?.slimVideoScrollableActionBarRenderer.buttons.find(
              (button) => button.slimMetadataToggleButtonRenderer.isLike == true
            )
            ?.slimMetadataToggleButtonRenderer?.button.toggleButtonRenderer?.defaultText?.accessibility?.accessibilityData?.label?.replace(
              /\D/g,
              ""
            )
        ), // Yes. I know.
      },
      renderedData: {
        description: columnUI?.contents
          .find((contents) => contents.slimVideoMetadataSectionRenderer)
          .slimVideoMetadataSectionRenderer?.contents.find(
            (contents) => contents.slimVideoDescriptionRenderer
          )?.slimVideoDescriptionRenderer,
        recommendations: columnUI?.contents.find(
          (contents) => contents.shelfRenderer
        ).shelfRenderer,
        recommendationsContinuation:
          columnUI?.continuations[0].reloadContinuationData?.continuation,
      },
    };

    console.log(vidData);

    return vidData;
  }

  async getSearchAsync(query) {
    const search = await this.searchAsync(query);
    if (search.success == false)
      throw new Error(
        `Could not get search results: ${search.status_code} - ${search.message}`
      );
    console.log(search.data);
    return search.data;
  }
}

export default Innertube;
