import Innertube from "./innertube";
import constants from "./constants";

// Pointer object, give a key and it will return with a method
function useRender (video, renderer) {
    switch(renderer) {
        case "videoWithContextRenderer":
            return videoWithContextRenderer(video)
        case "gridVideoRenderer":
            return gridVideoRenderer(video)
        case "compactAutoplayRenderer":
            return compactAutoplayRenderer(video)
        default:
            return undefined
    }
}

function gridVideoRenderer(video) {
    return {
        id: video.videoId,
        title: video.title?.runs[0].text,
        thumbnail: Innertube.getThumbnail(video.videoId, "max"),
        channel: video.shortBylineText?.runs[0] ? video.shortBylineText.runs[0].text : video.longBylineText?.runs[0].text,
        channelId: (video.shortBylineText?.runs[0] ? video.shortBylineText.runs[0] : video.longBylineText?.runs[0]).navigationEndpoint?.browseEndpoint?.browseId,
        channelURL: `${constants.YT_URL}/${(video.shortBylineText?.runs[0] ? video.shortBylineText.runs[0] : video.longBylineText?.runs[0]).navigationEndpoint?.browseEndpoint?.canonicalBaseUrl}`,
        channelThumbnail: video.channelThumbnail?.thumbnails[0],
        metadata: {
            published: video.publishedTimeText?.runs[0].text,
            views: video.shortViewCountText?.runs[0].text,
            length: video.lengthText?.runs[0].text,
            overlayStyle: video.thumbnailOverlays?.map(overlay => overlay.thumbnailOverlayTimeStatusRenderer?.style),
            overlay: video.thumbnailOverlays?.map(overlay => overlay.thumbnailOverlayTimeStatusRenderer?.text.runs[0].text),
        },
    };
}

function videoWithContextRenderer(video) {
    return {
        id: video.videoId,
        title: video.headline?.runs[0].text,
        thumbnail: Innertube.getThumbnail(video.videoId, "max"),
        channel: video.shortBylineText?.runs[0].text,
        channelURL: video.channelThumbnail?.channelThumbnailWithLinkRenderer?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl,
        channelId: video.channelThumbnail?.channelThumbnailWithLinkRenderer?.navigationEndpoint?.browseEndpoint?.browseId,
        channelThumbnail: video.channelThumbnail?.channelThumbnailWithLinkRenderer?.thumbnail.thumbnails[0].url,
        metadata: {
            views: video.shortViewCountText?.runs[0].text,
            length: video.lengthText?.runs[0].text,
            overlayStyle: video.thumbnailOverlays?.map(overlay => overlay.thumbnailOverlayTimeStatusRenderer?.style),
            overlay: video.thumbnailOverlays?.map(overlay => overlay.thumbnailOverlayTimeStatusRenderer?.text.runs[0].text),
            isWatched: video.isWatched,
        },
    }
}
function compactAutoplayRenderer(video) {
    video = video.contents
    if (video) return video.map((item) => {
        const itemRenderer = useRender[Object.keys(item)[0]]
        if (item) return itemRenderer(item[Object.keys(item)[0]])
        else return undefined
    })
}    

export default useRender