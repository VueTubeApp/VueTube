<template>
  <div class="comment-header px-3" v-if="boxRenderer">
    <div class="avatar-container">
      <v-img
        class="avatar-thumbnail"
        :src="
          boxRenderer.authorThumbnail.thumbnails[
            boxRenderer.authorThumbnail.thumbnails.length - 1
          ].url
        "
      />
    </div>
    <div
      class="placeholder-text background--text"
      :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
      v-text="
        boxRenderer.placeholderText.runs[
          boxRenderer.placeholderText.runs.length - 1
        ].text
      "
    ></div>
  </div>
</template>

<script>
export default {
  props: ["comment"],

  data() {
    return {
      boxRenderer: null,
    };
  },

  mounted() {
    this.boxRenderer = this.comment?.createRenderer?.commentSimpleboxRenderer;
  },
};
</script>

<style scoped>
.entry {
  width: 100%; /* Prevent Loading Weirdness */
}

.avatar-thumbnail {
  margin-right: 1rem;
  border-radius: 50%;
  width: 48px;
  height: 48px;
}

.comment-header {
  display: flex;
  flex-direction: row;
  flex-basis: auto;
  align-items: center;
  padding: 10px 0;
  width: 100%;
}
</style>
