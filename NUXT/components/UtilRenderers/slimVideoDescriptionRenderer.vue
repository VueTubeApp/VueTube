<template>
  <div class="description">
    <div v-for="(text, index) in render.description.runs" :key="index">
      <component
        :is="text.navigationEndpoint ? 'a' : 'span'"
        :href="parseLinks(text.navEndpoint)"
        target="_blank"
        >{{ text.text }}
      </component>
    </div>
  </div>
</template>

<style scoped></style>

<script>
export default {
  props: ["render"],

  methods: {
    parseLinks(navEndpoint) {
      if (!navEndpoint) return;
      if (navEndpoint.webviewEndpoint.url) {
        return navEndpoint.webviewEndpoint.url;
      } else if (navEndpoint.browseEndpoint) {
        return navEndpoint.browseEndpoint.canonicalBaseUrl;
      } else if (navEndpoint.navigationEndpoint) {
        return; //for now
      }
    },
  },
};
</script>
