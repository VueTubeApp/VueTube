<template>
  <div>
    <video controls :src="vidSrc" width="100%" height="300vh" />
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
      this.vidSrc = data[data.length-1].url;
    })
  }
}
</script>
