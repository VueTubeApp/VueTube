<template>
  <div>

    <v-list-item v-for="(item, index) in commits" :key="index">
      <v-card class="card">
        <v-card-title style="padding: 0 0.25em 0 0.75em;">
          {{ item.author.login }}
          <span v-text="`• ${item.sha.substring(0, 7)}`" class="subtitle" />
          <v-spacer />
          <v-chip outlined class="tags" color="orange" v-if="index == 0">Latest</v-chip>
          <v-chip outlined class="tags" color="green" v-if="item.sha == installedVersion">Installed</v-chip>
        </v-card-title>

        <div style="margin-left: 1em;">
          <div class="date" v-text="new Date(item.commit.committer.date).toLocaleString()" />
          {{ item.commit.message }}
        </div>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="openExternal(item)"><v-icon class="btn-icon">mdi-github</v-icon>View</v-btn>
          <v-btn disabled @click="install(item)"><v-icon class="btn-icon">mdi-download</v-icon>Install</v-btn>
        </v-card-actions>

      </v-card>
    </v-list-item>

  </div>
</template>

<style scoped>
.card {
  width: 100%;
  margin: 1em 0 1em 0;
}
.subtitle {
  margin: 0.4em;
  font-size: 0.75em;
  transform: translateY(5%);
  color: #999;
}
.date {
  color: #999;
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
import { Browser } from '@capacitor/browser';

export default {
  data() {
    return {
      commits: new Array(),
      installedVersion: process.env.appVersion
    }
  },
  async mounted() {
    const commits = await this.$vuetube.commits;
    if (commits[0].sha) { //If Commit Valid
      this.commits = commits;
    } else {
      console.log(commits)
    }
  },
  methods: {
    async openExternal(item) {
      await Browser.open({ url: item.html_url });
    },

    install(item) {
      this.$vuetube.getRuns(item, (data) => {
        console.log(data)
      });

    }
  }
}
</script>
