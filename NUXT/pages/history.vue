<template>
    <div>
      <history-card
        v-for="(historyVideo, index) in historyVideos"
        :key="index"
        :video="historyVideo"
        @deleted="deleteHistoryVideo(index)"
      />
    </div>
  </template>
  
  <script>
  import historyCard from "../components/historyCard.vue";
  export default {
    components: { historyCard },
    computed: {
      historyVideos() {
        return this.$store.state.history.historyVideos;
      },
    },
    methods: {
      deleteHistoryVideo(target) {
        this.$store.commit("history/removeHistory", target);
      },
    },
  };
  </script>