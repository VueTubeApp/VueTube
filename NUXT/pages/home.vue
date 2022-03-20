<template>
  <!--
  * Videos are now polled from '~/components/recommended.vue'
  * This is to allow use of "recommended" videos on other pages such as /watch
  * -Front
  * -->
  <recommended :recommends="recommends" />
</template>

<script>
export default {
  data() {
    return {
      recommends: [],
    };
  },

  // The following code is only a demo for debugging purposes, note that each "shelfRenderer" has a "title" value that seems to align to the categories at the top of the vanilla yt app

  mounted() {
    this.$youtube
      .recommend()
      .then((result) => {
        console.log(result);
        if (result) this.recommends = result;
      })
      .catch((error) => this.$logger("Home Page", error, true));
  },
};
</script>