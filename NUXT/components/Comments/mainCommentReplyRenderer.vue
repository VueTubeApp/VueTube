<template>
  <dialog-base>
    <template v-slot:header>
      <v-btn icon @click="$emit('changeState', false)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>
        <strong>Replies</strong>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('closeComments')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <template>
      <comment-thread-renderer :comment="parentComment" />
      <v-divider></v-divider>
      <comment-thread-renderer
        v-for="index in 10"
        v-bind:key="index"
        :comment="parentComment"
      />
    </template>
  </dialog-base>
</template>

<script>
import dialogBase from "~/components/dialogBase.vue";
import commentsHeaderRenderer from "~/components/Comments/commentsHeaderRenderer.vue";
import commentThreadRenderer from "~/components/Comments/commentThreadRenderer.vue";
import continuationItemRenderer from "~/components/observer.vue";

export default {
  components: {
    dialogBase,
    commentsHeaderRenderer,
    commentThreadRenderer,
    continuationItemRenderer,
  },
  model: {
    prop: "showReplies",
    event: "changeState",
  },
  props: ["defaultContinuation", "parentComment", "showReplies"],
};
</script>
