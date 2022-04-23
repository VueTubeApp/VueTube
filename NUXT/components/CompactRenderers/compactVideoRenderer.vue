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
      this.$rendererUtils.getNavigationEndpoints(video.shortBylineText.runs[0])
    "
    :channelIcon="video.channelThumbnail.thumbnails[0].url"
    :titles="video.title.runs"
    :bottomText="parseBottom(video)"
  >
  </base-video-renderer>
</template>

<script>
import baseVideoRenderer from "~/components/UtilRenderers/baseVideoRenderer.vue";
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
