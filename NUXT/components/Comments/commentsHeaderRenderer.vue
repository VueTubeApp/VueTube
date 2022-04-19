<template>
  <div class="comment-header" v-if="boxRenderer">
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
    <v-text-field disabled>
      {{
        boxRenderer.placeholderText.runs[
          boxRenderer.placeholderText.runs.length - 1
        ].text
      }}
    </v-text-field>
  </div>
</template>

<style scoped>
.entry {
  width: 100%; /* Prevent Loading Weirdness */
}

.avatar-thumbnail {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  width: 48px;
  height: 48px;
}

.comment-header {
  display: flex;
  flex-direction: row;
  flex-basis: auto;
  padding: 10px;
  width: 100%;
}
</style>

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
