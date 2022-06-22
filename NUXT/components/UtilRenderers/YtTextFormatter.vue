<template>
  <div class="yt-text-formatter">
    <template v-for="(text, index) in textRuns">
      <template v-if="$rendererUtils.checkInternal(text)">
        <a
          @click.stop.prevent="
            openInternal($rendererUtils.getNavigationEndpoints(text))
          "
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
          @click.stop.prevent="
            openExternal($rendererUtils.getNavigationEndpoints(text))
          "
          :key="index"
          >{{ text.text }}</a
        >
      </template>
      <template v-else-if="text.emoji && text.emoji.isCustomEmoji">
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
      <template v-else>
        <span :key="index" v-emoji>{{ text.text }}</span>
      </template>
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
  methods: {
    openExternal(url) {
      this.$vuetube.openExternal(url);
    },
    async openInternal(url) {
      await this.$router.push(url);
    },
  },
};
</script>
