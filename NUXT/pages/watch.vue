<template>
  <div>
    <video controls autoplay :src="vidSrc" width="100%" height="300vh" />
    <p>[DEBUG] Streaming From: {{ vidSrc }}</p>
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
      const formats = data.formats;
      console.log(data)
      this.vidSrc = formats[formats.length-1].url;
    })
  }
}
</script>
