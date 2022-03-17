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
    const { v } = this.$route.query
    console.log(v, this.$youtube.getVid(v))
  }
}
</script>
