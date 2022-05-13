<template>
  <!-- !IMPORTANT: don't let autoformatter format this style to multiline or else it breaks ¯\_(ツ)_/¯ -->
  <div
    class="d-flex flex-column justify-end"
    style="min-height: calc(100vh - 8rem - env(safe-area-inset-top) - env(safe-area-inset-bottom)) !important"
  >
    <!-- TODO: outer radius -->
    <!-- TODO: Dense Navbar -->
    <!-- TODO: Disable Top Bar -->
    <!-- TODO: Top and Bottom bar color selection -->
    <v-divider v-if="roundTweak < 1" />
    <v-card
      flat
      class="ma-4 px-6 background"
      style="transition-duration: 0.3s; transition-property: border-radius"
      :class="
        roundTweak > 0 ? ($vuetify.theme.dark ? 'lighten-1' : 'darken-1') : ''
      "
      :style="{
        borderRadius: `${roundTweak / 2}rem`,
      }"
    >
      <h3 class="mt-5">Rounded Corners</h3>
      <v-slider
        v-model="roundTweak"
        class="mr-2 mt-5"
        :max="4"
        step="1"
        thumb-size="64"
        @input="$vuetube.haptics.hapticsImpactLight(0)"
      >
        <template #thumb-label="{ value }">
          <div
            class="pa-4 background text-red red-text red--text"
            :style="{ borderRadius: value * 3 + 'px !important' }"
          ></div>
        </template>
      </v-slider>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    roundTweak: {
      get() {
        return this.$store.state.tweaks.roundTweak;
      },
      set(value) {
        this.$store.commit("tweaks/setRoundTweak", value);
      },
    },
  },
};
</script>
