<template>
  <div style="padding: 1em">
    <center>
    <div class="row pa-4" style="flex-direction: column">
      <div>
        <v-img
          src="/icon.svg"
          width="100px"
          :class="$vuetify.theme.dark ? '' : 'invert'"
        />
      </div>
      <h1 class="pageTitle mb-3">VueTube</h1>
    </div>
    </center>

    <!--   App Information   -->
    <v-card class="obj" :class="$vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'" :style="{borderRadius: `${roundTweak / 2}rem`}">
      <v-card-title>{{ languagePack.mods.about.appinformation }}</v-card-title>
      <v-card-text>
        <h3>{{ languagePack.mods.about.appversion }}</h3>
        {{ version.substring(0, 7) || "Unknown" }}
      </v-card-text>
    </v-card>
    <!--   End App Information   -->

    <!--   Device Information   -->
    <v-card class="obj" :class="$vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'" :style="{borderRadius: `${roundTweak / 2}rem`}">
      <v-card-title>{{ languagePack.mods.about.deviceinformation }}</v-card-title>
      <v-card-text>
        <h3>{{ languagePack.mods.about.platform }}</h3>
        {{ deviceInfo.platform || "Unknown" }}<br>
        <h3>{{ languagePack.mods.about.os }}</h3>
        {{ deviceInfo.operatingSystem || "Unknown" }} ({{ deviceInfo.osVersion || "Unknown" }})<br>
        <h3>{{ languagePack.mods.about.model }}</h3>
        {{ deviceInfo.model || "Unknown" }}<br>
        <h3>{{ languagePack.mods.about.manufacturer }}</h3>
        {{ deviceInfo.manufacturer || "Unknown" }}<br>
        <h3>{{ languagePack.mods.about.emulator }}</h3>
        {{ deviceInfo.isVirtual ? "yes" : "no" }}
      </v-card-text>
    </v-card>
    <!--   End Device Information   -->

    <!--   App Links   --->
    <div class="obj">
      <v-btn @click="openExternal('https://github.com/Frontesque/VueTube')" class="action"  :class="$vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'" :style="{borderRadius: `${roundTweak / 2}rem`}">
        <v-icon x-large class="actionIcon">mdi-github</v-icon>
        {{ languagePack.mods.about.github }}
      </v-btn>
      <v-btn @click="openExternal('https://discord.gg/7P8KJrdd5W')" class="action obj"  :class="$vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'" :style="{borderRadius: `${roundTweak / 2}rem`}">
        <v-icon x-large class="actionIcon">mdi-discord</v-icon>
        {{ languagePack.mods.about.discord }}
      </v-btn>
    </div>

  </div>
</template>

<script>
import { Browser } from "@capacitor/browser";
import { Device } from "@capacitor/device";

export default {

  computed: {
    roundTweak() {
      return this.$store.state.tweaks.roundTweak;
    }
  },

  data() {
    return {
      version: process.env.appVersion,
      deviceInfo: "",
      languagePack: {mods: {about: {}}},
    };
  },

  async mounted() {
    const info = await Device.getInfo();
    this.deviceInfo = info;

    this.languagePack = this.$lang();
  },
  methods: {
    async openExternal(url) {
      await Browser.open({ url: url });
    },
  },
};
</script>

<style scoped>
.pageTitle {
  margin-bottom: 1em;
}
.obj {
  margin-top: 1em;
}
.action {
  min-width: 100% !important;
  min-height: 5em;
  padding: 0 !important;
}
.actionIcon {
  margin-right: 0.5em;
}
</style>
