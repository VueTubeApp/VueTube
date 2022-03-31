<template>
  <v-card
    class="entry gridVideoRenderer background"
    :to="`/watch?v=${video.videoId}`"
    flat
  >
    <div style="position: relative" class="thumbnail-container">
      <v-img
        :aspect-ratio="16 / 9"
        :src="
          $youtube.getThumbnail(
            video.videoId,
            'max',
            video.thumbnail.thumbnails
          )
        "
      />
      <div
        class="videoRuntimeFloat"
        :class="
          'style-' +
          video.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.style
        "
        style="color: #fff"
        v-text="
          video.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.text
            .runs[0].text
        "
      />
    </div>
    <div id="details">
      <a
        :href="
          this.$rendererUtils.getNavigationEndpoints(
            video.shortBylineText.runs[0].navigationEndpoint
          )
        "
        class="avatar-link pt-2"
      >
        <v-img
          class="avatar-thumbnail"
          :src="video.channelThumbnail.thumbnails[0].url"
        />
      </a>
      <v-card-text class="video-info pt-2">
        <div
          v-for="title in video.title.runs"
          :key="title.text"
          style="margin-top: 0.5em"
          class="font-weight-medium vid-title"
        >
          {{ title.text }}
        </div>

        <div
          class="background--text caption"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
          v-text="parseBottom(video)"
        />
      </v-card-text>
    </div>
  </v-card>
</template>

<style scoped>
.entry {
  width: 100%; /* Prevent Loading Weirdness */
}
.videoRuntimeFloat {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 5px;
  padding: 0px 4px 0px 4px;
}

.videoRuntimeFloat.style-DEFAULT {
  background: rgba(0, 0, 0, 0.5);
}

.videoRuntimeFloat.style-LIVE {
  background: rgba(255, 0, 0, 0.5);
}

.vid-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

.avatar-thumbnail {
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 50%;
  width: 35px;
  height: 35px;
}

#details {
  display: flex;
  flex-direction: row;
  flex-basis: auto;
}

@media screen and (orientation: landscape) {
  .entry {
    margin-bottom: 8px;
  }
  .thumbnail-container {
    width: 50vh;
    float: left;
  }
  #details {
    flex-direction: column-reverse;
  }
  .avatar-thumbnail {
    margin-top: 0;
    margin-left: 16px;
  }
  .video-info {
    padding-top: 0 !important;
    padding-bottom: 0;
    margin-top: 0;
  }
}
</style>

<script>
export default {
  props: ["video"],

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
