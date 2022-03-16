<template>
  <div>
    <video controls autoplay :src="vidSrc" width="100%" height="300vh" />
    {{ vidSrc }}
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
      this.vidSrc = data;
    })
  }
}
</script>
