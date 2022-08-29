<template>
  <div style="padding: 1rem">
    <center>
      <div class="d-flex flex-column justify-center pa-4">
        <div>
          <v-img
            width="69px"
            src="/icon.svg"
            :class="$vuetify.theme.dark ? '' : 'invert'"
          />
        </div>
        <h1 style="font-size: 2rem">VueTube</h1>
      </div>
    </center>

    <!--   App Information   -->
    <v-card
      flat
      class="obj"
      :class="
        $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
      "
      :style="{ borderRadius: `${roundTweak / 2}rem` }"
    >
      <v-card-title>
        <v-icon style="margin-right: 0.5em">mdi-cog-box</v-icon>
        {{ lang.appinformation }}
      </v-card-title>
      <v-card-text>
        <h3>{{ lang.appversion }}</h3>
        {{ version.substring(0, 7) || "Unknown" }} ({{ release }})
      </v-card-text>
    </v-card>
    <!--   End App Information   -->

    <!--   Device Information   -->
    <v-card
      flat
      class="obj"
      :class="
        $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
      "
      :style="{ borderRadius: `${roundTweak / 2}rem` }"
    >
      <v-card-title
        ><v-icon style="margin-right: 0.5em">mdi-cellphone-information</v-icon
        >{{ lang.deviceinformation }}</v-card-title
      >
      <v-card-text>
        <h3>{{ lang.platform }}</h3>
        {{ deviceInfo.platform || "Unknown" }}<br />
        <h3>{{ lang.os }}</h3>
        {{ deviceInfo.operatingSystem || "Unknown" }} ({{
          deviceInfo.osVersion || "Unknown"
        }})<br />
        <h3>{{ lang.model }}</h3>
        {{ deviceInfo.model || "Unknown" }}<br />
        <h3>{{ lang.manufacturer }}</h3>
        {{ deviceInfo.manufacturer || "Unknown" }}<br />
        <h3>{{ lang.emulator }}</h3>
        {{ deviceInfo.isVirtual ? "yes" : "no" }}
      </v-card-text>
    </v-card>
    <!--   End Device Information   -->

    <!--   App Links   --->
    <div class="obj d-flex flex-row gap-1 full-width">
      <v-btn
        depressed
        class="action flex-grow-1"
        :class="
          $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
        "
        :style="{ borderRadius: `${roundTweak / 2}rem` }"
        @click="openExternal('https://github.com/Frontesque/VueTube')"
      >
        <v-icon x-large class="actionIcon">mdi-github</v-icon>
        {{ lang.github }}
      </v-btn>
      <v-btn
        depressed
        class="action flex-grow-1 ml-4"
        :class="
          $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
        "
        :style="{ borderRadius: `${roundTweak / 2}rem` }"
        @click="openExternal('https://discord.gg/7P8KJrdd5W')"
      >
        <v-icon x-large class="actionIcon">mdi-forum</v-icon>
        {{ lang.discord }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { Device } from "@capacitor/device";

export default {
  data() {
    return {
      version: process.env.version,
      release: process.env.channel,
      deviceInfo: "",
      lang: {},
    };
  },
  computed: {
    roundTweak() {
      return this.$store.state.tweaks.roundTweak;
    },
  },

  async mounted() {
    const info = await Device.getInfo();
    this.deviceInfo = info;

    this.lang = this.$lang().mods.about;
  },
  methods: {
    openExternal(url) {
      this.$vuetube.openExternal(url);
    },
  },
};
</script>

<style scoped>
.obj {
  margin-top: 1em;
}
.action {
  min-height: 5em;
  padding: 1rem;
}
.actionIcon {
  margin-right: 0.5em;
}
</style>
