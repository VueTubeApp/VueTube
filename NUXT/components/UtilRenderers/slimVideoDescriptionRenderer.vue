<template>
  <div class="description" style="white-space: pre-line">
    <template v-for="(text, index) in render.description.runs">
      <template
        v-if="
          text.navigationEndpoint && text.navigationEndpoint.webviewEndpoint
        "
      >
        <a
          @click="
            openExternal(this.$rendererUtils.getNavigationEndpoints(text))
          "
          :key="index"
          class="link"
          >{{ text.text }}</a
        >
      </template>
      <template v-else-if="this.$rendererUtils.checkInternal(text)">
        <a
          @click="
            openInternal(this.$rendererUtils.getNavigationEndpoints(text))
          "
          :key="index"
          class="link"
          >{{ text.text }}</a
        >
      </template>
      <template v-else> {{ text.text }} </template>
    </template>
  </div>
</template>

<style scoped></style>

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
