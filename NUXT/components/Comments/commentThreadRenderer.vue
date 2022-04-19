<template>
  <div class="comment-thread" v-if="commentRenderer">
    <a
      :href="
        this.$rendererUtils.getNavigationEndpoints(
          commentRenderer.authorEndpoint
        )
      "
      class="avatar-link"
    >
      <v-img
        class="avatar-thumbnail"
        :src="
          commentRenderer.authorThumbnail.thumbnails[
            commentRenderer.authorThumbnail.thumbnails.length - 1
          ].url
        "
      />
    </a>
    <div class="comment-content">
      <div class="comment-content--header">
        <span class="font-weight-bold subtitle-2 pr-1">
          {{ commentRenderer.authorText.runs[0].text }}
        </span>
        <span
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
          class="background--text subtitle-2"
        >
          {{ commentRenderer.publishedTimeText.runs[0].text }}
        </span>
      </div>
      <p class="comment-text">
        <template v-for="text in commentRenderer.contentText.runs">{{
          text.text
        }}</template>
      </p>
    </div>
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

.comment-thread {
  display: flex;
  flex-direction: row;
  flex-basis: auto;
  width: 100%;
}

.comment-content {
  display: flex;
  flex-direction: column;
  flex-basis: auto;
}

.comment-content--header {
  display: flex;
}

.comment-text {
  white-space: pre-line;
}
</style>

<script>
export default {
  props: ["comment"],

  data() {
    return {
      commentRenderer: null,
    };
  },

  mounted() {
    this.commentRenderer = this.comment?.comment?.commentRenderer;
  },
};
</script>
