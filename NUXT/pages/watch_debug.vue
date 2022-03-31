<template>
  <div class="accent">

    <player :sources="sources" v-if="sources.length > 0" />

  </div>
</template>

<script>
import player from "~/components/Player/index.vue"
export default {
  data() {
    return {
      sources: [],
    };
  },
  mounted() {
    this.sources = [{"itag":17,"url":"https://api.celeste.photos/squish.mp4","mimeType":"video/3gpp; codecs=\"mp4v.20.3, mp4a.40.2\"","bitrate":86688,"width":176,"height":144,"lastModified":"1645932929087816","contentLength":"159084","quality":"small","fps":12,"qualityLabel":"144p","projectionType":"RECTANGULAR","averageBitrate":85910,"audioQuality":"AUDIO_QUALITY_LOW","approxDurationMs":"14814","audioSampleRate":"22050","audioChannels":1}]
  },
};
</script>
