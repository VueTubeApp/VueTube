<template>
  <!--
  * Videos are now polled from '~/components/videoList.vue'
  * This is to allow listing videos on other pages such as /watch
  * -Front
  * Edit by etekweb: renamed to videoList and included in search.vue as well
  * -->
  <videoList :videos="recommends" />
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
        if (result) this.recommends = result[0];
      })
      .catch((error) => this.$logger("Home Page", error, true));
  },
};
</script>
