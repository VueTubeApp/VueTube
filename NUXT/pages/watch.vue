<template>
  <div>
    <video controls autoplay :src="vidSrc" width="100%" height="300vh" />
    <v-card class="ml-2 mr-2 flat light">
      <h2>{{ vidTitle }}</h2>
      <span>{{ vidViews }} views • Published {{ uploaded }}</span>
      {{ likes }} Likes / {{ ryd.dislikes }} Dislikes
      <v-divider></v-divider>
      <h3>{{ author.name }}
      <v-img width="40px" :src="author.thumbnails[0].url" />
      </h3>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vidSrc: ""
    }
  },
  mounted() {
    this.$youtube.getVideo('wykQsTJElD4', (data) => {
      this.vidTitle = data.title;
      this.vidViews = data.views;
      this.author = data.author;
      this.uploaded = data.uploaded;
      this.vidSrc = data.url;
      this.visDescription = data.description;
      this.likes = data.likes;
      this.ryd = data.ryd;
    })
  }
}
</script>
