const getDefaultState = () => {
  return {
    loading: null,
    error: null,
    avatar: null,
    banner: null,
    title: null,
    subscribe: null,
    subscribeAlt: null,
    descriptionPreview: null,
    subscribers: null,
    videosCount: null,
    featuredChannels: null,
    videoExample: null,
  };
};
export const state = () => {
  return getDefaultState();
};
export const actions = {
  fetchChannel({ state }, channelUrl) {
    Object.assign(state, getDefaultState());
    state.loading = true;
    console.log(channelUrl);
    const channelRequest =
      channelUrl.includes("/c/") ||
      channelUrl.includes("/user/") ||
      channelUrl.includes("/channel/")
        ? `https://youtube.com/${channelUrl}`
        : `https://youtube.com/channel/${channelUrl}`;
    this.$youtube
      .getChannel(channelRequest)
      .then((channel) => {
        // console.warn(channel);
        state.loading = false;
        state.banner =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelBanner?.image.sources[0].url;
        state.avatar =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.avatarData.avatar?.image.sources[0].url;
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
        state.videosCount =
          channel.header.channelMobileHeaderRenderer.channelHeader.elementRenderer.newElement.type.componentType.model.channelHeaderModel.channelProfile.metadata.videosCountText;
        const featuredSection =
          channel.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.find(
            (i) => {
              return Boolean(
                i?.shelfRenderer?.content?.horizontalListRenderer?.items[0]
                  .gridChannelRenderer
              );
            }
          );
        state.featuredChannels =
          featuredSection.shelfRenderer.content.horizontalListRenderer.items;
        console.log(
          channel.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer
            .content.sectionListRenderer.contents[0].shelfRenderer.content
            .verticalListRenderer.items[0].elementRenderer.newElement.type
            .componentType.model
        );
        state.videoExample =
          channel.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].shelfRenderer.content.verticalListRenderer.items[0].elementRenderer.newElement.type.componentType.model.videoWithContextModel.videoWithContextData.videoData;
      })
      .catch((err) => {
        state.loading = false;
        state.error = err;
        console.error(err);
      });
  },
};
