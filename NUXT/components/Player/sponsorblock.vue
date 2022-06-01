<template>
  <div>
    <!-- <v-progress-linear
      v-for="segment in segments"
      :key="segment.UUID"
      background-opacity="0.5"
      style="width: 100%; background: #ffffff22"
      :background-color="segment.category"
      :buffer-value="(segment.segments[1] / video.duration) * 100"
      :value="(segment.segments[0] / video.duration) * 100"
      color="red"
      height="2"
      :style="
        fullscreen
          ? 'width: calc(100% - 2rem); left: 1rem; position: absolute; bottom: 3rem;'
          : 'width: 100%; left: 0; position: absolute; bottom: 0;'
      "
    /> -->
  </div>
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
  data: () => ({
    segments: [],
  }),
  mounted() {
    let vid = this.video;
    let id = this.videoid;

    vid.addEventListener("loadeddata", (e) => {
      if (vid.readyState >= 3) {
        this.$youtube.getSponsorBlock(id, (data) => {
          console.log("sbreturn", data);
          if (Array.isArray(data)) {
            this.segments = data;

            // iterate over data.segments array
            vid.addEventListener("timeupdate", () => {
              console.log("sb check", data);
              data.forEach((sponsor) => {
                let vidTime = vid.currentTime;

                if (
                  vidTime >= sponsor.segment[0] &&
                  vidTime <= sponsor.segment[1]
                ) {
                  console.log("Skipping the sponsor");
                  vid.currentTime = sponsor.segment[1];
                }
              });
            });
          }
        });
      }
    });
  },
};
</script>

<style>
.sponsor {
  color: green;
}
</style>
