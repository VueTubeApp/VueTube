<template>
  <center style="padding: 1em;">

    <v-img src="/icon.svg" width="100px" />
    <h1 class="pageTitle">VueTube</h1>

    <v-btn @click="openExternal('https://github.com/Frontesque/VueTube')"><v-icon>mdi-github</v-icon></v-btn>
    <v-btn @click="openExternal('https://discord.gg/7P8KJrdd5W')"><v-icon>mdi-discord</v-icon></v-btn>

    <h3 style="margin-top: 2em;">App Information</h3>
    <div>App Version: {{ version.substring(0, 7) }}</div>

    <h3 style="margin-top: 1em;">Device Information</h3>
    <div>Platform: {{ deviceInfo.platform }}</div>
    <div>OS: {{ deviceInfo.operatingSystem }}</div>
    <div>OS Version: {{ deviceInfo.osVersion }}</div>
    <div>Model: {{ deviceInfo.model }}</div>
    <div>Manufacturer: {{ deviceInfo.manufacturer }}</div>
    <div>Virtual: {{ deviceInfo.isVirtual }}</div>
  </center>
</template>

<style scoped>
.pageTitle {
  margin-bottom: 1em;
}
</style>

<script>
import { Browser } from '@capacitor/browser';
import { Device } from '@capacitor/device';

export default {
  data() {
    return {
      version: process.env.appVersion,
      deviceInfo: "",
    }
  },
  methods: {
    async openExternal(url) {
      await Browser.open({ url: url });
    }
  },

  async mounted () {
    const info = await Device.getInfo();
    this.deviceInfo = info
  }
}
</script>
