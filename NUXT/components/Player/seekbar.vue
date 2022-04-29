<template>
  <div>


    <v-progress-linear
      active
      background-color="primary"
      background-opacity="0.5"
      :buffer-value="buffered"
      color="primary"
      height="3"
      query
      :value="percentage"
    />

    {{ percentage }}
    {{ buffered }}


  </div>
</template>


<script>
export default {
  props: ["video"],

  data() {
    return {
      percentage: 0,
      buffered: 0
    }
  },

  mounted() {
    this.video.ontimeupdate = () => {
      this.percentage = (this.video.currentTime / this.video.duration) * 100;
    };
    this.video.addEventListener("progress", () => {
      this.buffered = (this.video.buffered.end(0) / this.video.duration) * 100;
    });
  }

}
</script>
