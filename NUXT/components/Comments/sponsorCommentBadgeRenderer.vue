<template>
  <div
    class="author-comment-badge-renderer"
    v-if="metadata && metadata.customBadge"
  >
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <img
          v-bind="attrs"
          v-on="on"
          class="badge"
          :src="metadata.customBadge.thumbnails[0].url"
          :alt="metadata.tooltip"
        />
      </template>
      <span>{{ metadata.tooltip }}</span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
  props: {
    metadata: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
.author-comment-badge-renderer {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.badge {
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  vertical-align: -0.1em;
}
</style>
