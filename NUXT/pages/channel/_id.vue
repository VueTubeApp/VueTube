<template>
  <div class="d-flex flex-column align-center">
    <v-img
      height="120"
      :src="banner"
      class="background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
    ></v-img>
    <v-avatar size="60" class="mt-2 primary">
      <img :src="avatar" />
    </v-avatar>
    <h2 class="mt-2">{{ title }}</h2>
    <v-btn
      :aria-label="subscribeAlt"
      class="mt-2"
      text
      color="primary"
      style="height: 1rem"
    >
      {{ subscribe }}
    </v-btn>
    <div style="font-size: 0.75rem" class="mt-2">
      {{ subscribers }} &middot; {{ videos }}
    </div>
    <div
      style="font-size: 0.75rem"
      class="background--text text-center px-4"
      :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
    >
      {{ descriptionPreview }}
      <v-icon
        class="background--text"
        :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
      >
        mdi-chevron-right
      </v-icon>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    channel: null,
    avatar: null,
    banner: null,
    title: null,
    subscribe: null,
    subscribeAlt: null,
    descriptionPreview: null,
    subscribers: null,
    videos: null,
  }),
  mounted() {
    console.log(
      "%c getChannel ",
      "color: black; font-weight: bold; background: #f00; padding: .5rem .25rem; border-radius: .25rem;"
    );
    this.$youtube
      .getChannel(`https://youtube.com/channel/${this.$route.params.id}`)
      .then((channel) => {
        this.channel = channel;
        console.log(channel);
        this.banner =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelBanner.image.sources[0].url;
        this.avatar =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.avatarData.avatar.image.sources[0].url;
        this.title =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.title;
        this.subscribe =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.subscribeButton.subscribeButtonContent.buttonText;
        this.subscribeAlt =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.subscribeButton.subscribeButtonContent.accessibilityText;
        this.descriptionPreview =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.descriptionPreview.description;
        this.subscribers =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.metadata.subscriberCountText;
        this.videos =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.metadata.videosCountText;
      });
  },
};
</script>
