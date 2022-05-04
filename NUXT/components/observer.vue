<template>
  <div class="observer" style="height: 1px" />
</template>

<script>
export default {
  props: ["options"],
  data: () => ({
    observer: null,
  }),
  mounted() {
    const options = this.options || { threshold: 0.0 };
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    }, options);

    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  },
};
</script>
