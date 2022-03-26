<template>
  <center class="container">
    <v-img
      src="/icon.svg"
      width="10em"
      style="margin-bottom: 1em"
      :class="$vuetify.theme.dark ? '' : 'invert'"
    />
    <v-progress-circular size="50" indeterminate color="primary" />
  </center>
</template>

<script>
export default {
  layout: "empty",

  //---   Hide Splash Screen   ---//
  async beforeCreate() {
    const { SplashScreen } = await require("@capacitor/splash-screen"); // This has to be imported here, otherwise NUXT won't import the package because its so early in the lifecycle -Front
    await SplashScreen.hide();
  },
  //---   End Hide Splash Screen   ---//

  async mounted() {
    //---   Theme Loader Moved From '~/layouts/default.vue' (because this only needs to be run once) -Front   ---//
    setTimeout(() => {
      //Set timeout is required to make it load properly... dont ask me why -Front
      const darkTheme = localStorage.getItem("darkTheme");
      if (darkTheme == "true") {
        this.$vuetify.theme.dark = darkTheme;
        //this.$vuetube.statusBar.setDark(); //Not needed unless setLight() is used below -Front
        this.$vuetube.statusBar.setBackground(
          this.$vuetify.theme.themes.dark.accent
        );

        const isOled = localStorage.getItem("isOled");

        if (isOled == "true") {
          (this.$vuetify.theme.themes.dark.accent = "#000"),
            (this.$vuetify.theme.themes.dark.accent = "#000"),
            (this.$vuetify.theme.themes.dark.background = "#000");
        } else {
          (this.$vuetify.theme.themes.dark.accent = "#222"),
            (this.$vuetify.theme.themes.dark.accent = "#222"),
            (this.$vuetify.theme.themes.dark.background = "#333");
        }
      } else {
        //this.$vuetube.statusBar.setLight() //Looks weird -Front
        this.$vuetube.statusBar.setBackground(
          this.$vuetify.theme.themes.light.accent
        );
      }
    }, 0);
    //-----------------------------------------------------------------------------------------------------------//

    await this.$youtube.getAPI();
    this.$router.push(`/${localStorage.getItem("startPage") || "home"}`);
  },
};
</script>

<style scoped>
.container {
  padding-top: 3em;
  display: block;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
}
</style>
