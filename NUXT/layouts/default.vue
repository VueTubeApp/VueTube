<template>
  <v-app class="background">
    <v-card class="topNav rounded-0" style="display: flex;" color="accent white--text">
      <h2 v-text="page" />
      <v-spacer />
      <v-btn text class="toolbarAction" color="white"><v-icon>mdi-magnify</v-icon></v-btn>
      
      <v-menu offset-y content-class="mt-4">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text class="toolbarAction" v-bind="attrs" v-on="on" color="white" style="padding-right: 0 !important;"><v-icon>mdi-dots-vertical</v-icon></v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in dropdownMenu" :key="index">
            <nuxt-link :to="item.link" style="text-decoration: none;" class="info--text">{{ item.title }}</nuxt-link>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card>

    <div class="background" style="min-height: 100%">
      <nuxt />
    </div>

    <v-bottom-navigation v-model="tabSelection" shift class="bottomNav background rounded-0">
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
.toolbarAction {
  min-width: 50px !important;
}

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
      ],
      dropdownMenu: [
        { title: "Settings", link: "/settings" },
        { title: "About", link: "/about" }
      ]
    }),
    mounted() {
      
    },
    computed: {
      page: function () {
        let pageName = this.$route.path.split("/")[1];
        pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        return pageName || "Home";
      }
    }
  }
</script>
