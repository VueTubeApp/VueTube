<template>
  <div>
    <v-snackbar
      v-model="updateSnackbar"
      class="updateBar"
      :timeout="updateSnackbarTimeout"
    >
      {{ updateSnackbarText }}

      <template #action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="updateSnackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<style scoped>
.updateBar {
  z-index: 99999999;
}
</style>

<script>
export default {
  data() {
    return {
      updateSnackbar: false,
      updateSnackbarText: "An update is available",
      updateSnackbarTimeout: 5000,
    };
  },

  async mounted() {
    const commits = await this.$vuetube.commits;
    const appVersion = process.env.appVersion;
    if (appVersion !== commits[0].sha && appVersion !== "dev-local") {
      this.updateSnackbar = true;
    }
  },
};
</script>
