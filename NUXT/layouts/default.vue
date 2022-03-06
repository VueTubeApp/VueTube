<template>
  <v-app>
    <v-card class="topNav rounded-0" style="display: flex; box-shadow: none !important;" color="accent white--text">
      <h2 v-text="page" />
      <v-spacer />

      <v-btn text class="toolbarAction mr-2 fill-height" color="white" @click="search = !search"><v-icon>mdi-magnify</v-icon></v-btn>

      <v-menu offset-y content-class="mt-8">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text class="toolbarAction fill-height" v-bind="attrs" v-on="on" color="white"><v-icon>mdi-dots-vertical</v-icon></v-btn>

        </template>
        <v-list style="min-width: 180px;">
          <v-list-item v-for="(item, index) in dropdownMenu" :key="index">
            <v-btn text :to="item.link" style="text-decoration: none; width: 100%;" class="info--text">{{ item.title }}</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-card>


    <div class="accent" style="height: 100%">
      <div class="background">
        <searchOverlay v-if="search" />
        <nuxt v-show="!search" />
      </div>
    </div>

    <bottomNavigation v-if="!search" />


  </v-app>
</template>

<style>
* {
  font-family: Arial, Helvetica, sans-serif !important;
}
html, body {
  overflow-x: hidden;
}
</style>

<style scoped>
.toolbarAction {
  min-width: 40px !important;
}
.topNav {
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 999;
  /*border-radius: 0 0 1em 1em !important;*/
}
.topNavSearch {
  margin-bottom: -10em;
  margin-left: 2em;
  /*transform: translateY(-2.5%);*/
}
.background {
  height: 100%;
  /*border-radius: 1rem 1rem 0 0;*/ /* Causes really weird display issues */
}
</style>

<script>
  export default {
    data: () => ({
      search: false,

      dropdownMenu: [
        { title: "Settings", link: "/settings" },
        { title: "About", link: "/about" },
        { title: "Logs", link: "/logs" }
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
