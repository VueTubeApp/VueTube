<template>
  <div
    class="author-comment-badge-renderer"
    v-if="metadata && iconTypeMap.hasOwnProperty(metadata.icon.iconType)"
  >
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" class="author-badge" small>{{
          iconTypeMap[metadata.icon.iconType]
        }}</v-icon>
      </template>
      <span>{{ metadata.iconTooltip }}</span>
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

  data: () => ({
    iconTypeMap: {
      CHECK: "mdi-check-circle",
      CHECK_CIRCLE_THICK: "mdi-check-circle",
      OFFICIAL_ARTIST_BADGE: "mdi-music-note",
    },
  }),
};
</script>

<style scoped>
.author-comment-badge-renderer {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
