<template>
  <center style="padding: 1em;">

    <v-img src="/icon.svg" width="100px" />
    <h1 class="pageTitle">VueTube</h1>

    <v-btn @click="openExternal('https://github.com/Frontesque/VueTube')"><v-icon>mdi-github</v-icon></v-btn>
    <v-btn @click="openExternal('https://discord.gg/7P8KJrdd5W')"><v-icon>mdi-discord</v-icon></v-btn>
    <p>App Version: {{ version.substring(0, 7) }}</p>
  </center>
</template>

<style scoped>
.pageTitle {
  margin-bottom: 1em;
}
</style>

<script>
import { Browser } from '@capacitor/browser';

export default {
  data() {
    return {
      version: process.env.appVersion
    }
  },
  methods: {
    async openExternal(url) {
      await Browser.open({ url: url });
    }
  }
}
</script>
