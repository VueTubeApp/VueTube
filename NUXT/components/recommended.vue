// Buttons and methods for testing and demonstration purposes only. Uncomment them to see how it works. Remove to actually implement a implementation

<template>
  <div>

    <!--   Video Loading Animation   -->
    <center v-if="recommends.length == 0">
      <v-skeleton-loader type="card-avatar, article, actions" />
      <v-skeleton-loader type="card-avatar, article, actions" />
    </center>


    <v-list-item v-for="(video, index) in recommends[0]" :key="index">
      <v-card class="entry" :to="`/watch?v=${video.id}`">
        <v-card-text>
          <div style="position: relative">
            <v-img :src="video.thumbnail" />
            <div v-text="video.metadata.overlay[0]" class="videoRuntimeFloat" style="color: #fff" />
          </div>
          <div v-text="video.title" style="margin-top: 0.5em" />
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
</style>

<script>
export default {
  data() {
    return {
      recommends: [],
    };
  },

  // The following code is only a demo for debugging purposes, note that each "shelfRenderer" has a "title" value that seems to align to the categories at the top of the vanilla yt app

  mounted() {
    this.$youtube
      .recommend()
      .then((result) => {
        console.log(result);
        if (result) this.recommends = result;
      })
      .catch((error) => this.$logger("Home Page", error, true));
  },

  methods: {
    parseBottom(video) {
      const bottomText = [video.channel, video.metadata.views];
      if (video.metadata.published) bottomText.push(video.metadata.published);
      return bottomText.join(" • ");
    },
  },
};
</script>