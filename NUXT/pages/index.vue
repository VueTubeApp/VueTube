<template>
  <center class="container">
    <v-img
      src="/icon.svg"
      width="10rem"
      height="10rem"
      class="intro"
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
    progressMsg: "Fetching the API",
  }),
  async mounted() {
    this.$store.commit("tweaks/initTweaks");
    const theming = new Promise((resolve) =>
      // Set timeout is required for $vuetify.theme... dont ask me why -Front
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
    await this.$youtube.getAPI();
    this.progressMsg = "Navigating Home";
    
    //---   April First Joke   ---//
    if (Math.floor(Math.random() * 9 == 0)) {
      this.$router.push("/watch?v=dQw4w9WgXcQ");
      return;
    }
    //----------------------------//
    
    this.$router.push(`/${localStorage.getItem("startPage") || "home"}`);
  },
};
</script>

<style scoped>
.container {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.intro {
  opacity: 0;
  transform: scale(0.5);
  transition-property: opacity, transform;
  animation: bounce 0.66s ease infinite alternate;
}
/* triangles aren't very good at spinning :c */
@keyframes bounce {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* reduced-motion animations */
@media (prefers-reduced-motion) {
  .intro {
    opacity: 0;
    transform: scale(1);
    transition-property: opacity, transform;
    animation: fadein 0.5s ease 1 forwards;
  }
}
</style>
