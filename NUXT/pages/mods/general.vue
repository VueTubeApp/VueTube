<template>
  <div class="mainContainer pt-1">
    <!--   Language Picker   -->
    <v-card
      flat
      class="pb-5 background"
      :class="
        roundTweak > 0 ? ($vuetify.theme.dark ? 'lighten-1' : 'darken-1') : ''
      "
      :style="{ borderRadius: `${roundTweak / 2}rem` }"
    >
      <v-card-title>{{ lang.language }}</v-card-title>
      <v-card-text>
        <language />
      </v-card-text>
    </v-card>

    <!-- Personalized Recommendations / Watch Time Telemetry -->
    <v-divider v-if="!$store.state.tweaks.roundTweak" />
    <v-card
      flat
      class="d-flex flex-row mx-4 mb-4 pr-4 background"
      style="overflow: hidden"
      :class="
        $store.state.tweaks.roundTweak > 0
          ? $vuetify.theme.dark
            ? 'lighten-1'
            : 'darken-1'
          : ''
      "
      :style="{
        borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
        padding: !$store.state.tweaks.roundTweak ? '2rem !important' : '',
        margin: !$store.state.tweaks.roundTweak ? '0 !important' : '',
      }"
      @click="
        (watchTelemetry = !watchTelemetry),
          $vuetube.haptics.hapticsImpactLight(1)
      "
    >
      <v-icon
        class="pr-8 pl-4"
        style="border-radius: 0rem !important"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? 'background lighten-2'
              : 'background darken-2'
            : ''
        "
        :style="{
          color: watchTelemetry ? 'var(--v-primary-base)' : '',
        }"
      >
        mdi-account-card-outline
      </v-icon>
      <div
        class="my-auto pa-4 ml-n4 background"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? 'lighten-1'
              : 'darken-1'
            : ''
        "
        style="position: relative"
        :style="{
          boxShadow:
            $store.state.tweaks.roundTweak > 0
              ? 'inset 1rem 0 1rem -1rem var(--v-background-base)'
              : '',
          borderRadius: `${$store.state.tweaks.roundTweak / 4}rem`,
        }"
      >
        <div class="mb-4">Personalized Recommendations</div>
        <div
          class="background--text"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
          style="font-size: 0.75rem; margin-top: -0.25rem !important"
        >
          Receive personalized recommendations in exchange for sending watch
          time telemetry.
        </div>
      </div>
      <v-spacer />
      <v-switch
        v-model="watchTelemetry"
        style="pointer-events: none"
        class="mt-4"
        inset
      />
    </v-card>

    <!--   Backup   -->
    <!--
    <v-card
      flat
      class="pb-5 background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      :style="{ borderRadius: `${roundTweak / 2}rem` }"
    >
      <v-card-title>{{ lang.backup }}</v-card-title>
      <v-card-text>
        <p>{{ lang.backupinfo }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn rounded depressed class="background--text ml-2" color="primary" @click="registryBackup">{{ lang.backup }}</v-btn>
        <v-btn rounded @click="registryRestore">{{ lang.restore }}</v-btn>
      </v-card-actions>
    </v-card>
    -->
  </div>
</template>

<script>
import language from "~/components/Settings/language.vue";
export default {
  components: {
    language,
  },
  data() {
    return {
      lang: {},
    };
  },
  computed: {
    watchTelemetry: {
      get() {
        return this.$store.state.watchTelemetry;
      },
      set(value) {
        console.warn("Setting watchTelemetry to " + value);
        this.$store.commit("setTelemetryPreference", value);
      },
    },
    roundTweak() {
      return this.$store.state.tweaks.roundTweak;
    },
  },
  mounted() {
    const lang = this.$lang();
    this.lang = lang.mods.general;
  },
  methods: {
    download(filename, text) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },

    getRegistry() {
      let keys = [];
      const localStorageKeys = Object.keys(localStorage);
      for (const i in localStorageKeys) {
        const key = localStorageKeys[i];
        const keyValue = localStorage.getItem(key);
        keys.push({ key: key, value: keyValue });
      }
      return keys;
    },

    registryBackup() {
      const file = JSON.stringify({
        scheme: "VueTube Backup",
        version: process.env.version,
        channel: process.env.channel,
        date: Date.now(),
        registry: this.getRegistry(),
      });
      this.download("vuetube-backup.json", file);
    },
    registryRestore() {},
  },
};
</script>

<style scoped>
.v-card {
  margin: 1em;
}

section {
  padding: 0 1em 1em 1em;
}
</style>
