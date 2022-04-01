<template>
  <v-card
    class="entry gridVideoRenderer background"
    :to="`/watch?v=${video.videoId}`"
    flat
  >
    <div id="details">
      <a
        :href="
          this.$rendererUtils.getNavigationEndpoints(video.navigationEndpoint)
        "
        class="avatar-link pt-2"
      >
        <v-img
          class="avatar-thumbnail"
          :src="
            video.thumbnail.thumbnails[video.thumbnail.thumbnails.length - 1]
              .url
          "
        />
      </a>
      <v-card-text class="video-info pt-2">
        <div
          v-for="title in video.title.runs"
          :key="title.text"
          style="margin-top: 0.5em"
          class="vid-title"
        >
          {{ title.text }}
        </div>

        <div
          class="caption background--text"
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
  width: 50px;
  height: 50px;
}

#details {
  display: flex;
  flex-direction: row;
  flex-basis: auto;
  padding: 10px;
}

@media screen and (orientation: landscape) {
  .entry {
    margin-bottom: 8px;
  }
  #details {
    flex-direction: column-reverse;
  }
}
</style>

<script>
export default {
  props: ["video"],

  methods: {
    parseBottom(video) {
      const bottomText = [
        video.subscriberCountText?.runs[0].text,
        video.videoCountText?.runs.map((run) => run.text).join(" "),
      ];
      return bottomText.join(" · ");
    },
  },
};
</script>
