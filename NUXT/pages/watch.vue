<template>
  <div>
    <video controls :src="vidSrc" width="100%" height="300vh" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      vidSrc: "https://api.celeste.photos/squish.mp4"
    }
  }
}
</script>
