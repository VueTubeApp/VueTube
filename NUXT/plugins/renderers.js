import Innertube from "./innertube";
import constants from "./constants";

// Pointer object, give a key and it will return with a method
function useRender(video, renderer) {
  switch (renderer) {
    case "videoWithContextRenderer":
      return videoWithContextRenderer(video);
    case "gridVideoRenderer":
      return gridVideoRenderer(video);
    case "compactAutoplayRenderer":
      return compactAutoplayRenderer(video);
    case "compactVideoRenderer":
      return compactVideoRenderer(video);
    default:
      return undefined;
  }
}

function gridVideoRenderer(video) {
  return {
    id: video.videoId,
    title: video.title?.runs[0].text,
    thumbnail: Innertube.getThumbnail(video.videoId, "max"),
    channel: video.shortBylineText?.runs[0]
      ? video.shortBylineText.runs[0].text
      : video.longBylineText?.runs[0].text,
    channelId: (video.shortBylineText?.runs[0]
      ? video.shortBylineText.runs[0]
      : video.longBylineText?.runs[0]
    ).navigationEndpoint?.browseEndpoint?.browseId,
    channelURL: `${constants.YT_URL}/${
      (video.shortBylineText?.runs[0]
        ? video.shortBylineText.runs[0]
        : video.longBylineText?.runs[0]
      ).navigationEndpoint?.browseEndpoint?.canonicalBaseUrl
    }`,
    channelThumbnail: video.channelThumbnail?.thumbnails[0],
    metadata: {
      published: video.publishedTimeText?.runs[0].text,
      views: video.shortViewCountText?.runs[0].text,
      length: video.lengthText?.runs[0].text,
      overlayStyle: video.thumbnailOverlays?.map(
        (overlay) => overlay.thumbnailOverlayTimeStatusRenderer?.style
      ),
      overlay: video.thumbnailOverlays?.map(
        (overlay) =>
          overlay.thumbnailOverlayTimeStatusRenderer?.text.runs[0].text
      ),
    },
  };
}

function compactAutoplayRenderer(video) {
  video = video.contents;
  let item;
  if (video) item = video[0];
  if (item) return useRender(item[Object.keys(item)[0]], Object.keys(item)[0]);
  else return undefined;
}

function compactVideoRenderer(video) {
  return {
    id: video.videoId,
    title: video.title?.runs[0].text,
    thumbnail: Innertube.getThumbnail(video.videoId, "max"),
    channel: video.shortBylineText?.runs[0].text,
    channelURL:
      video.shortBylineText?.runs[0].navigationEndpoint?.browseEndpoint
        ?.canonicalBaseUrl,
    channelThumbnail: video.channelThumbnail?.thumbnails[0].url,
    metadata: {
      views: video.viewCountText?.runs[0].text,
      length: video.lengthText?.runs[0].text,
      publishedTimeText: video.publishedTimeText.runs[0].text,
      overlayStyle: video.thumbnailOverlays?.map(
        (overlay) => overlay.thumbnailOverlayTimeStatusRenderer?.style
      ),
      overlay: video.thumbnailOverlays?.map(
        (overlay) =>
          overlay.thumbnailOverlayTimeStatusRenderer?.text.runs[0].text
      ),
    },
  };
}

export default useRender;
