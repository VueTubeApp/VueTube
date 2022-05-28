<template>
  <div
    style="
      color: #fff;
      left: 1.25rem;
      bottom: 1.25rem;
      font-size: 0.75rem;
      position: absolute;
    "
  >
    {{ watched }}
    <span style="color: #999"> / {{ duration }} </span>
  </div>
</template>

<script>
export default {
  props: ["video"],
  data() {
    return {
      watched: 0,
      duration: 0,
    };
  },
  mounted() {
    this.video.addEventListener("timeupdate", () => {
      this.duration = this.$vuetube.humanTime(this.video.duration);
      this.watched = this.$vuetube.humanTime(this.video.currentTime);
    });
  },
};
</script>
