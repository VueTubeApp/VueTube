<template>
  <div>
    <v-snackbar v-model="updateSnackbar" class="updateBar" :timeout="updateSnackbarTimeout" rounded>
      {{ updateSnackbarText }}

      <template #action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          to="/mods/updates?nowait=true"
          >Update</v-btn
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
    const releases = await this.$vuetube.releases;
    const appVersion = process.env.version;
    const appChannel = process.env.channel;
    if (appVersion !== releases[0].tag_name && appVersion !== "dev-local" && appChannel !== "Unstable") {
      this.updateSnackbar = true;
    }
  },
};
</script>
