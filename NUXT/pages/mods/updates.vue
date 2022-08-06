<template>
  <div style="padding: 2em;">
    <v-icon x-large color="primary" style="padding-bottom: 0.25em;">mdi-cellphone-arrow-down</v-icon>
    
    <div v-if="status == 'checking'">
      <h1>{{ lang.checking }}</h1>
      <div>{{ lang.installed }}: {{ installedVersion }}</div>
      <center>
        <v-progress-circular indeterminate color="primary" size="75" style="padding-top: 10em;" />
      </center>
    </div>

    <div v-if="status == 'latest'">
      <h1>{{ lang.noupdate }}</h1>
      <p>{{ lang.noupdatemessage }}</p>
      <div class="bottom">
        <v-btn rounded color="primary" @click="$router.go(-1)">{{ lang.okay }}</v-btn>
      </div>
    </div>

    <div v-if="status == 'available'">
      <h1>{{ lang.available }}</h1>
      <div>{{ lang.installed }}: {{ installedVersion }}</div>
      <div>{{ lang.latest }}: {{ latestVersion.tag_name }}</div>
      <div class="bottom">
        <v-btn rounded @click="$router.go(-1)">{{ lang.later }}</v-btn>
        <v-btn rounded color="primary">{{ lang.update }}</v-btn>
      </div>
    </div>

  </div>
</template>

<style scoped>
.bottom {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 2em;
}
</style>

<script>
export default {
  layout: "empty",
  data() {
    return {
      installedVersion: process.env.appVersion,
      latestVersion: "",
      lang: {},
      status: "checking"
    };
  },
  async mounted() {
    //---   Setup Lang Pack   ---//
    this.lang = this.$lang("mods").updates;

    //---   Get Latest Version   ---//
    const releases = await this.$vuetube.releases;
    this.latestVersion = releases[0];

    //---   Wait like 2 seconds because if people don't see loading, they think it didn't refresh properly   ---//
    await require("~/plugins/utils").delay(2000);

    //---   Kick Off Update Notice   ---//
    if (this.latestVersion.tag_name != this.installedVersion) {
      this.status = "available";
    } else {
      this.status = "latest";
    }
  }
};
</script>
