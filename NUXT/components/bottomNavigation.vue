<template>
  <div class="bottomNav background">
    <v-divider v-if="!$store.state.tweaks.roundTweak" />
    <v-bottom-navigation
      v-model="tabSelection"
      style="padding: 0 !important; box-shadow: none !important"
      class="transparent"
      shift
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
          :color="
            tabSelection == i
              ? 'primary'
              : $vuetify.theme.dark
              ? 'background lighten-4'
              : 'background darken-4'
          "
          :class="
            tabSelection == i
              ? $vuetify.theme.dark
                ? 'tab primary darken-4'
                : 'tab primary lighten-4'
              : ''
          "
          v-text="item.icon"
        />
        <!-- 
      <span v-text="item.name" />
      <v-icon
        :color="
          tabSelection == i
            ? 'primary'
            : $vuetify.theme.dark
            ? 'background lighten-4'
            : 'background darken-4'
        "
        :class="
          tabSelection == i
            ? $vuetify.theme.dark
              ? 'tab primary darken-4'
              : 'tab primary lighten-4'
            : ''
        "
        v-text="item.icon"
      /> -->
        <!-- Add the following to 'v-text- above to make the icons outlined unless active
        + (tabSelection == i ? '' : '-outline')
       -->
      </v-btn>
      <!-- <v-btn
        text
        class="navButton mr-2 fill-height"
        color="white"
        @click="searchBtn()"
        ><v-icon>mdi-magnify</v-icon></v-btn
      > -->
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabSelection: 0,
      tabs: [
        // TODO: pull from Vuex & localStorage for customizations
        { name: "", icon: "mdi-home", link: "/home" },
        //{ name: "Shorts", icon: "mdi-lightning-bolt", link: "/shorts" },
        //{ name: "Upload", icon: "mdi-plus", link: "/upload" },
        {
          name: "",
          icon: "mdi-youtube-subscription",
          link: "/subscriptions",
        },
        { name: "", icon: "mdi-view-list", link: "/library" },
        // { name: "Settings", icon: "mdi-menu", link: "/settings" },
      ],
    };
  },

  mounted() {
    const lang = this.$lang("global");
    this.tabs[0].name = lang.home;
    this.tabs[1].name = lang.subscriptions;
    this.tabs[2].name = lang.library;
  },
};
</script>

<style scoped>
.bottomNav {
  /* box-shadow: inset 0 0 10rem var(--v-background-base) !important; */
  height: calc(4rem + env(safe-area-inset-bottom)) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  box-shadow: none !important;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 100;
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
