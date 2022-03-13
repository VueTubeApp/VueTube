<template>
  <div>
    <script src="https://cdn.jsdelivr.net/gh/thelevicole/youtube-to-html5-loader@4.0.1/dist/YouTubeToHtml5.js"></script>
    <video :data-yt2html5="`https://www.youtube.com/watch?v=${id}`" controls width="100%" height="300vh"></video>
    <p v-html="`https://www.youtube.com/watch?v=${id}`" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: ""
    }
  },
  fetch() {
    this.id = this.$route.query.v;
  },
  mounted() {
    new YouTubeToHtml5({
      withAudio: true
    });
  }
}
</script>
