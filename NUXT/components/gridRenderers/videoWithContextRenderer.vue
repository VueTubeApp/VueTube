<template>
  <base-video-renderer
    :vidId="video.videoId"
    :thumbnails="video.thumbnail.thumbnails"
    :thumbnailOverlayStyle="
      video.thumbnailOverlays[0]?.thumbnailOverlayTimeStatusRenderer?.style
    "
    :thumbnailOverlayText="
      video.thumbnailOverlays[0]?.thumbnailOverlayTimeStatusRenderer?.text
        .runs[0].text
    "
    :channelUrl="
      $rendererUtils.getNavigationEndpoints(
        video.shortBylineText.runs[0].navigationEndpoint
      )
    "
    :channelIcon="
      video.channelThumbnail.channelThumbnailWithLinkRenderer.thumbnail
        .thumbnails[0].url
    "
    :titles="video.headline.runs"
    :bottomText="parseBottom(video)"
  >
  </base-video-renderer>
</template>

<script>
import baseVideoRenderer from "~/UtilRenderers/baseVideoRenderer.vue";
export default {
  props: ["video"],

  components: {
    baseVideoRenderer,
  },

  methods: {
    parseBottom(video) {
      const bottomText = [
        video.shortBylineText?.runs[0].text,
        video.shortViewCountText?.runs[0].text,
      ];
      if (video.publishedTimeText?.runs[0].text)
        bottomText.push(video.publishedTimeText?.runs[0].text);
      return bottomText.join(" · ");
    },
  },
};
</script>
