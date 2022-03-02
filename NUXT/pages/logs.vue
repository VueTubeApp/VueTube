<template>
  <div>

    <v-list-item v-for="(item, index) in logs" :key="index">
      <v-card class="card">
        <v-card-title>
          {{ item.name }}
          <span v-text="`• ${new Date(item.time).toLocaleString()}`" class="date" />
        </v-card-title>
        <v-card-text v-text="item.data" />
      </v-card>
    </v-list-item>
    <br><br><br> <!--   Temp fix for last log entries being cut off   -->

  </div>
</template>

<style scoped>
.card {
  width: 100%;
  margin-top: 1em;
}
.date {
  margin: 0.4em;
  font-size: 0.75em;
  transform: translateY(5%);
  color: #999;
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
