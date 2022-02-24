<template>
<div>
  {{ searchData }}
</div>
</template>

<script>
export default {
  data() {
    return {
      searchData: null
    }
  },
  mounted() {
    // video | playlist | channel | all
    this.$youtube.search("test", "video", function(data) {
      console.log(data)
    })
  }
}
</script>
