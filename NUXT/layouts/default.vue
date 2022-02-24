<template>
  <v-app>

    <v-card class="topNav rounded-0" style="display: flex;" color="accent">
      <h2>Home</h2>
      <v-spacer />
      <v-btn text><v-icon>mdi-magnify</v-icon></v-btn>
      <v-btn text><v-icon>mdi-dots-vertical</v-icon></v-btn>
    </v-card>


    <div>
      <nuxt />
    </div>

    <v-bottom-navigation v-model="tabSelection" class="bottomNav rounded-0">
      <v-btn v-for="(item, i) in tabs" :key="i" class="navButton" :to="item.link">

        <span v-text="item.name" />
        <v-icon v-text="item.icon" :color="tabSelection == i ? 'primary' : 'grey'" />

      </v-btn>
    </v-bottom-navigation>


  </v-app>
</template>

<style>
* {
  font-family: Arial, Helvetica, sans-serif !important;
}
</style>

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
        //{ name: "Shorts", icon: "mdi-lightning-bolt", link: "/shorts" },
        //{ name: "Upload", icon: "mdi-plus", link: "/upload" },
        { name: "Subscriptions", icon: "mdi-youtube-subscription", link: "/subs" },
        { name: "Library", icon: "mdi-view-list", link: "/library" },
      ]
    }),
  }
</script>
