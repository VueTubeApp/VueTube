<template>
  <div>

    <v-list-item v-for="(item, index) in logs" :key="index">
      <v-card class="card">
        <v-card-title v-text="`${item.name} - ${new Date(item.time).toLocaleString()}`" />
        <v-card-text v-text="item.data" />
      </v-card>
    </v-list-item>

  </div>
</template>

<style scoped>
.card {
  width: 100%;
  margin-top: 1em;
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
