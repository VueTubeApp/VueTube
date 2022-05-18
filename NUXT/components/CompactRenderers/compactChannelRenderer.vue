<template>
  <v-card
    flat
    to="/channel"
    class="entry gridVideoRenderer background"
    :class="
      roundThumb && roundTweak > 0
        ? $vuetify.theme.dark
          ? 'background lighten-1'
          : 'background darken-1'
        : ''
    "
    :style="{
      borderRadius: roundThumb ? `${roundTweak / 2}rem` : '0',
      margin:
        roundThumb && roundTweak > 0 ? '0 1rem 1rem 1rem' : '0 0 0.25rem 0',
    }"
    @click="$store.dispatch('channel/fetchChannel', video.channelId)"
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
      <v-card-text class="video-info pt-2 pb-0" v-emoji>
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

<script>
export default {
  props: ["video"],
  computed: {
    roundTweak() {
      return this.$store.state.tweaks.roundTweak;
    },
    roundThumb() {
      return this.$store.state.tweaks.roundThumb;
    },
  },
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
