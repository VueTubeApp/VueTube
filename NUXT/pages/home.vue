// Buttons and methods for testing and demonstration purposes only. Uncomment them to see how it works. Remove to actually implement a implementation

<template>
  <div>

    <center style="padding-top: 3em;" v-if="recommends == null">
      <v-progress-circular
        size="50"
        indeterminate
        color="primary"
      />
    </center>
    <center>
      <v-list-item v-for="(video, index) in recommends" :key="index">
        <v-card class="entry" :to="`/watch?v=${video.videoId}`">
          <v-card-text>
            <div style="position: relative;">
              <v-img :src="getThumbnail(video.videoId,'min')" />
              <p v-text="video.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.text.runs[0].text" class="videoRuntimeFloat" style="color: #fff;" />
            </div>
            <div v-text="video.title.runs[0].text" style="margin-top: 0.5em;" />
            <div v-text="`${video.shortViewCountText.runs[0].text} • ${video.publishedTimeText ? video.publishedTimeText.runs[0].text : video.shortViewCountText.runs[1].text}`" />
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
      recommends: null
    }
  },

  // The following code is only a demo for debugging purposes, note that each "shelfRenderer" has a "title" value that seems to align to the categories at the top of the vanilla yt app

  mounted() {
    const vm = this;
    this.$youtube.recommend().then(
      result => {
        const videoList = []
        console.log(result)
        const recommendContent = result.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents // I feel like I've committed programming sin
        recommendContent.forEach(function (contents, index) {
          contents.shelfRenderer.content.horizontalListRenderer.items.forEach(function (item, index) {
            const video = item.gridVideoRenderer
            console.log(video)
            console.log(video.onTap)
            videoList.push(video)
          })
        })
        vm.recommends = videoList;
      }
    ).catch ((error) => {
      this.$logger("Home Page", error, true)
    })
  },

  methods: {
    getThumbnail(id, resolution) {
      return this.$youtube.getThumbnail(id, resolution)
    }
  }
}
</script>