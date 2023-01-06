// Code specific to working with the innertube API
// https://www.youtube.com/youtubei/v1

import { Http } from "@capacitor-community/http";
import { getBetweenStrings, delay } from "./utils";
import rendererUtils from "./renderers";
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
        if (this.checkErrorCallback) {
          this.ErrorCallback(html.data, true);
          this.ErrorCallback(err, true);
        }
        if (this.retry_count < 10) {
          this.retry_count += 1;
          if (this.checkErrorCallback)
            this.ErrorCallback(
              `retry count: ${this.retry_count}`,
              false,
              `An error occurred while trying to init the innertube API. Retrial number: ${this.retry_count}/10`
            );
          await delay(5000);
          await this.initAsync();
        } else {
          if (this.checkErrorCallback)
            this.ErrorCallback(
              "Failed to retrieve Innertube session",
              true,
              "An error occurred while retrieving the innertube session. Check the Logs for more information."
            );
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

  async browseAsync(action_type, args = {}) {
    let data = { context: this.context };

    switch (action_type) {
      case "recommendations":
        args.browseId = "FEwhat_to_watch";
        break;
      case "playlist":
      case "channel":
        if (args && args.browseId) {
          break;
        } else {
          throw new ReferenceError("No browseId provided");
        }
      default:
    }
    data = { ...data, ...args };

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

  async getContinuationsAsync(continuation, type, contextAdditional = {}) {
    let data = {
      context: { ...this.context, ...contextAdditional },
      continuation: continuation,
    };
    let url;
    switch (type.toLowerCase()) {
      case "browse":
        url = `${constants.URLS.YT_BASE_API}/browse?key=${this.key}`;
        break;
      case "search":
        url = `${constants.URLS.YT_BASE_API}/search?key=${this.key}`;
        break;
      case "next":
        url = `${constants.URLS.YT_BASE_API}/next?key=${this.key}`;
        break;
      default:
        throw "Invalid type";
    }

    const response = await Http.post({
      url: url,
      data: data,
      headers: { "Content-Type": "application/json" },
    }).catch((error) => error);
    if (response instanceof Error) {
      return {
        success: false,
        status_code: response.status,
        message: response.message,
      };
    }
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
      data: {
        ...data,
        ...{
          context: {
            client: {
              clientName: constants.YT_API_VALUES.CLIENT_WEB_M,
              clientVersion: constants.YT_API_VALUES.VERSION_WEB,
            },
          },
        },
      },
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

  async getEndPoint(url) {
    let data = { context: this.context, url: url };
    const response = await Http.post({
      url: `${constants.URLS.YT_BASE_API}/navigation/resolve_url?key=${this.key}`,
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

  // WARNING: This is tracking the user's activity, but is required for recommendations to properly work
  async apiStats(params, url) {
    console.log(params);
    await Http.get({
      url: url,
      params: {
        ...params,
        ...{
          ver: 2,
          c: constants.YT_API_VALUES.CLIENTNAME.toLowerCase(),
          cbrver: constants.YT_API_VALUES.VERSION,
          cver: constants.YT_API_VALUES.VERSION,
        },
      },
      headers: this.header,
    });
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
    return rec;
  }

  async getChannelAsync(url) {
    const channelEndpoint = await this.getEndPoint(url);
    if (
      channelEndpoint.success &&
      channelEndpoint.data.endpoint?.browseEndpoint
    ) {
      return await this.browseAsync(
        "channel",
        channelEndpoint.data.endpoint?.browseEndpoint
      );
    } else {
      throw new ReferenceError("Cannot find channel");
    }
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
    const vidMetadata = columnUI.contents.find(
      (content) => content.slimVideoMetadataSectionRenderer
    ).slimVideoMetadataSectionRenderer;

    const recommendations = columnUI?.contents.find(
      (content) => content?.itemSectionRenderer?.targetId == "watch-next-feed"
    ).itemSectionRenderer;

    const ownerData = vidMetadata.contents.find(
      (content) => content.slimOwnerRenderer
    )?.slimOwnerRenderer;

    const vidData = {
      id: details.videoId,
      title: details.title,
      isLive: details.isLiveContent,
      channelName: details.author,
      channelSubs: ownerData?.collapsedSubtitle?.runs[0]?.text,
      channelUrl: rendererUtils.getNavigationEndpoints(
        ownerData.navigationEndpoint
      ),
      channelImg: ownerData?.thumbnail?.thumbnails[0].url,
      availableResolutions: resolutions?.formats,
      availableResolutionsAdaptive: resolutions?.adaptiveFormats,
      metadata: {
        contents: vidMetadata.contents,
        description: details.shortDescription,
        thumbnails: details.thumbnails?.thumbnails,
        isPrivate: details.isPrivate,
        viewCount: details.viewCount,
        lengthSeconds: details.lengthSeconds,
        // likes: parseInt(
        //   vidMetadata.contents
        //     .find((content) => content.slimVideoActionBarRenderer)
        //     .slimVideoActionBarRenderer.buttons.find(
        //       (button) => button.slimMetadataToggleButtonRenderer.isLike
        //     )
        //     .slimMetadataToggleButtonRenderer.button.toggleButtonRenderer.defaultText.accessibility.accessibilityData.label.replace(
        //       /\D/g,
        //       ""
        //     )
        // ), // Yes. I know.
        likes: "broken",
        // NOTE: likes are pulled from RYD for now untill extractor is fixed
      },
      renderedData: {
        description: responseNext.engagementPanels
          .find(
            (panel) =>
              panel.engagementPanelSectionListRenderer.panelIdentifier ==
              "video-description-ep-identifier"
          )
          .engagementPanelSectionListRenderer.content.structuredDescriptionContentRenderer.items.find(
            (item) => item.expandableVideoDescriptionBodyRenderer
          ).expandableVideoDescriptionBodyRenderer,
        recommendations: recommendations,
        recommendationsContinuation:
          recommendations.contents[recommendations.contents.length - 1]
            .continuationItemRenderer?.continuationEndpoint.continuationCommand
            .token,
      },
      engagementPanels: responseNext.engagementPanels,
      commentData: columnUI.contents
        .find((content) => content.itemSectionRenderer?.contents)
        ?.itemSectionRenderer.contents.find(
          (content) => content.commentsEntryPointHeaderRenderer
        )?.commentsEntryPointHeaderRenderer,
      playbackTracking: responseInfo.playbackTracking,
      commentContinuation: responseNext.engagementPanels
        .find(
          (panel) =>
            panel.engagementPanelSectionListRenderer.panelIdentifier ==
            "engagement-panel-comments-section"
        )
        ?.engagementPanelSectionListRenderer.content.sectionListRenderer.contents.find(
          (content) => content.itemSectionRenderer
        )
        ?.itemSectionRenderer.contents.find(
          (content) => content.continuationItemRenderer
        )?.continuationItemRenderer.continuationEndpoint.continuationCommand
        .token,
    };

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
