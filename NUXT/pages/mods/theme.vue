<template>
  <div class="d-flex flex-column justify-end" style="min-height: 100%">
    <!-- TODO: replace with a component with dummy video object passed as prop -->
    <grid-video-renderer
      :video="{
        videoId: '3_Rxnb_E_TI',
        title: {
          runs: [
            {
              text: 'This is a theme preview',
            },
          ],
        },
        publishedTimeText: {
          runs: [
            {
              text: '13 months ago',
            },
          ],
        },
        shortBylineText: {
          runs: [
            {
              text: 'VueTube',
              navigationEndpoint: {
                clickTrackingParams: 'CIUBEJQ1GAAiEwjQlsXmxOf2AhXDdisKHcBnCcc=',
                browseEndpoint: {
                  browseId: 'UClvgyQvIplPQU8N73vPlFUA',
                  canonicalBaseUrl: '/c/Ashstudio7HD',
                },
              },
            },
          ],
        },
        channelThumbnail: {
          thumbnails: [
            {
              url: 'https://imgs.search.brave.com/z7w4T33dzLGFn3u67ymQTyeWz_jvldkQ7MTQmPDF7s0/rs:fit:540:540:1/g:ce/aHR0cHM6Ly9zMTg2/NzAucGNkbi5jby93/cC1jb250ZW50L3Vw/bG9hZHMvY2F0LXR5/cGluZy5naWY.gif',
              width: 69,
              height: 69,
            },
          ],
        },
        shortViewCountText: {
          runs: [
            {
              text: '69M views',
            },
          ],
        },
      }"
      style="pointer-events: none"
      class="px-4"
    />

    <v-spacer></v-spacer>

    <h4 class="mx-8 my-2">Background Color</h4>
    <v-radio-group
      v-model="backgroundColor"
      class="mt-0"
      @change="theme(backgroundColor)"
    >
      <div
        class="d-flex flex-row px-6 no-wrap"
        style="max-width: 100%; overflow-x: auto"
      >
        <div class="text-center">
          <!-- on-icon="mdi-brightness-1" -->
          <v-radio
            light
            color="primary"
            active-class="pl-6 pr-4 border-primary"
            style="
              transition-duration: 0.3s;
              background: white;
              border: 2px solid white;
            "
            class="py-4 pl-4 pr-2 ma-2 rounded-lg"
            value="#ffffff"
          />
          Day
        </div>
        <div class="text-center">
          <!-- on-icon="mdi-brightness-2" -->
          <v-radio
            dark
            color="primary"
            active-class="pl-6 pr-4 border-primary"
            style="
              transition-duration: 0.3s;
              background: #181818;
              border: 2px solid #181818;
            "
            class="py-4 pl-4 pr-2 ma-2 rounded-lg"
            value="#181818"
          />
          Dark
        </div>
        <div class="text-center">
          <!-- on-icon="mdi-brightness-3" -->
          <v-radio
            dark
            color="primary"
            active-class="pl-6 pr-4 border-primary"
            style="
              transition-duration: 0.3s;
              background: black;
              border: 2px solid black;
            "
            class="py-4 pl-4 pr-2 ma-2 rounded-lg"
            value="#000000"
          />
          Night
        </div>
        <div class="text-center">
          <!-- on-icon="mdi-brightness-3" -->
          <!-- off-icon="mdi-view-grid-plus" -->
          <v-radio
            dark
            color="primary"
            active-class="pl-6 pr-4 border-primary primary"
            style="
              transition-duration: 0.3s;
              background: var(--v-primary-lighten2) !important;
              border: 2px solid var(--v-primary-lighten2);
            "
            class="py-4 pl-4 pr-2 ma-2 rounded-lg"
            :value="$vuetify.theme.currentTheme.primary.lighten2"
          />
          Custom <br />
          <div class="grey--text" style="font-size: 0.5rem">(Experimental)</div>
        </div>
      </div>
    </v-radio-group>
    <!-- <v-switch
      v-model="$vuetify.theme.dark"
      class="mx-10 mt-0"
      label="Dark Theme"
      hint="Bravo Six, Going Dark."
      persistent-hint
      inset
      @click="saveTheme($vuetify.theme.dark)"
    /> -->

    <h4 class="mx-8 mt-6 mb-2">Accent Color</h4>
    <v-color-picker
      v-model="primaryColor"
      style="min-width: 100%"
      class="px-8 mt-2 background"
      :swatches="$vuetify.theme.dark ? swatchesDark : swatchesLight"
      show-swatches
      hide-canvas
      hide-inputs
    >
    </v-color-picker>
    <v-color-picker
      v-model="primaryColor"
      style="min-width: 100%"
      class="px-10 background"
      hide-mode-switch
      hide-sliders
      hide-canvas
      mode="hexa"
    >
    </v-color-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundColor: this.$vuetify.theme.currentTheme.background.base,
      primaryColor: this.$vuetify.theme.currentTheme.primary.base,
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
        ["#FFC107"],
        ["#22aa22"],
        ["#4a9e90"],
        ["#3F51B5"],
        ["#777fff"],
      ],
    };
  },

  watch: {
    primaryColor: function (val) {
      this.$vuetify.theme.currentTheme.primary.base = val;
      let primary1 = this.$vuetube.hexToRgb(val);
      let primary2 = this.$vuetube.hexToRgb(val);

      for (const i in primary1) {
        localStorage.getItem("darkTheme") === "true"
          ? (primary1[i] -= 100)
          : (primary1[i] += 100);
        if (primary1[i] > 255) primary1[i] = 255;
        if (primary1[i] < 0) primary1[i] = 0;
      }
      for (const i in primary2) {
        localStorage.getItem("darkTheme") === "true"
          ? (primary2[i] -= 200)
          : (primary2[i] += 200);
        if (primary2[i] > 255) primary2[i] = 255;
        if (primary2[i] < 0) primary2[i] = 0;
      }

      primary1 = this.$vuetube.rgbToHex(primary1.r, primary1.g, primary1.b);
      primary2 = this.$vuetube.rgbToHex(primary2.r, primary2.g, primary2.b);

      this.$vuetify.theme.currentTheme.primary.lighten1 = primary1;
      this.$vuetify.theme.currentTheme.primary.lighten2 = primary2;
    },
  },

  methods: {
    theme(bg) {
      console.log(bg);
      if (bg !== this.$vuetify.theme.currentTheme.primary.lighten2) {
        localStorage.setItem("darkTheme", bg !== "#ffffff");
        this.$vuetify.theme.dark = bg !== "#ffffff";
      }
      this.$vuetify.theme.currentTheme.background = bg;
      // localStorage.setItem("isOled", false)
      // this.$vuetube.statusBar.setBackground(bg);
      this.$vuetube.statusBar.setTransparent();
      // this.$vuetube.statusBar.setDark();
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
.bordered {
  border: 2px solid var(--v-background-base);
}
.border-primary {
  border: 2px solid var(--v-primary-base) !important;
}
</style>
