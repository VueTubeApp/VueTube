<template>
  <center v-show="themeFetched" class="container">
    <v-img
      src="/icon.svg"
      width="10rem"
      height="10rem"
      class="youspinmerightround"
      :class="$vuetify.theme.dark ? '' : 'invert'"
    />
    <div style="height: 5rem" />
    <v-progress-linear rounded height="8" indeterminate color="primary" />
    <div class="pt-2">{{ progressMsg }}...</div>
  </center>
</template>

<script>
export default {
  layout: "empty",

  data: () => ({
    progressMsg: "Theming",
    themeFetched: false,
  }),

  beforeCreate() {
    this.$store.commit("tweaks/initTweaks");
    // This has to be imported here,otherwise NUXT won't import the package because its so early in the lifecycle -Front
    // const { SplashScreen } = await require("@capacitor/splash-screen");
    // await SplashScreen.hide();
  },

  async mounted() {
    // Set timeout is required for $vuetify.theme... dont ask me why -Front
    const theming = new Promise((resolve) =>
      setTimeout(() => {
        this.$vuetify.theme.dark = JSON.parse(localStorage.getItem("darkTheme")) === true;
        if (localStorage.getItem("primaryDark") != null)
          this.$vuetify.theme.themes.dark.primary = localStorage.getItem("primaryDark");
        if (localStorage.getItem("primaryLight") != null)
          this.$vuetify.theme.themes.light.primary = localStorage.getItem("primaryLight");
        if (localStorage.getItem("backgroundDark") != null)
          this.$vuetify.theme.themes.dark.background = localStorage.getItem("backgroundDark");
        if (localStorage.getItem("backgroundLight") != null)
          this.$vuetify.theme.themes.light.background = localStorage.getItem("backgroundLight");
        this.themeFetched = true;
        this.$vuetube.navigationBar.setTheme(
          this.$vuetify.theme.currentTheme.background,
          !this.$vuetify.theme.dark
        );
        this.$vuetube.statusBar.setTheme(
          this.$vuetify.theme.currentTheme.background,
          this.$vuetify.theme.dark
        );
        resolve();
      }, 0)
    );

    await theming;
    this.progressMsg = "Fetching the API";
    await this.$youtube.getAPI();
    this.progressMsg = "Navigating Home";
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
.youspinmerightround {
  opacity: 0;
  transform: scale(0.5);
  transition-property: opacity, transform;
  animation: likearecord 0.66s ease infinite alternate;
}
/* triangles aren't very good at spinning :c */
@keyframes likearecord {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
