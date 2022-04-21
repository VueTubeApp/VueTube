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
      <div class="comment-content--header subtitle-2">
        <div class="author-badge-name pr-1">
          <div class="author-name--wrapper">
            <span class="font-weight-bold author-name" v-emoji>
              {{ commentRenderer.authorText.simpleText }}
            </span>
          </div>
          <template
            v-for="(badge, index) in commentRenderer.authorCommentBadge"
          >
            <author-comment-badge-renderer
              :metadata="badge"
              :key="index"
              class="ml-1"
            />
          </template>
          <template
            v-for="(badge, index) in commentRenderer.sponsorCommentBadge"
          >
            <sponsor-comment-badge-renderer
              :metadata="badge"
              :key="index"
              class="ml-1"
            />
          </template>
        </div>
        <span
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
          class="background--text comment-timestamp"
        >
          {{ commentRenderer.publishedTimeText.runs[0].text }}
        </span>
      </div>
      <collapsable-text :lines="4">
        <yt-text-formatter :textRuns="commentRenderer.contentText.runs">
        </yt-text-formatter>
      </collapsable-text>
    </div>
  </div>
</template>

<style scoped lang="scss">
.entry {
  width: 100%; /* Prevent Loading Weirdness */
}

.comment-thread {
  display: flex;
  flex-direction: row;
  flex-basis: auto;
  width: 100%;
  padding: 10px 0;

  .avatar-thumbnail {
    margin-right: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 50%;
    width: 48px;
    height: 48px;
  }

  .comment-content {
    min-width: 0;
    display: flex;
    flex-direction: column;
    flex-basis: auto;
    flex-grow: 1;

    .comment-content--header {
      display: flex;
      align-items: baseline;

      .comment-timestamp {
        white-space: nowrap;
      }
    }
  }
}

.author-badge-name {
  display: flex;
  flex-direction: row;

  .author-name--wrapper {
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>

<script>
import collapsableText from "~/components/UtilRenderers/collapsableText.vue";
import YtTextFormatter from "~/components/UtilRenderers/YtTextFormatter.vue";
import AuthorCommentBadgeRenderer from "~/components/Comments/authorCommentBadgeRenderer.vue";
import SponsorCommentBadgeRenderer from "~/components/Comments/sponsorCommentBadgeRenderer.vue";

export default {
  components: {
    collapsableText,
    YtTextFormatter,
    AuthorCommentBadgeRenderer,
    SponsorCommentBadgeRenderer,
  },
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
