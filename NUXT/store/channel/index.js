export const state = () => ({
  avatar: null,
  banner: null,
  title: null,
  subscribe: null,
  subscribeAlt: null,
  descriptionPreview: null,
  subscribers: null,
  videos: null,
});
export const actions = {
  fetchChannel({ state }, channelUrl) {
    console.log(
      "%c getChannel ",
      "color: black; font-weight: bold; background: #f00; padding: .5rem .25rem; border-radius: .25rem;"
    );
    console.log(
      `%c${channelUrl}`,
      "color: black; font-weight: bold; background: #0f0; padding: .5rem .25rem; border-radius: .25rem;"
    );
    // substring removes /channel/ from the url if called from watch page, but keeps string intact if called from search page
    this.$youtube
      .getChannel(
        `https://youtube.com/channel/${channelUrl.substring(
          channelUrl.indexOf("/")
        )}`
      )
      .then((channel) => {
        // console.log(channel);
        state.banner =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelBanner.image.sources[0].url;
        state.avatar =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.avatarData.avatar.image.sources[0].url;
        state.title =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.title;
        state.subscribe =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.subscribeButton.subscribeButtonContent.buttonText;
        state.subscribeAlt =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.subscribeButton.subscribeButtonContent.accessibilityText;
        state.descriptionPreview =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.descriptionPreview.description;
        state.subscribers =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.metadata.subscriberCountText;
        state.videos =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.metadata.videosCountText;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
