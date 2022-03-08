<template>
  <div>

    <v-list-item v-for="(item, index) in commits" :key="index">
      <v-card class="card">
        <v-card-title style="padding-bottom: 0;">
          {{ item.author.login }}
          <span v-text="`• ${item.sha.substring(0, 7)}`" class="subtitle" />
        </v-card-title>

        <div style="margin-left: 1em;">
          <div class="date" v-text="new Date(item.commit.committer.date).toLocaleString()" />
          {{ item.commit.message }}
        </div>

        <v-card-actions>
          <v-spacer />
          <v-btn @click="openExternal(item)"><v-icon>mdi-open-in-new</v-icon>Open</v-btn>
          <v-btn disabled><v-icon>mdi-download</v-icon>Download</v-btn>
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
</style>

<script>
import { Browser } from '@capacitor/browser';

export default {
  data() {
    return {
      commits: new Array()
    }
  },
  mounted() {
    this.$vuetube.commits((commits) => {
      if (commits[0].sha) { //If Commit Valid
        this.commits = commits;
      } else {
        console.log(commits)
      }
    })
  },
  methods: {
    async openExternal(item) {
      await Browser.open({ url: item.html_url });
    }
  }
}
</script>
