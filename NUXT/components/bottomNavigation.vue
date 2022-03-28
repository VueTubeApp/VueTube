<template>
  <v-bottom-navigation
    v-model="tabSelection"
    shift
    class="bottomNav py-4 background"
  >
    <v-btn
      v-for="(item, i) in tabs"
      :key="i"
      v-ripple="false"
      class="navButton"
      :to="item.link"
      plain
    >
      <span v-text="item.name" />
      <v-icon
        :color="tabSelection == i ? 'primary' : 'grey'"
        :class="tabSelection == i ? 'tab primary lighten-1' : ''"
        v-text="item.icon"
      />
      <!-- 
        Add the following to 'v-text- above to make the icons outlined unless active
        + (tabSelection == i ? '' : '-outline')


       -->
    </v-btn>
    <!-- <v-btn text class="navButton mr-2 fill-height" color="white" @click="searchBtn()"
      ><v-icon>mdi-magnify</v-icon></v-btn
    > -->
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      tabSelection: 0,
      tabs: [
        // TODO: pull from Vuex & localStorage for customizations
        { name: "Home", icon: "mdi-home", link: "/home" },
        //{ name: "Shorts", icon: "mdi-lightning-bolt", link: "/shorts" },
        //{ name: "Upload", icon: "mdi-plus", link: "/upload" },
        {
          name: "Subscriptions",
          icon: "mdi-youtube-subscription",
          link: "/subscriptions",
        },
        { name: "Library", icon: "mdi-view-list", link: "/library" },
        // { name: "Settings", icon: "mdi-menu", link: "/settings" },
      ],
    };
  },
};
</script>

<style scoped>
.bottomNav {
  box-shadow: none !important;
  height: 4rem !important;
  position: fixed;
  /* bottom: env(safe-area-inset-bottom) !important; */
  bottom: 0;
  padding: 0 !important;
  z-index: 99999;
}
.navButton {
  width: 25vw !important;
  font-size: 0.66rem !important;
}
.tab {
  padding: 0.1em 0.5em 0.1em 0.5em;
  border-radius: 1em;
}
</style>
