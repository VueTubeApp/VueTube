<template>
  <div>
    <!--   Video Loading Animation   -->
    <center v-if="videos.length == 0">
      <v-skeleton-loader type="card-avatar, article, actions" />
      <v-skeleton-loader type="card-avatar, article, actions" />
    </center>

    <v-list-item v-for="(video, index) in videos" :key="index">
      <v-card class="entry" :to="`/watch?v=${video.id}`">
        <v-card-text>
          <div style="position: relative" class="thumbnail-container">
            <v-img :src="thumbnailURL(video)" max-height="50vh" :aspect-ratio="1.7778" />
            <div
              class="videoRuntimeFloat"
              style="color: #fff"
              v-text="video.metadata ? video.metadata.overlay[0] : video.runtime"
            />
          </div>
          <div style="margin-top: 0.5em" v-text="video.title" />
          <div v-text="parseBottom(video)" />
        </v-card-text>
      </v-card>
    </v-list-item>
  </div>
</template>

<style scoped>
.entry {
  margin-top: 1em;
  width: 100%; /* Prevent Loading Weirdness */
}
.videoRuntimeFloat {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 0 3px 0 3px;
}
@media screen and (orientation: landscape) {
  .thumbnail-container {
    width: 250px;
    float: left;
    margin-right: 20px;
    margin-bottom: 16px;
  }
}
</style>

<script>
export default {
  props: {
    videos: Array,
  },

  methods: {
    parseBottom(video) {
      // Specific field names vary by where innertube API is called from
      const bottomText = [];
      if (video.channel) bottomText.push(video.channel); // home and watch views
      if (video.metadata) {
        bottomText.push(video.metadata.views); // home and watch views
        if (video.metadata.published) bottomText.push(video.metadata.published); // home view only
      } else {
        bottomText.push(video.views); // search view only
        bottomText.push(video.uploaded); // search view only
      }
      return bottomText.join(" • ");
    },

    thumbnailURL(video) {
      // Specific field names vary by where innertube API is called from
      console.log(video.thumbnail, video.thumbnails);
      if (video.thumbnail) return video.thumbnail; // home and watch views
      else if (video.thumbnails && video.thumbnails.length) {
        return video.thumbnails[video.thumbnails.length - 1].url; // search view
      }
      else return ""; // this shouldn't happen
    }
  },
};
</script>
