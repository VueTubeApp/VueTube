<template>
  <client-only>
    <!-- !IMPORTANT: don't let autoformatter format this style to multiline or else it breaks ¯\_(ツ)_/¯ -->
    <div
      class="d-flex flex-column justify-end"
      style="
        min-height: calc(100vh - 8rem - env(safe-area-inset-top) - env(safe-area-inset-bottom)) !important;
      "
    >
      <!-- ----Background Colors---- -->
      <v-radio-group v-model="$vuetify.theme.currentTheme.background">
        <div
          class="d-flex flex-row px-6 no-wrap"
          style="max-width: 100%; overflow-x: auto"
        >
          <div
            v-for="background in $vuetify.theme.dark
              ? backgroundsDark
              : backgroundsLight"
            :key="background.color"
            class="text-center"
          >
            <v-radio
              color="primary"
              active-class="px-6 border-primary"
              style="transition-duration: 0.3s"
              :style="{
                background: background.color,
                border: '2px solid ' + background.color,
              }"
              class="py-4 px-4 ma-2 rounded-lg"
              :value="background.color"
            />
            {{ background.name }}
          </div>
          <div class="text-center">
            <v-radio
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
              class="pa-4 ma-2 rounded-lg"
              :value="$vuetify.theme.dark ? adaptiveDark : adaptiveLight"
            />
            {{ lang.adaptive }}
          </div>
          <div class="text-center">
            <!-- Custom Background -->
            <v-btn
              icon
              class="ma-2 rounded-lg background border-primary"
              style="height: 3.75rem; width: 3.75rem"
              :class="$vuetify.theme.dark ? 'lighten-2' : 'darken-2'"
              @click="(pickerState = true), (pickerMode = 'background')"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <br />
            Custom
          </div>
        </div>
      </v-radio-group>
      <!-- ----Primary Colors---- -->
      <v-radio-group v-model="$vuetify.theme.currentTheme.primary" class="mx-2">
        <div
          class="d-flex flex-row px-6 py-2 no-wrap align-center"
          style="max-width: 100%; overflow-x: auto; margin-top: -1.5rem"
        >
          <v-radio
            v-for="color in $vuetify.theme.dark ? primaryDark : primaryLight"
            :key="color"
            color="background"
            on-icon="mdi-check"
            :light="$vuetify.theme.dark"
            :dark="!$vuetify.theme.dark"
            active-class="border-primary"
            style="transition-duration: 0.3s"
            :style="{
              background: color,
              border: '2px solid ' + color,
            }"
            class="mr-2 my-auto rounded-xl"
            :value="color"
          />
          <!-- Custom Primary -->
          <v-btn
            icon
            class="background"
            style="height: 1.75rem; width: 1.75rem"
            :class="$vuetify.theme.dark ? 'lighten-2' : 'darken-2'"
            v-bind="attrs"
            v-on="on"
            @click="(pickerState = true), (pickerMode = 'primary')"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-radio-group>
      <!-- ----Color Picker---- -->
      <v-dialog
        v-model="pickerState"
        width="300"
        content-class="background rounded-lg"
      >
        <v-color-picker
          v-model="$vuetify.theme.currentTheme[pickerMode]"
          style="min-width: 100%"
          class="background"
          hide-mode-switch
          dot-size="50"
          mode="hexa"
          flat
        />
      </v-dialog>
      <!-- ----Mode Switch---- -->
      <v-divider v-if="!$store.state.tweaks.roundTweak" />
      <v-card
        flat
        class="d-flex flex-row justify-between mx-8 mb-8 px-4 py-3 background"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? 'lighten-1'
              : 'darken-1'
            : ''
        "
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
          padding: !$store.state.tweaks.roundTweak ? '2rem !important' : '',
          margin: !$store.state.tweaks.roundTweak ? '0 !important' : '',
        }"
        @click="
          ($vuetify.theme.dark = !$vuetify.theme.dark),
            $vuetube.haptics.hapticsImpactLight(1)
        "
      >
        <div class="my-auto">
          <div>{{ lang.darkmode }}</div>
          <div
            class="background--text"
            :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
            style="font-size: 0.75rem; margin-top: -0.25rem !important"
          >
            {{ lang.darkmodetagline }}
          </div>
        </div>
        <v-spacer />
        <v-switch
          v-model="$vuetify.theme.dark"
          style="pointer-events: none"
          class="mt-2"
          persistent-hint
          inset
        />
      </v-card>
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      primaryLight: ["#E57373", "#8b5f37", "#016a49", "#34495E"],
      primaryDark: [
        "#B71C1C",
        "#FFBBFF",
        "#AAAFFF",
        "#AAFFFF",
        "#7CD6AF",
        "#FEC89B",
      ],
      backgroundsDark: [
        { name: "Dark", color: "#181818" },
        { name: "Black", color: "#000000" },
      ],
      backgroundsLight: [{ name: "Normal", color: "#ffffff" }],
      adaptiveLight: "",
      adaptiveDark: "",
      pickerState: false,
      pickerMode: "bg",
      lang: {}
    };
  },
  mounted() {
    this.lang = this.$lang("mods").theme;
    this.backgroundsLight[0].name = this.lang.normal;
    this.backgroundsDark[0].name = this.lang.dark;
    this.backgroundsDark[1].name = this.lang.black;
  },
  watch: {
    // also triggers background and primary watcher, unless primary colors match
    "$vuetify.theme.dark"(value) {
      localStorage.setItem("darkTheme", value);
    },
    "$vuetify.theme.currentTheme.background"(value) {
      this.$vuetify.theme.dark
        ? localStorage.setItem("backgroundDark", value)
        : localStorage.setItem("backgroundLight", value);
      this.$vuetube.statusBar.setTheme(value, this.$vuetify.theme.dark);
      this.$vuetube.navigationBar.setTheme(value, !this.$vuetify.theme.dark);
      // WIP: luma-based light-dark auto-switching
      // let bg = this.$vuetify.theme.currentTheme.background;
      // console.log(this.$vuetube.hexToRgb(bg));
      // let luma =
      //   0.2126 * this.$vuetube.hexToRgb(bg).r +
      //   0.7152 * this.$vuetube.hexToRgb(bg).g +
      //   0.0722 * this.$vuetube.hexToRgb(bg).b;
      // if (luma < 40) {
      //   this.$vuetify.theme.dark = true;
      //   this.vuetify.theme.currentTheme.background = bg;
      // }
    },
    "$vuetify.theme.currentTheme.primary"(value) {
      if (value != undefined) {
        this.$vuetify.theme.dark
          ? localStorage.setItem("primaryDark", value)
          : localStorage.setItem("primaryLight", value);
        let tempD = this.adaptiveDark;
        let tempL = this.adaptiveLight;
        this.adapt();
        if (this.$vuetify.theme.currentTheme.background === tempD)
          this.$vuetify.theme.currentTheme.background = this.adaptiveDark;
        if (this.$vuetify.theme.currentTheme.background === tempL)
          this.$vuetify.theme.currentTheme.background = this.adaptiveLight;
      }
    },
  },
  beforeMount() {
    this.adapt();
  },
  methods: {
    adapt() {
      let hexD = getComputedStyle(document.documentElement).getPropertyValue(
        "--v-primary-darken4"
      );
      let hexL = getComputedStyle(document.documentElement).getPropertyValue(
        "--v-primary-lighten4"
      );
      // the menace above returns a hex string with A SPACE " " in front of it, that's why substring(1)
      // the SPACE " " is stored as part of the CSS variable itself to be used for chaining
      this.adaptiveDark = hexD.substring(1).toUpperCase();
      this.adaptiveLight = hexL.substring(1).toUpperCase();
      setTimeout(() => {
        if (
          this.$vuetify.theme.currentTheme.background ==
          hexD.substring(1).toUpperCase()
        )
          this.$vuetify.theme.currentTheme.background = this.adaptiveDark;
        if (
          this.$vuetify.theme.currentTheme.background ==
          hexL.substring(1).toUpperCase()
        )
          this.$vuetify.theme.currentTheme.background = this.adaptiveLight;
      }, 0);
    },
  },
};
</script>
