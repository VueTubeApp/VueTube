<template>
  <div class="py-1">
    <v-card class="pb-5">
      <v-card-title>Global Base Color</v-card-title>
      <v-row class="ml-3 mr-6">
        <section class="row">
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

    <v-card class="pb-5">
      <v-card-title>background Color</v-card-title>
      <v-card-text>
        <v-alert color="primary" dense outlined type="warning"
          >NOTE: This doesn't save after closing the app (yet)</v-alert
        >
        <v-color-picker
          v-model="backgroundColor"
          dot-size="5"
          hide-mode-switch
          mode="hexa"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundColor: "#ffffff",
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
          (this.$vuetify.theme.themes.dark.background = "#222"),
          (this.$vuetify.theme.themes.dark.background = "#333"),
          localStorage.setItem("isOled", false))
        : ((this.$vuetify.theme.themes.dark.background = "#000"),
          (this.$vuetify.theme.themes.dark.background = "#000"),
          (this.$vuetify.theme.themes.dark.background = "#000"),
          localStorage.setItem("isOled", true));
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

<style scoped>
.v-card {
  margin: 1em;
}

section {
  padding: 0 1em 1em 1em;
}
</style>
