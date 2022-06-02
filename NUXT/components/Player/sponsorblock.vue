<template>
  <div>
    <v-progress-linear
      v-for="block in blocks"
      :key="block.UUID"
      :buffer-value="(block.segment[1] / video.duration) * 100"
      :value="(block.segment[0] / video.duration) * 100"
      style="
        z-index: 4;
        width: 100%;
        background: transparent;
        pointer-events: none;
      "
      :class="!fullscreen || controls ? '' : 'invisible'"
      background-color="white"
      background-opacity="1"
      color="transparent"
      height="2"
      :style="
        fullscreen
          ? 'width: calc(100% - 2rem); left: 1rem; position: absolute; bottom: 3rem;'
          : 'width: 100%; left: 0; position: absolute; bottom: 0;'
      "
    />
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
    fullscreen: {
      type: Boolean,
      required: true,
    },
    controls: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    blocks: [],
  }),
  mounted() {
    let vid = this.video;
    let id = this.videoid;

    vid.addEventListener("loadeddata", (e) => {
      if (vid.readyState >= 3) {
        this.$youtube.getSponsorBlock(id, (data) => {
          console.log("sbreturn", data);
          if (Array.isArray(data)) {
            this.blocks = data;

            // iterate over data.segments array
            vid.addEventListener("timeupdate", () => {
              // console.log("sb check", data);
              data.forEach((sponsor) => {
                let vidTime = vid.currentTime;

                if (
                  vidTime >= sponsor.segment[0] &&
                  vidTime <= sponsor.segment[1]
                ) {
                  console.log("Skipping the sponsor");
                  this.$youtube.showToast("Skipped sponsor")
                  vid.currentTime = sponsor.segment[1] + 1;
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
.selfpromo {
  color: yellow;
}
.exclusive_access {
  color: orange;
}
.interaction {
  color: blue;
}
.intro {
  color: purple;
}
.outro {
  color: purple;
}
.music_offtopic {
  color: red;
}
.poi_highlight {
  color: #ff00ff;
}
.filler {
  color: blue;
}
</style>
