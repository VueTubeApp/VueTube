<template>
  <div>
    <video controls autoplay :src="vidSrc" width="100%" height="300vh" />
    <v-card class="ml-2 mr-2 flat light">
      <h2>{{ title }}</h2>
      <span>{{ views }} views • Published {{ uploaded }}</span>
      {{ likes }} Likes / {{ dislikes }} Dislikes
      <p>{{ description }}</p>
      </h3>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: this.likes,
      uploaded: this.uploaded,
      dislikes: this.dislikes,
      vidSrc: this.vidSrc,
      description: this.description,
      views: this.views
    }
  },
  mounted() {
      
    this.$youtube.getVid(this.$route.query.v).then(result => {
      console.log('Video info data')
      console.log(result);
      this.vidSrc = result.streamingData.formats[0].url
      this.title = result.videoDetails.title
      this.description = result.videoDetails.shortDescription;
      this.views = result.videoDetails.viewCount;
    });

    
    this.$youtube.getRemainingVideoInfo(this.$route.query.v, (data) => {
      this.likes = data.likes,
      this.uploaded = data.uploadDate;
    });
    
    this.$youtube.getReturnYoutubeDislike(this.$route.query.v, (data) => {
      this.dislikes = data.dislikes;
    });

  }
}
</script>
