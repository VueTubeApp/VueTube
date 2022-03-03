<template>
  <div>
    <div v-text="information" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      information: ""
    }
  },
  mounted() {
    const vm = this;
    this.$youtube.search("TEST", (data) => {
      vm.information = data;
    })
  }
}
</script>
