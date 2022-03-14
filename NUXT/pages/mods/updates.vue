<template>
  <div>

    <v-list-item v-for="(item, index) in commits" :key="index">
      <v-card class="card">
        <v-card-title class="title" @click="openExternal(item)">
          {{ item.commit.message }}
          <v-spacer />
          <v-chip outlined class="tags" color="orange" v-if="index == 0">Latest</v-chip>
          <v-chip outlined class="tags" color="green" v-if="item.sha == installedVersion">Installed</v-chip>
        </v-card-title>

        <div class="date-hash">
          <div v-text="new Date(item.commit.committer.date).toLocaleString([], {dateStyle: 'medium',timeStyle: 'short'}) + ' • ' + item.sha.substring(0, 7)" />
        </div>

        <v-card-text class="author">
          <span>by {{item.author.login}}</span>
        </v-card-text>

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
.author {
  text-align: right;
  padding: 0em 16px 0em 0em;
}
.btn-icon {
  margin-right: 0.25em;
}
.card {
  width: 100%;
  margin: 1em 0 1em 0;
}
.date-hash {
  color: #999;
  transform: translateY(-40%);
}
.date-hash div {
  margin-left: 1em;
}
.tags {
  margin-left: 0.5em;
}
.title {
  margin: 0 0 0 0;
  overflow-wrap: break-word;
  word-break: break-word;
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
