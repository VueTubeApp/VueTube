<template>
  <div>
    <v-list-item v-for="(item, index) in logs" :key="index">
      <v-card
        class="card background"
        :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
        flat
      >
        <v-card-title>
          <v-chip v-if="item.error" outlined class="errorChip" color="error"
            >Error</v-chip
          >
          {{ item.name }}
          <span
            class="date background--text"
            :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
            v-text="`• ${new Date(item.time).toLocaleString()}`"
          />
        </v-card-title>

        <v-expansion-panels>
          <v-expansion-panel
            class="background"
            :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
          >
            <v-expansion-panel-header>More</v-expansion-panel-header>
            <v-expansion-panel-content class="logContent" v-text="item.data" />
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-list-item>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  margin: 1em 0 1em 0;
}
.date {
  margin: 0.4em;
  font-size: 0.75em;
  transform: translateY(5%);
}
.errorChip {
  margin-right: 0.5em;
}
.logContent {
  padding: 1em;
  word-break: break-all;
}
</style>

<script>
export default {
  data() {
    return {
      logs: new Array(),
    };
  },
  mounted() {
    const logs = this.$youtube.logs;
    this.logs = logs;
  },
};
</script>
