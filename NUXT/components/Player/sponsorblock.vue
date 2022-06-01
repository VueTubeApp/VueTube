<template>
  <div style="display: none"></div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },
    videoid: {
      type: String,
      required: true,
    },
  },
  mounted() {
    let sponsorBlock = [];
    this.$youtube.getSponsorBlock(this.$route.query.v, (data) => {
      sponsorBlock = data.segment;
    });

    this.$refs.player.addEventListener("loadeddata", (e) => {
      console.log("%c loadeddata", "color: #00ff00");

      if (this.$refs.player.readyState >= 3) {
        this.$refs.player.ontimeupdate = () => {
          console.log("%c notinsegment", "color: #00ff00");

          let vidTime = this.$refs.player.currentTime;

          for (let i = 0; i < sponsorBlock.length; i++) {
            console.log("%c loopin", "color: #00ffff");

            if (vidTime > sponsorBlock[i][0] && vidTime < sponsorBlock[0][i]) {
              console.log("%c insegment", "color: #ff0000");

              this.$refs.player.currentTime = sponsorBlock[i][0];
              break;
            }
          }
        };
      }
    });
  },
};
</script>
