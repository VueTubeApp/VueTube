<template>
  <div class="description">
    <template v-for="(text, index) in render.descriptionBodyText.runs">
      <template v-if="$rendererUtils.checkInternal(text)">
        <a
          @click="openInternal($rendererUtils.getNavigationEndpoints(text))"
          :key="index"
          >{{ text.text }}</a
        >
      </template>
      <template
        v-else-if="
          text.navigationEndpoint && text.navigationEndpoint.urlEndpoint
        "
      >
        <a
          @click="openExternal($rendererUtils.getNavigationEndpoints(text))"
          :key="index"
          >{{ text.text }}</a
        >
      </template>
      <template v-else> {{ text.text }} </template>
    </template>
  </div>
</template>

<style scoped>
.description {
  white-space: pre-line;
  margin-bottom: 16px;
  margin-top: 16px;
}
</style>

<script>
import { Browser } from "@capacitor/browser";
export default {
  props: ["render"],

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
