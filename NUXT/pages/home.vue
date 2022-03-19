// Buttons and methods for testing and demonstration purposes only. Uncomment them to see how it works. Remove to actually implement a implementation

<template>
  <div>
    <center style="padding-top: 3em" v-if="recommends == null">
      <v-progress-circular size="50" indeterminate color="primary" />
    </center>
    <center>
      <v-list-item v-for="(video, index) in recommends[0]" :key="index">
        <v-card class="entry" :to="`/watch?v=${video.id}`">
          <v-card-text>
            <div style="position: relative">
              <v-img :src="video.thumbnail" />
              <p
                v-text="video.metadata.overlay[0]"
                class="videoRuntimeFloat"
                style="color: #fff"
              />
            </div>
            <div v-text="video.title" style="margin-top: 0.5em" />
            <div v-text="parseBottom(video)" />
          </v-card-text>
        </v-card>
      </v-list-item>
    </center>
  </div>
</template>

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