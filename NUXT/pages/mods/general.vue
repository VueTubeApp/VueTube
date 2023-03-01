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
      style="overflow: hidden; position: relative"
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
      <div
        v-if="roundTweak > 0"
        class="circle"
        :class="watchTelemetry ? '' : 'moved'"
        style="width: 11rem; height: 11rem"
      ></div>
      <div
        v-if="roundTweak > 0"
        class="circle"
        :class="watchTelemetry ? '' : 'moved'"
        style="width: 7rem; height: 7rem"
      ></div>
      <v-icon
        class="pr-8 pl-4 py-12"
        style="border-radius: 0rem !important; transition: all 0.2s ease"
        :style="{
          translate:
            watchTelemetry && $store.state.tweaks.roundTweak > 0
              ? '0 1.75rem'
              : '0 -1.5rem',
          scale: watchTelemetry ? '1.1' : '1',
          color: watchTelemetry ? 'var(--v-primary-base)' : '',
        }"
      >
        {{
          watchTelemetry
            ? "mdi-account-card-outline"
            : "mdi-account-lock-outline"
        }}
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
        <div class="mb-4">{{ lang.personalizedrecommendations }}</div>
        <div
          class="background--text"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
          style="font-size: 0.75rem; margin-top: -0.25rem !important"
        >
          {{ lang.personalizedrecommendationsinfo }}
        </div>
      </div>
      <v-switch
        v-model="watchTelemetry"
        class="mt-4"
        style="pointer-events: none"
        inset
      />
    </v-card>

    <!-- Clear Watch History -->
    <!-- <v-dialog v-model="dialog" class="ma-0">
      <template #activator="{ on, attrs }">
        <v-btn
          class="mx-4"
          color="background"
          :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
          style="text-transform: none !important; width: calc(100% - 2rem)"
          :style="{
            borderRadius: `${roundTweak / 4}rem`,
          }"
          v-bind="attrs"
          v-on="on"
        >
          Reset Recommendations
        </v-btn>
      </template>

      <v-card
        class="ma-0 no-shadow"
        :style="{
          borderRadius: `${roundTweak / 2}rem`,
        }"
      >
        <v-card-title class="primary background--text"> Warning </v-card-title>
        <v-card-text
          class="background--text pt-6"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
        >
          This will erase your watch history and reset personalized
          recommendations.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-none">
          <v-btn
            text
            color="primary"
            :style="{
              borderRadius: `${roundTweak / 4}rem`,
            }"
            @click="dialog = false"
            >Cancel</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            text
            :color="
              $vuetify.theme.dark
                ? 'background lighten-4'
                : 'background darken-4'
            "
            :style="{
              borderRadius: `${roundTweak / 4}rem`,
            }"
            @click="(dialog = false), clearHistory()"
          >
            Proceed
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <!--   Backup   -->
    <!-- <v-card
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
        <v-btn
          rounded
          depressed
          class="background--text ml-2"
          color="primary"
          @click="registryBackup"
          >{{ lang.backup }}</v-btn
        >
        <v-btn rounded @click="registryRestore">{{ lang.restore }}</v-btn>
      </v-card-actions>
    </v-card> -->
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
      dialog: false,
      lang: {},
    };
  },
  computed: {
    watchTelemetry: {
      get() {
        return this.$store.state.watchTelemetry;
      },
      set(value) {
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
    clearHistory() {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    },
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
.circle {
  left: -2rem;
  bottom: -2rem;
  opacity: 0.25;
  position: absolute;
  border-radius: 50%;
  background: var(--v-primary-base);
  transition: all 0.25s ease;
}
.moved {
  bottom: -8rem;
  left: -16rem;
}
</style>
