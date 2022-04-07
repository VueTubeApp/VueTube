<template>
  <div>
    Redirecting...
  </div>
</template>

<script>
export default {
  layout: "empty",
  mounted() {

    this.$router.push(
      "/watch?v="
      + $nuxt.$route.params.redirect_
    );

  }
}
</script>
