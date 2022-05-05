<template>
  <v-card
    class="entry videoRenderer background mb-2"
    :to="`/watch?v=${vidId}`"
    :style="{
      borderRadius: `${roundTweak / 2.5}rem`,
      margin: $store.state.tweaks.roundTweak > 0 ? '1rem' : '0',
    }"
    flat
  >
    <div style="position: relative" class="thumbnail-container overflow-hidden">
      <v-img
        :aspect-ratio="16 / 9"
        :src="$youtube.getThumbnail(vidId, 'max', thumbnails)"
        :style="{
          borderRadius: `${roundTweak / 2.5}rem`,
        }"
      />
      <div
        v-if="thumbnailOverlayText && thumbnailOverlayStyle"
        class="videoRuntimeFloat"
        :class="'style-' + thumbnailOverlayStyle"
        style="color: #fff"
        v-text="thumbnailOverlayText"
      />
    </div>
    <div id="details">
      <a :href="channelUrl" class="avatar-link pl-2 pt-2">
        <v-img class="avatar-thumbnail" :src="channelIcon" />
      </a>
      <v-card-text class="video-info pt-2" v-emoji>
        <span
          v-for="title in titles"
          :key="title.text"
          style="margin-top: 0.5em"
          class="font-weight-medium vid-title"
        >
          {{ title.text }}
        </span>

        <div
          class="background--text text--lighten-5 caption"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
          v-text="bottomText"
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

.videoRuntimeFloat.style-UPCOMING {
  background: rgba(0, 0, 0, 0.5);
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
  computed: {
    roundTweak() {
      return this.$store.state.tweaks.roundTweak;
    },
  },

  props: {
    vidId: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: Array,
      required: true,
    },
    channelUrl: {
      type: String,
      required: true,
    },
    channelIcon: {
      type: String,
      required: true,
    },
    titles: {
      type: Array,
      required: true,
    },
    bottomText: {
      type: String,
      required: true,
    },
    thumbnailOverlayText: {
      type: String,
    },
    thumbnailOverlayStyle: {
      type: String,
    },
  },
};
</script>
