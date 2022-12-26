<template>
  <div
    class="d-flex flex-column justify-center align-center"
    style="height: 100vh"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10rem"
      height="10rem"
      xml:space="preserve"
      viewBox="0 0 512 512"
      class="intro iconsvgstuff"
      :style="{
        color: $store.state.tweaks.launchIconTheme
          ? $vuetify.theme.currentTheme.primary
          : '',
      }"
    >
      <g>
        <path
          d="M157.768,142.391C168.454,136.236 168.454,120.814 157.766,114.66L157.761,114.658L121.527,93.811L161.399,75.218L175.714,83.453L175.736,83.466L216.392,106.857C233.102,116.471 233.102,140.582 216.392,150.196L175.743,173.582L175.714,173.599L158.778,183.343L118.905,164.75L157.761,142.395L157.768,142.391ZM36,163.605L36,184.79C36.005,197.092 49.314,204.788 59.979,198.652L82.89,185.471L122.763,204.063L77.932,229.856L77.903,229.873L37.467,253.137C20.801,262.726 0,250.695 0,231.467L0,146.818L36,163.605ZM125.384,54.497L85.512,73.09L59.979,58.4L59.964,58.392C49.3,52.27 36,59.968 36,72.269L36,96.178L0,112.965L0,25.585C0,6.357 20.801,-5.673 37.467,3.916L77.917,27.187L77.932,27.196L125.384,54.497Z"
          transform="matrix(1.99234,0,0,1.99234,52.4337,-0.543689)"
          style="fill: currentColor"
        />
      </g>
    </svg>
    <div
      :style="{
        height: $store.state.tweaks.launchTheme === 1 ? '7rem' : '5rem',
      }"
    />
    <v-progress-linear
      :rounded="$store.state.tweaks.launchTheme === 0"
      height="8"
      indeterminate
      color="primary"
      :style="
        $store.state.tweaks.launchTheme === 1
          ? 'position: fixed; bottom: 0; left:0; width: 100vw;'
          : 'width: 10rem;'
      "
    />
    <div
      :style="
        $store.state.tweaks.launchTheme === 1
          ? 'position: fixed; bottom: 1rem; left: 0; width: 100vw;'
          : ''
      "
      class="pt-2 mx-auto text-center"
    >
      {{ progressMsg }}...
    </div>
  </div>
</template>

<script>
export default {
  layout: "empty",

  data: () => ({
    progressMsg: "...",
  }),
  async mounted() {
    //---   Init Stuff   ---//
    this.progressMsg = this.$lang("index").connecting;
    this.$store.commit("initTelemetryPreference");
    this.$store.commit("tweaks/initTweaks");
    this.$store.commit("player/initPlayer");
    await this.$vuetube.launchBackHandling();

    //---   Load Theming   ---//
    await this.theming();

    //---   Update Screen   ---//
    if (
      localStorage.getItem("lastRunVersion") != null &&
      localStorage.getItem("lastRunVersion") != process.env.version
    )
      return this.$router.replace("/activities/update");

    //---   Start Innertube Connection   ---//
    await this.$youtube.getAPI();
    this.progressMsg = this.$lang("index").launching;

    if (localStorage.getItem("firstTimeSetupComplete")) {
      this.$router.replace("/" + (localStorage.getItem("startPage") || "home")); // Normal Load
    } else {
      this.$router.replace("/activities/install"); // Load Into Setup
    }
  },
  methods: {
    theming() {
      return new Promise((resolve) =>
        // Set timeout is required for $vuetify.theme... dont ask me why -Front
        setTimeout(() => {
          this.$vuetify.theme.dark =
            JSON.parse(localStorage.getItem("darkTheme")) === true;
          if (localStorage.getItem("primaryDark") != null)
            this.$vuetify.theme.themes.dark.primary =
              localStorage.getItem("primaryDark");
          if (localStorage.getItem("primaryLight") != null)
            this.$vuetify.theme.themes.light.primary =
              localStorage.getItem("primaryLight");
          if (localStorage.getItem("backgroundDark") != null)
            this.$vuetify.theme.themes.dark.background =
              localStorage.getItem("backgroundDark");
          if (localStorage.getItem("backgroundLight") != null)
            this.$vuetify.theme.themes.light.background =
              localStorage.getItem("backgroundLight");

          this.$vuetube.navigationBar.setTheme(
            this.$vuetify.theme.currentTheme.background,
            !this.$vuetify.theme.dark
          );
          this.$vuetube.statusBar.setTheme(
            this.$vuetify.theme.currentTheme.background,
            this.$vuetify.theme.dark
          );

          // this.$vuetube.navigationBar.setTransparent();
          // this.$vuetube.statusBar.setTransparent();
          resolve();
        }, 0)
      );
    },
  },
};
</script>

<style>
.invert {
  filter: invert(1);
}
.iconsvgstuff {
  fill-rule: evenodd;
  clip-rule: evenodd;
  stroke-linejoin: round;
  stroke-miterlimit: 2;
}
.intro {
  opacity: 0;
  transform: scale(0.5);
  transition-property: opacity, transform;
  animation: bounce 0.33s 0.33s ease 1 forwards;
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

/* page transition */
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition-duration: 0.1s;
  transition-property: opacity, transform;
  /* overflow: hidden; */
}

.slide-up-enter,
.slide-down-leave-active {
  opacity: 0;
  transform: translateY(3rem);
}

.slide-up-leave-active,
.slide-down-enter {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
