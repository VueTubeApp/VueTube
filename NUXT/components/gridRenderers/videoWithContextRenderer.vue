<template>
  <base-video-renderer
    :vidId="video.videoId"
    :thumbnails="video.thumbnail.thumbnails"
    :thumbnailOverlayStyle="thumbnailOverlayStyle"
    :thumbnailOverlayText="thumbnailOverlayText"
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
import baseVideoRenderer from "~/components/UtilRenderers/baseVideoRenderer.vue";
export default {
  props: ["video"],

  components: {
    baseVideoRenderer,
  },

  computed: {
    thumbnailOverlayText() {
      this.video.thumbnailOverlays.forEach((thumbnail) => {
        if (thumbnail.thumbnailOverlayTimeStatusRenderer) {
          return thumbnail.thumbnailOverlayTimeStatusRenderer.text.runs[0].text;
        }
      });
      return "";
    },
    thumbnailOverlayStyle() {
      this.video.thumbnailOverlays.forEach((thumbnail) => {
        if (thumbnail.thumbnailOverlayTimeStatusRenderer) {
          return thumbnail.thumbnailOverlayTimeStatusRenderer.style;
        }
      });
      return "DEFAULT";
    },
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
