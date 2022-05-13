<template>
  <div
    v-if="commentRenderer"
    v-ripple
    class="comment-thread px-3"
    @click="$emit('showReplies', comment)"
  >
    <a
      :href="
        this.$rendererUtils.getNavigationEndpoints(
          commentRenderer.authorEndpoint
        )
      "
      class="avatar-link pr-2"
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
      <div class="comment-content--header subtitle-2 mb-2">
        <div
          class="author-badge-name mr-1"
          :class="
            commentRenderer.authorIsChannelOwner
              ? $vuetify.theme.dark
                ? 'owner background lighten-2'
                : 'owner background darken-2'
              : ''
          "
        >
          <div class="author-name--wrapper">
            <span class="font-weight-bold author-name mr-1" v-emoji>
              {{ commentRenderer.authorText.simpleText }}
            </span>
          </div>
          <template
            v-for="(badge, index) in commentRenderer.authorCommentBadge"
          >
            <author-comment-badge-renderer :metadata="badge" :key="index" />
          </template>
          <template
            v-for="(badge, index) in commentRenderer.sponsorCommentBadge"
          >
            <sponsor-comment-badge-renderer :metadata="badge" :key="index" />
          </template>
        </div>
        <span
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
          class="background--text comment-timestamp ml-2"
        >
          {{ commentRenderer.publishedTimeText.runs[0].text }}
        </span>
      </div>
      <collapsable-text
        :lines="3"
        :expandText="
          commentRenderer.expandButton.buttonRenderer.text.runs[0].text
        "
        :collapseText="
          commentRenderer.collapseButton.buttonRenderer.text.runs[0].text
        "
      >
        <yt-text-formatter :textRuns="commentRenderer.contentText.runs">
        </yt-text-formatter>
      </collapsable-text>
      <div class="toolbar mt-2">
        <v-btn-toggle v-model="voteStatus" group>
          <div class="toolbar--item mr-1">
            <v-icon small>mdi-thumb-up-outline</v-icon>
            <span
              v-if="commentRenderer.voteCount"
              v-text="commentRenderer.voteCount.simpleText"
              class="like-count caption"
            ></span>
            <v-icon class="ml-2" small>mdi-thumb-down-outline</v-icon>
          </div>
        </v-btn-toggle>
        <div class="toolbar--item ml-2" v-if="commentRenderer.replyCount">
          <v-icon small>mdi-comment-outline</v-icon>
          <span
            v-text="commentRenderer.replyCount"
            class="like-count caption"
          ></span>
        </div>
      </div>
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

.toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.author-badge-name {
  display: flex;
  flex-direction: row;
  min-width: 0;

  .author-name--wrapper {
    min-width: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

.owner {
  border-radius: 1em;
  padding: 0 0.3em 0 0.6em;
}

.toolbar--button::v-deep.v-btn--active .v-btn__content {
  color: var(--v-primary-base);
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
      voteStatus: null,
    };
  },

  mounted() {
    this.commentRenderer = this.comment?.comment?.commentRenderer;
  },
};
</script>
