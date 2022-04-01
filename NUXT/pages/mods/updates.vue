<template>
  <div class="py-2">
    <v-list-item v-for="(item, index) in commits" :key="index" class="my-1">
      <v-card
        flat
        class="card my-2 background"
        :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      >
        <v-card-title style="padding: 0 0.25em 0 0.75em">
          {{ item.author ? item.author.login : item.commit.author.name }}
          <span
            class="subtitle background--text"
            :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
            v-text="`• ${item.sha.substring(0, 7)}`"
          />
          <v-spacer />
          <v-chip
            v-if="index == 0"
            class="tags"
            color="orange"
            style="
              border-radius: 0.5rem;
              border: 2px var(--v-oragnge-base);
              margin-top: -1.5rem;
              margin-right: -0.5rem;
            "
          >
            Latest
          </v-chip>
          <v-chip
            v-if="item.sha == installedVersion"
            class="tags"
            color="green"
            style="
              border-radius: 0.5rem;
              border: 2px var(--v-green-base);
              margin-top: -1.5rem;
              margin-right: -0.5rem;
            "
          >
            >Installed</v-chip
          >
        </v-card-title>

        <div style="margin-left: 1em">
          <div
            class="date background--text"
            :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
            v-text="new Date(item.commit.committer.date).toLocaleString()"
          />
          {{ item.commit.message }}
        </div>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="openExternal(item)" class="background">
            <v-icon class="btn-icon">mdi-github</v-icon>View
          </v-btn>
          <v-btn disabled @click="install(item)">
            <v-icon class="btn-icon">mdi-download</v-icon>Install
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
  data() {
    return {
      commits: new Array(),
      installedVersion: process.env.appVersion,
    };
  },
  async mounted() {
    const commits = await this.$vuetube.commits;
    if (commits[0].sha) {
      //If Commit Valid
      this.commits = commits;
    } else {
      console.log(commits);
    }
  },
  methods: {
    async openExternal(item) {
      await Browser.open({ url: item.html_url });
    },

    install(item) {
      this.$vuetube.getRuns(item, (data) => {
        console.log(data);
      });
    },
  },
};
</script>
