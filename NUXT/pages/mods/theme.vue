<template>
  <div class="py-1">
    <v-card flat class="py-5 ma-4 background lighten-1 rounded-xl">
      <h3 class="mx-6 mb-2">Background Color</h3>
      <v-row class="ml-3 mr-6">
        <section class="row px-4 pb-8 pt-4">
          <v-switch
            v-model="$vuetify.theme.dark"
            label="Dark Theme"
            hint="Bravo Six, Going Dark."
            persistent-hint
            inset
            @click="saveTheme($vuetify.theme.dark)"
          />
        </section>
        <v-btn
          v-if="$vuetify.theme.dark"
          text
          tile
          class="white--text black"
          @click="amoled"
        >
          {{
            $vuetify.theme.themes.dark.background === "#000" ? "LCD" : "OLED"
          }}
          <v-icon
            :size="
              $vuetify.theme.themes.dark.background === '#000'
                ? '.5rem'
                : '.9rem'
            "
            class="ml-2"
            >mdi-brightness-2</v-icon
          >
        </v-btn>
      </v-row>
    </v-card>
    <h3 class="mx-10 mb-2">Primary Picker</h3>
    <v-color-picker
      class="mx-4 background lighten-1 rounded-xl"
      v-model="backgroundColor"
      :swatches="swatches"
      width="100%"
      show-swatches
      hide-canvas
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundColor: "#ffffff",
      swatches: [
        ["#FF7777"],
        ["#FFF777"],
        ["#77FF77"],
        ["#77FFFF"],
        ["#777FFF"],
        ["#FF77FF"],
      ],
    };
  },

  watch: {
    backgroundColor: function (val) {
      this.$vuetify.theme.currentTheme.primary.base = val;
      let primaryAlt = this.$vuetube.hexToRgb(val);

      let rgbEdit = 130; //Light Mode
      if (localStorage.getItem("darkTheme") === "true") rgbEdit = -80; //Dark Mode

      for (const i in primaryAlt) {
        primaryAlt[i] = primaryAlt[i] + rgbEdit; //Amount To Lighten By
        if (primaryAlt[i] > 255) primaryAlt[i] = 255;
        if (primaryAlt[i] < 0) primaryAlt[i] = 0;
      }

      primaryAlt = this.$vuetube.rgbToHex(
        primaryAlt.r,
        primaryAlt.g,
        primaryAlt.b
      );

      this.$vuetify.theme.currentTheme.primary.lighten2 = primaryAlt;
    },
  },

  mounted() {
    this.backgroundColor = this.$vuetify.theme.themes.dark.primary.base;
  },

  methods: {
    amoled() {
      this.$vuetify.theme.themes.dark.background === "#000"
        ? ((this.$vuetify.theme.themes.dark.background = "#222"),
          localStorage.setItem("isOled", false))
        : ((this.$vuetify.theme.themes.dark.background = "#000"),
          localStorage.setItem("isOled", true));

      console.log(this.$vuetify.theme.themes.dark);
    },
    saveTheme(isDark) {
      this.$vuetube.statusBar.setBackground(
        this.$vuetify.theme.currentTheme.background
      );
      localStorage.setItem("darkTheme", isDark);
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
</style>
