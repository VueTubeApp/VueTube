<template>
  <div class="yt-text-formatter" v-emoji>
    <template v-for="(text, index) in textRuns">
      <template v-if="$rendererUtils.checkInternal(text)">
        <a
          @click="openInternal($rendererUtils.getNavigationEndpoints(text))"
          :key="index"
          >{{ text.text }}</a
        >
      </template>
      <template
        v-else-if="
          text.navigationEndpoint && text.navigationEndpoint.urlEndpoint
        "
      >
        <a
          @click="openExternal($rendererUtils.getNavigationEndpoints(text))"
          :key="index"
          >{{ text.text }}</a
        >
      </template>
      <template v-else-if="text.emoji">
        <img
          :src="
            text.emoji.image.thumbnails[text.emoji.image.thumbnails.length - 1]
              .url
          "
          :alt="text.text"
          :key="index"
          class="emoji"
          draggable="false"
        />
      </template>
      <template v-else> {{ text.text }} </template>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    textRuns: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
