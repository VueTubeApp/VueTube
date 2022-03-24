<template>
  <div>


    <video
        controls
        autoplay
        :src="vidSrc"
        width="100%"
        @webkitfullscreenchange="handleFullscreenChange"
        ref="player"
        style="max-height: 50vh"
    />


  </div>
</template>

<script>
  export default {
    props: [
        "vidSrc"
    ],

    methods: {
      handleFullscreenChange() {
        if (document.fullscreenElement === this.$refs.player) {
          this.$vuetube.statusBar.hide();
          this.$vuetube.navigationBar.hide();
        } else {
          this.$vuetube.statusBar.show();
          this.$vuetube.navigationBar.show();
        }
      },
    }
  }

</script>
