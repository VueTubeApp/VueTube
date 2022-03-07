<template>

  <v-bottom-navigation v-model="tabSelection" shift class="bottomNav py-4 accent2">
    <v-btn v-for="(item, i) in tabs" :key="i" rounded class="navButton" :to="item.link" plain v-ripple="false">

      <span v-text="item.name" />
      <v-icon v-text="item.icon" :color="tabSelection == i ? 'primary' : 'grey'" :class="tabSelection == i ? 'tab primaryAlt' : ''" />

    </v-btn>
  </v-bottom-navigation>

</template>


<script>
export default {
  data() {
    return {
      tabSelection: 0,
      tabs: [
        { name: "Home", icon: "mdi-home", link: "/" },
        //{ name: "Shorts", icon: "mdi-lightning-bolt", link: "/shorts" },
        //{ name: "Upload", icon: "mdi-plus", link: "/upload" },
        { name: "Subscriptions", icon: "mdi-youtube-subscription", link: "/subscriptions" },
        { name: "Library", icon: "mdi-view-list", link: "/library" },
      ],
    }
  }
}
</script>

<style scoped>
.bottomNav {
  position: fixed;
  bottom: 0;
  padding: 0 !important;
  z-index: 99999;
}
.navButton {
  width: 25vw !important;
  font-size: .66rem !important;
  /*border-radius: 2rem !important;*/
}
.tab {
  padding: 0.1em 0.5em 0.1em 0.5em;
  border-radius: 1em;
}
</style>
