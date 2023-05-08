<template>
  <div v-if="render.attributedDescriptionBodyText.content" class="description">
    <yt-text-formatter :text-runs="render.attributedDescriptionBodyText">
    </yt-text-formatter>
  </div>
</template>

<script>
import YtTextFormatter from "~/components/UtilRenderers/YtTextFormatterNew.vue";

export default {
  components: {
    YtTextFormatter,
  },
  props: ["render"],
};
</script>

<style scoped>
.description {
  white-space: pre-line;
  font-size: 0.9rem;
}
</style>
