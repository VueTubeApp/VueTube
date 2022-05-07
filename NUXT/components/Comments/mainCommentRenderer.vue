<template>
  <dialog-base>
    <template v-slot:header>
      <v-toolbar-title>
        <template v-for="text in commentData.headerText.runs">
          <template v-if="text.bold">
            <strong :key="text.text">{{ text.text }}</strong>
          </template>
          <template v-else>{{ text.text }}</template>
        </template>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('changeState', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <div
      v-for="(comment, index) in comments"
      :key="index"
      class="commentElement"
    >
      <v-list-item class="px-0">
        <component
          v-if="getComponents()[Object.keys(comment)[0]]"
          :is="Object.keys(comment)[0]"
          :comment="comment[Object.keys(comment)[0]]"
          @intersect="paginate"
          @showReplies="openReply"
        ></component>
      </v-list-item>
      <v-divider v-if="getComponents()[Object.keys(comment)[0]]"></v-divider>
    </div>

    <div class="loading" v-if="loading">
      <v-sheet
        color="background"
        v-for="i in comments.length <= 0 ? 5 : 1"
        :key="i"
      >
        <v-skeleton-loader type="list-item-avatar-three-line" />
      </v-sheet>
    </div>

    <template v-slot:reveal>
      <main-comment-reply-renderer
        v-if="showReply && replyData"
        v-model="showReply"
        :parentComment="replyData.parent"
        :defaultContinuation="replyData.replyContinuation"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      ></main-comment-reply-renderer>
    </template>
  </dialog-base>
</template>

<script>
import dialogBase from "~/components/dialogBase.vue";
import commentsHeaderRenderer from "~/components/Comments/commentsHeaderRenderer.vue";
import commentThreadRenderer from "~/components/Comments/commentThreadRenderer.vue";
import continuationItemRenderer from "~/components/observer.vue";
import mainCommentReplyRenderer from "~/components/Comments/mainCommentReplyRenderer.vue";

export default {
  props: ["defaultContinuation", "commentData", "showComments"],

  model: {
    prop: "showComments",
    event: "changeState",
  },

  components: {
    dialogBase,
    commentsHeaderRenderer,
    commentThreadRenderer,
    continuationItemRenderer,
    mainCommentReplyRenderer,
  },

  data: () => ({
    loading: true,
    comments: [],
    continuation: null,
    showReply: false,
    replyData: {},
  }),

  mounted() {
    if (!this.continuation) this.continuation = this.defaultContinuation;
    this.paginate();
  },

  methods: {
    getComponents() {
      return this.$options.components;
    },

    paginate() {
      if (this.continuation) {
        this.loading = true;
        const watcherIndex = this.comments.findIndex(
          (comment) => comment.continuationItemRenderer
        );
        if (watcherIndex) this.comments.splice(watcherIndex, 1);
        this.$youtube
          .getContinuation(this.continuation, "next", "web")
          .then((result) => {
            let processed;
            if (
              result.data.onResponseReceivedEndpoints.find(
                (endpoints) => endpoints.reloadContinuationItemsCommand
              )
            ) {
              processed = result.data.onResponseReceivedEndpoints.map(
                (endpoints) =>
                  endpoints.reloadContinuationItemsCommand.continuationItems
              );
            } else {
              processed = result.data.onResponseReceivedEndpoints.map(
                (endpoints) =>
                  endpoints.appendContinuationItemsAction.continuationItems
              );
            }
            processed = processed.flat(1);
            this.comments = this.comments.concat(processed);
            this.continuation = this.findContinuation(processed);
            console.log("comments", this.comments);
            if (this.comments) this.loading = false;
          });
      }
    },

    findContinuation(newResponses) {
      const continuationItemParent = newResponses.find(
        (item) => item.continuationItemRenderer
      );

      const newContinuation =
        continuationItemParent?.continuationItemRenderer.continuationEndpoint
          .continuationCommand.token;

      return newContinuation;
    },

    openReply(event) {
      this.showReply = true;
      this.replyData = { parent: event, replyContinuation: null };
    },
  },
};
</script>
