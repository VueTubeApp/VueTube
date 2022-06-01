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
    let vid = this.video;
    let id = this.videoid;

    vid.addEventListener("loadeddata", (e) => {
      if (vid.readyState >= 3) {
        this.$youtube.getSponsorBlock(id, (data) => {
          console.log(data);

          // iterate over data.segments array
            vid.ontimeupdate = () => {
              data.forEach(function(sponsor) {
                let vidTime = vid.currentTime;

                if (vidTime >= sponsor.segment[0] && vidTime <= sponsor.segment[1]) {
                  console.log("Skipping the sponsor");
                  vid.currentTime = sponsor.segment[1];
                }
              })
            }
        })
      }
    })
  },
};
</script>
