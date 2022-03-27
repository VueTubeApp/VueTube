<template>
  <div class="description">
    <div v-for="(text, index) in render.description.runs" :key="index">
      <component
        :is="text.navigationEndpoint ? 'a' : 'span'"
        :href="parseLinks(text)"
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
    parseLinks(base) {
      const navEndpoint = base.navigationEndpoint;
      if (!navEndpoint) return;
      if (navEndpoint.webviewEndpoint) {
        return base.text;
      } else if (navEndpoint.browseEndpoint) {
        return navEndpoint.browseEndpoint.canonicalBaseUrl;
      } else if (navEndpoint.navigationEndpoint) {
        return; //for now
      }
    },
  },
};
</script>
