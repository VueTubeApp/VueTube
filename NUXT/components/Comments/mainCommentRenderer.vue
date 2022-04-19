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
      <v-btn icon dark @click="$emit('changeState', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>

    <div class="commentList">
      <template v-for="commentItems in comments">
        <v-list-item
          v-for="(comment, index) in commentItems.reloadContinuationItemsCommand
            .continuationItems"
          :key="index"
        >
          <component
            v-if="getComponents()[Object.keys(comment)[0]]"
            :is="Object.keys(comment)[0]"
            :comment="comment[Object.keys(comment)[0]]"
          ></component>
        </v-list-item>
      </template>
    </div>
    <div class="loading" v-if="loading">
      <v-sheet color="background" v-for="i in !comments ? 10 : 3" :key="i">
        <v-skeleton-loader type="list-item-avatar-three-line, actions" />
      </v-sheet>
    </div>
  </dialog-base>
</template>

<script>
import dialogBase from "~/components/dialogBase.vue";
import commentsHeaderRenderer from "~/components/Comments/commentsHeaderRenderer.vue";
import commentThreadRenderer from "~/components/Comments/commentThreadRenderer.vue";

export default {
  props: ["continuation", "commentData", "showComments"],

  model: {
    prop: "showComments",
    event: "changeState",
  },

  components: {
    dialogBase,
    commentsHeaderRenderer,
    commentThreadRenderer,
  },

  data: () => ({
    loading: true,
    comments: [],
  }),

  mounted() {
    this.paginate();
  },

  methods: {
    getComponents() {
      return this.$options.components;
    },

    paginate() {
      this.loading = true;
      this.$youtube
        .getContinuation(this.continuation, "next", "web")
        .then((result) => {
          this.comments = this.comments.concat(
            result.data.onResponseReceivedEndpoints
          );
          console.log("comments", this.comments);
          if (this.comments) this.loading = false;
        });
    },
  },
};
</script>
