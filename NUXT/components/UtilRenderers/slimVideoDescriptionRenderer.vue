<template>
  <div class="description" style="white-space: pre-line">
    <template v-for="(text, index) in render.description.runs">
      <template v-if="text.navigationEndpoint">
        <a :href="parseLinks(text)" :key="index">{{ text.text }}</a>
      </template>
      <template v-else> {{ text.text }} </template>
    </template>
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
