<template>
  <v-app dark>

    <v-card class="topNav rounded-0" style="display: flex;">
      <img src="/icon.svg" height="40px" />
      <v-spacer />
      <v-text-field outlined dense label="Search" prepend-inner-icon="mdi-magnify" class="topNavSearch" />
    </v-card>


    <v-app-content>
      <nuxt />
    </v-app-content>

    <v-bottom-navigation v-model="tabSelection" class="bottomNav rounded-0">
      <v-btn v-for="(item, i) in tabs" :key="i" class="navButton">
        
        <span v-text="item.name" />
        <v-icon v-text="item.icon" :color="tabSelection == i ? 'primary' : 'white'" />

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
.topNavSearch {
  margin-bottom: -100em;
  margin-left: 2em;
}
</style>

<script>
  export default {
    data: () => ({
      tabSelection: 0,
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
