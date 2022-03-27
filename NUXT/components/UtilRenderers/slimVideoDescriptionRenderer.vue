<template>
  <div class="description" style="white-space: pre-line">
    <template v-for="(text, index) in render.description.runs">
      <template
        v-if="
          text.navigationEndpoint && text.navigationEndpoint.webviewEndpoint
        "
      >
        <a @click="openExternal(parseLinks(text))" :key="index" class="link">{{
          text.text
        }}</a>
      </template>
      <template v-else-if="checkInternal(text)">
        <a @click="openInternal(parseLinks(text))" :key="index" class="link">{{
          text.text
        }}</a>
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
    parseLinks(base) {
      const navEndpoint = base.navigationEndpoint;
      if (!navEndpoint) return;
      if (navEndpoint.webviewEndpoint) {
        return navEndpoint.webviewEndpoint.url;
      } else if (navEndpoint.browseEndpoint) {
        return navEndpoint.browseEndpoint.canonicalBaseUrl;
      } else if (navEndpoint.watchEndpoint) {
        return `/watch?v=${navEndpoint.watchEndpoint.videoId}`;
      } else if (navEndpoint.navigationEndpoint) {
        return; //for now
      }
    },
    checkInternal(base) {
      const navEndpoint = base.navigationEndpoint;
      if (!navEndpoint) return false;
      if (navEndpoint.browseEndpoint || navEndpoint.watchEndpoint) {
        return true;
      } else {
        return false;
      }
    },
    async openExternal(url) {
      await Browser.open({ url: url });
    },
    async openInternal(url) {
      await this.$router.push(url);
    },
  },
};
</script>
