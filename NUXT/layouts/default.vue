<template>
  <v-app>
    <v-card class="topNav rounded-0" style="display: flex; box-shadow: none !important;" color="accent white--text">
      <h2 v-text="page" />
      <v-spacer />

      <v-btn text class="toolbarAction mr-2 fill-height" color="white" @click="search = !search"><v-icon>mdi-magnify</v-icon></v-btn>
      
      <v-menu offset-y content-class="mt-8">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text class="toolbarAction fill-height" v-bind="attrs" v-on="on" color="white" style="padding-right: 0 !important;"><v-icon>mdi-dots-vertical</v-icon></v-btn>

        </template>
        <v-list style="min-width: 150px;">
          <v-list-item v-for="(item, index) in dropdownMenu" :key="index">
            <nuxt-link :to="item.link" style="text-decoration: none; width: 100%;" class="info--text">{{ item.title }}</nuxt-link>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card>

    <searchOverlay v-if="search" />

    <div class="accent" style="height: 100%">
      <div class="background" style="height: 100%; border-radius: 1rem 1rem 0 0;">
        <nuxt />
      </div>
    </div>

    <v-bottom-navigation v-model="tabSelection" shift class="bottomNav py-4 background" style="height: 5rem;">
      <v-btn v-for="(item, i) in tabs" :key="i" rounded class="navButton mx-2" style="height: 3rem; border-radius: 2rem;" :to="item.link">

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
  min-width: 40px !important;
}

.topNav {
  padding: 1rem;
}
.bottomNav {
  position: fixed;
  bottom: 0;
}
.navButton {
  width: 25vw !important;
  font-size: .66rem !important;
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
import search from '../pages/search.vue';
  export default {
  components: { search },
    data: () => ({
      search: false,

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
