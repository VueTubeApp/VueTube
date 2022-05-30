<template>
  <div>
    <v-list-item
      v-for="(channel, index) in $store.state.channel.featuredChannels"
      :key="index"
      class="pa-0 min-height-0"
    >
      <compact-channel-renderer
        :video="channel.gridChannelRenderer"
      ></compact-channel-renderer>
    </v-list-item>
  </div>
</template>

<script>
import compactChannelRenderer from "../../components/CompactRenderers/compactChannelRenderer.vue";

export default {
  components: { compactChannelRenderer },
};
</script>
