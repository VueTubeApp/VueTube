<template>
  <v-app dark>

    <v-card class="topNav rounded-0" style="display: flex;">
      <img src="/icon.svg" height="30px" />
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
  margin-bottom: -10em;
  margin-left: 2em;
  transform: translateY(-2.5%);
  border-radius: 5px;
  border-bottom-left-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
}
</style>

<script>
  export default {
    data: () => ({
      tabSelection: 0,
      tabs: [
        { name: "Home", icon: "mdi-home", link: "/" },
        { name: "Shorts", icon: "mdi-lightning-bolt", link: "/shorts" },
        { name: "Upload", icon: "mdi-plus", link: "/upload" },
        { name: "Subscriptions", icon: "mdi-youtube-subscription", link: "/subs" },
        { name: "Library", icon: "mdi-view-list", link: "/library" },
      ]
    }),
  }
</script>
