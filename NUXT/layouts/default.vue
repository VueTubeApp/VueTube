<template>
  <v-app dark>

    <v-card v-model="value" class="topNav rounded-0">
      <span>NotShitTube</span>
    </v-card>


    <v-app-content>
      <nuxt />
    </v-app-content>

    <v-bottom-navigation v-model="value" class="bottomNav rounded-0">
      <v-btn v-for="(item, i) in tabs" :key="i" class="navButton">
        <span v-text="item.name" />

        <v-icon v-text="item.icon" />
      </v-btn>
    </v-bottom-navigation>


  </v-app>
</template>

<style scoped>
.topNav {
  padding: 1em;
}
.bottomNav {
  position: absolute;
  bottom: 0;
}
.navButton {
  width: 20vw !important;
}
</style>

<script>
  export default {
    data: () => ({
      value: 0,
      tabs: [
        { name: "Home", icon: "mdi-home" },
        { name: "Shorts", icon: "mdi-lightning-bolt" },
        { name: "Upload", icon: "mdi-plus" },
        { name: "Subscriptions", icon: "mdi-youtube-subscription" },
        { name: "Library", icon: "mdi-view-list" },
      ]
    }),
  }
</script>
