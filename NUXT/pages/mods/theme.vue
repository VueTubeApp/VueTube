<template>
  <client-only>
    <div class="d-flex flex-column justify-end" style="min-height: 100%">
      <!-- ----------------------------------------------Background Colors------------------------ -->
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
              class="py-4 px-4 ma-2 rounded-lg"
              :value="
                $vuetify.theme.dark ? experimentalDark : experimentalLight
              "
            />
            Adaptive
          </div>
        </div>
      </v-radio-group>
      <!-- ----------------------------------------------Primary Colors------------------------ -->
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
          <v-dialog
            v-model="dialog"
            width="300"
            content-class="background rounded-lg"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                class="background"
                style="height: 1.75rem; width: 1.75rem"
                :class="$vuetify.theme.dark ? 'lighten-2' : 'darken-2'"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-color-picker
              v-model="$vuetify.theme.currentTheme.primary"
              style="min-width: 100%"
              class="background"
              hide-mode-switch
              dot-size="50"
              mode="hexa"
              flat
            />
          </v-dialog>
        </div>
      </v-radio-group>
      <!-- ----------------------------------------------Mode Switch------------------------ -->
      <v-card
        flat
        class="d-flex flex-row justify-between mx-8 mb-4 px-4 background rounded-lg"
        :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
        @click="
          ($vuetify.theme.dark = !$vuetify.theme.dark),
            $vuetube.haptics.hapticsImpactLight(1)
        "
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
        <v-switch
          v-model="$vuetify.theme.dark"
          style="pointer-events: none"
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
      experimentalLight: "",
      experimentalDark: "",
      dialog: false,
    };
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
    },
    "$vuetify.theme.currentTheme.primary"(value) {
      if (value != undefined) {
        this.$vuetify.theme.dark
          ? localStorage.setItem("primaryDark", value)
          : localStorage.setItem("primaryLight", value);
        let tempD = this.experimentalDark;
        let tempL = this.experimentalLight;
        this.adapt();
        if (this.$vuetify.theme.currentTheme.background === tempD)
          this.$vuetify.theme.currentTheme.background = this.experimentalDark;
        if (this.$vuetify.theme.currentTheme.background === tempL)
          this.$vuetify.theme.currentTheme.background = this.experimentalLight;
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
      this.experimentalDark = hexD.substring(1).toUpperCase();
      this.experimentalLight = hexL.substring(1).toUpperCase();
      setTimeout(() => {
        if (
          this.$vuetify.theme.currentTheme.background ==
          hexD.substring(1).toUpperCase()
        )
          this.$vuetify.theme.currentTheme.background = this.experimentalDark;
        if (
          this.$vuetify.theme.currentTheme.background ==
          hexL.substring(1).toUpperCase()
        )
          this.$vuetify.theme.currentTheme.background = this.experimentalLight;
      }, 0);
    },
  },
};
</script>

<style>
.border-primary {
  border: 2px solid var(--v-primary-base) !important;
}
.v-input--selection-controls__input {
  margin-right: 0 !important;
}
</style>
