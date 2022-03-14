<template>
  <div>

    <v-list-item v-for="(item, index) in logs" :key="index">
      <v-card class="card">
        <v-card-title>
          <v-chip outlined class="errorChip" color="error" v-if="item.error">Error</v-chip>
          {{ item.name }}
          <span v-text="`• ${new Date(item.time).toLocaleString()}`" class="date" />
        </v-card-title>

        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>More</v-expansion-panel-header>
            <v-expansion-panel-content v-text="item.data" class="logContent" />
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
  color: #999;
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
      logs: new Array()
    }
  },
  mounted() {
    const logs = this.$youtube.logs
    this.logs = logs;
  }
}
</script>
