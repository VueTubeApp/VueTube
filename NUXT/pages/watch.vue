<template>
  <div>
    <video controls autoplay :src="vidSrc" width="100%" height="300vh" />
    <v-card class="ml-2 mr-2 flat light" flat>
      <v-card-title style="padding-top: 0;">{{ title }}</v-card-title>
      <v-card-text>
        <span>{{ views }} views • {{uploaded}}</span><br />
        
        <!--   Scrolling Div For Interactions   --->
        <div style="display: flex;">
          <v-list-item v-for="(item, index) in interactions" :key="index">


            <button class="vertical-button" style="padding: 0; margin: 0;" elevation=0 :disabled="item.disabled">
              <v-icon v-text="item.icon" />
              <div v-text="item.value || item.name" />
            </button>


          </v-list-item>
        </div>
        <!--   End Scrolling Div For Interactions   --->

      </v-card-text>
      <p>{{ description }}</p>
    </v-card>

    <recommended />

  </div>
</template>


<style>
.vertical-button span.v-btn__content {
  flex-direction: column;
  justify-content: space-around;
}
</style>

<script>
import recommended from '../components/recommended.vue';
export default {
  components: { recommended },
  data() {
    return {

      interactions: [
        { name: "Likes", icon: "mdi-thumb-up", action: null, value: this.likes, disabled: true },
        { name: "Dislikes", icon: "mdi-thumb-down", action: null, value: this.dislikes, disabled: true  },
        { name: "Share", icon: "mdi-share", action: null, disabled: true },
      ],

      title: null,
      likes: 100,
      dislikes: null,
      uploaded: null,
      vidSrc: null,
      description: null,
      views: null,
    }
  },
  mounted() {

    this.likes = 100

    this.$youtube.getVid(this.$route.query.v).then(result => {
      console.log('Video info data', result)
      result = result.data;
      console.log(result.streamingData.formats)
      this.vidSrc = result.streamingData.formats[result.streamingData.formats.length-1].url
      this.title = result.videoDetails.title
      this.description = result.videoDetails.shortDescription;
      this.views = result.videoDetails.viewCount;
    });

    
    this.$youtube.getRemainingVideoInfo(this.$route.query.v, (data) => {
      this.likes = data.likes,
      this.uploaded = data.uploadDate;

      this.interactions[0].value = data.likes;
    });
    
    this.$youtube.getReturnYoutubeDislike(this.$route.query.v, (data) => {
      this.dislikes = data.dislikes;
      this.interactions[1].value = data.dislikes;
    });

  }
}
</script>
