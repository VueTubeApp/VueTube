<template>
  <div class="description" v-if="render.descriptionBodyText">
    <yt-text-formatter :textRuns="render.descriptionBodyText.runs">
    </yt-text-formatter>
  </div>
</template>

<style scoped>
.description {
  white-space: pre-line;
}
</style>

<script>
import { Browser } from "@capacitor/browser";
import YtTextFormatter from "~/components/UtilRenderers/YtTextFormatter.vue";

export default {
  props: ["render"],

  components: {
    YtTextFormatter,
  },

  methods: {
    async openExternal(url) {
      await Browser.open({ url: url });
    },
    async openInternal(url) {
      await this.$router.push(url);
    },
  },
};
</script>
