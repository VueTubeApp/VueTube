<template>
  <div>
    <v-list-item v-for="(item, index) in releases" :key="index" class="my-1">
      <v-card
        flat
        class="card my-2 background"
        :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
        :style="{ borderRadius: `${roundTweak / 2}rem` }"
      >
        <v-card-title style="padding: 0 0.25em 0 0.75em">
          {{ item.tag_name }}
          <span
            class="subtitle background--text"
            :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
            v-text="`• ${ new Date(item.published_at).toLocaleString() }`"
          />
        </v-card-title>

        <div style="margin-left: 1em">
          {{ item.body }}
        </div>

        <v-card-actions>
          <v-chip
            v-if="index == 0"
            class="tags"
            color="orange"
            style="border-radius: 0.5rem; border: 2px var(--v-orange-base)"
            >{{ lang.latest }}</v-chip
          >
          <v-chip
            v-if="item == installedVersion"
            class="tags"
            color="green"
            style="border-radius: 0.5rem; border: 2px var(--v-green-base)"
            >{{ lang.installed }}</v-chip
          >
          <v-spacer />
          <v-btn @click="openExternal(item)" class="background">
            <v-icon class="btn-icon">mdi-github</v-icon>{{ lang.view }}
          </v-btn>
          <v-btn disabled @click="install(item)">
            <v-icon class="btn-icon">mdi-download</v-icon>{{ lang.install }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-list-item>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
}

.subtitle {
  margin: 0.4em;
  font-size: 0.75em;
  transform: translateY(5%);
}

.date {
  transform: translateY(-40%);
}

.btn-icon {
  margin-right: 0.25em;
}

.tags {
  margin-left: 0.5em;
}
</style>

<script>
import { Browser } from "@capacitor/browser";

export default {
  computed: {
    roundTweak() {
      return this.$store.state.tweaks.roundTweak;
    },
  },
  data() {
    return {
      releases: new Array(),
      installedVersion: process.env.appVersion,
      lang: {},
    };
  },
  async mounted() {
    this.releases = await this.$vuetube.releases;
    

    this.lang = this.$lang("mods").updates;
  },
  methods: {
    async openExternal(item) {
      await Browser.open({
        url: item.html_url,
      });
    },

    install(item) {
      this.$vuetube.getRuns(item, (data) => {
        console.log(data);
      });
    },
  },
};
</script>
