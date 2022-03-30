<template>
  <div class="d-flex flex-column justify-end" style="min-height: 100%">
    <grid-video-renderer
      :video="themeExampleVideo"
      style="pointer-events: none"
      class="px-4"
    />

    <v-spacer />

    <!-- <v-color-picker
      v-model="$vuetify.theme.currentTheme.primary.base"
      style="min-width: 100%"
      class="px-8 mt-2 background"
      :swatches="$vuetify.theme.dark ? swatchesDark : swatchesLight"
      show-swatches
      hide-canvas
      hide-inputs
      @input="(value) => primarySwitch(value)"
    >
    </v-color-picker> -->
    <!-- <v-color-picker
      v-model="primaryColor"
      style="min-width: 100%"
      class="px-10 background"
      hide-mode-switch
      hide-sliders
      hide-canvas
      mode="hexa"
    >
    </v-color-picker> -->

    <div
      class="py-1 mt-4 background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
    />

    <h4 class="mx-8 mt-6 my-2">Background Color</h4>
    <v-radio-group
      v-model="$vuetify.theme.currentTheme.background"
      class="mt-0"
    >
      <!-- @change="theme(backgroundColor)" -->
      <div
        class="d-flex flex-row px-6 no-wrap"
        style="max-width: 100%; overflow-x: auto"
      >
        <div
          v-for="theme in $vuetify.theme.dark
            ? backgroundsDark
            : backgroundsLight"
          :key="theme.color"
          class="text-center"
        >
          <v-radio
            color="primary"
            active-class="px-6 border-primary"
            style="transition-duration: 0.3s"
            :style="{
              background: theme.color,
              border: '2px solid ' + theme.color,
            }"
            class="py-4 px-4 ma-2 rounded-lg"
            :value="theme.color"
          />
          {{ theme.name }}
        </div>
        <div class="text-center">
          <v-radio
            ref="experimentalBackground"
            color="primary"
            active-class="px-6 border-primary primary"
            style="transition-duration: 0.3s"
            :style="{
              background: $vuetify.theme.dark
                ? 'var(--v-primary-darken4) !important'
                : 'var(--v-primary-lighten4) !important',
              border: $vuetify.theme.dark
                ? '2px solid var(--v-primary-darken4)'
                : '2px solid var(--v-primary-lighten4)',
            }"
            class="py-4 px-4 ma-2 rounded-lg"
            :value="experimentalBackground"
          />
          Adaptive <br />
          <div
            class="background--text"
            :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
            style="font-size: 0.5rem"
          >
            (Experimental)
          </div>
        </div>
      </div>
    </v-radio-group>

    <!-- <div
      class="py-1 mt-4 background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
    /> -->

    <h4 class="mx-8 mt-6 mb-2">Accent Color</h4>

    <v-radio-group
      v-model="$vuetify.theme.currentTheme.primary"
      class="mt-0 mx-2"
    >
      <div
        class="d-flex flex-row px-6 no-wrap py-3 align-center"
        style="max-width: 100%; overflow-x: auto"
      >
        <v-radio
          v-for="color in $vuetify.theme.dark ? swatchesDark : swatchesLight"
          :key="color[0]"
          color="primary"
          :light="$vuetify.theme.dark"
          :dark="!$vuetify.theme.dark"
          active-class="border-primary"
          style="transition-duration: 0.3s"
          :style="{
            background: color[0],
            border: '2px solid ' + color[0],
          }"
          class="mr-2 my-auto rounded-xl"
          :value="color[0]"
        />
      </div>
    </v-radio-group>

    <v-card
      flat
      class="d-flex flex-row justify-between mx-8 mb-4 px-4 background rounded-lg"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
    >
      <div class="my-auto">
        <div>Dark Mode</div>
        <div
          class="background--text"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
          style="font-size: 0.75rem; margin-top: -0.25rem !important"
        >
          Bravo Six, Going Dark.
        </div>
      </div>
      <v-spacer />
      <v-switch v-model="$vuetify.theme.dark" persistent-hint inset />
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swatchesDark: [
        ["#7cd6af"],
        ["#fec89b"],
        ["#FF7777"],
        ["#77FF77"],
        ["#77FFFF"],
        ["#777FFF"],
        ["#FF77FF"],
      ],
      swatchesLight: [
        ["#ff4444"],
        ["#f88469"],
        ["#22aa22"],
        ["#4a9e90"],
        ["#3F51B5"],
        ["#777fff"],
      ],
      backgroundsDark: [
        { name: "Dark", color: "#181818" },
        { name: "Black", color: "#000000" },
      ],
      backgroundsLight: [
        { name: "Bright", color: "#ffffff" },
        { name: "Dim", color: "#eeeeee" },
      ],
      themeExampleVideo: {
        videoId: "3_Rxnb_E_TI",
        title: {
          runs: [
            {
              text: "This is a theme preview",
            },
          ],
        },
        publishedTimeText: {
          runs: [
            {
              text: "13 months ago",
            },
          ],
        },
        shortBylineText: {
          runs: [
            {
              text: "VueTube",
              navigationEndpoint: {
                clickTrackingParams: "CIUBEJQ1GAAiEwjQlsXmxOf2AhXDdisKHcBnCcc=",
                browseEndpoint: {
                  browseId: "UClvgyQvIplPQU8N73vPlFUA",
                  canonicalBaseUrl: "/c/Ashstudio7HD",
                },
              },
            },
          ],
        },
        channelThumbnail: {
          thumbnails: [
            {
              url: "https://imgs.search.brave.com/z7w4T33dzLGFn3u67ymQTyeWz_jvldkQ7MTQmPDF7s0/rs:fit:540:540:1/g:ce/aHR0cHM6Ly9zMTg2/NzAucGNkbi5jby93/cC1jb250ZW50L3Vw/bG9hZHMvY2F0LXR5/cGluZy5naWY.gif",
              width: 69,
              height: 69,
            },
          ],
        },
        shortViewCountText: {
          runs: [
            {
              text: "69M views",
            },
          ],
        },
      },
      experimentalBackground: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      let hex = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--v-primary-lighten4");
      // the menace above returns a hex string with A SPACE " " in front of it, that's why substring(1)
      this.experimentalBackground = hex.substring(1);
    });
  },
  methods: {
    saveTheme() {
      navigator.vibrate([10, 100, 5]);
    },
    primarySwitch(val) {
      this.$vuetify.theme.currentTheme.primary.base = val;
      let primary1 = this.$vuetube.hexToRgb(val);
      let primary2 = this.$vuetube.hexToRgb(val);
      for (const i in primary1) {
        localStorage.getItem("darkTheme") === "true"
          ? (primary1[i] -= 100)
          : (primary1[i] += 100);
        if (primary1[i] > 255) primary1[i] = 254;
        if (primary1[i] < 0) primary1[i] = 1;
      }
      for (const i in primary2) {
        localStorage.getItem("darkTheme") === "true"
          ? (primary2[i] -= 200)
          : (primary2[i] += 200);
        if (primary2[i] > 255) primary2[i] = 254;
        if (primary2[i] < 0) primary2[i] = 1;
      }
      primary1 = this.$vuetube.rgbToHex(primary1.r, primary1.g, primary1.b);
      primary2 = this.$vuetube.rgbToHex(primary2.r, primary2.g, primary2.b);
      this.$vuetify.theme.currentTheme.primary.lighten1 = primary1;
      this.$vuetify.theme.currentTheme.primary.lighten2 = primary2;
    },
    theme(bg) {
      console.log(bg);
      if (bg !== this.$vuetify.theme.currentTheme.primary.lighten2) {
        localStorage.setItem("darkTheme", bg !== "#ffffff");
        this.$vuetify.theme.dark = bg !== "#ffffff";
        bg !== "#ffffff"
          ? this.$vuetube.statusBar.setDark()
          : this.$vuetube.statusBar.setLight();
      }
      this.$vuetify.theme.currentTheme.background = bg;
      console.log(this.$vuetify.theme.currentTheme);
      this.$vuetube.statusBar.setBackground(bg);
      this.$vuetube.navigationBar.setColor(bg, this.$vuetify.theme.dark);
      // localStorage.setItem("isOled", false)
    },
  },
};
</script>

<style>
.v-color-picker__color {
  width: 2rem !important;
  height: 2rem !important;
  border-radius: 1rem !important;
}
.v-color-picker__controls {
  padding: 0 !important;
}
.v-color-picker__swatches > div {
  padding-right: 0 !important;
  justify-content: end !important;
}
.v-color-picker__color {
  margin-left: 0.5rem !important;
  margin-bottom: 0 !important;
  margin-right: 0 !important;
  margin-top: 0 !important;
}
.v-input--selection-controls__input {
  margin-right: 0 !important;
}
.bordered {
  border: 2px solid var(--v-background-base);
}
.border-primary {
  border: 2px solid var(--v-primary-base) !important;
}
</style>
