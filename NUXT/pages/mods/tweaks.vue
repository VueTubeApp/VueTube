<template>
  <div class="d-flex flex-column justify-end" style="min-height: 100%">
    <v-card
      flat
      class="px-6 ma-4 mt-2 background"
      style="transition-duration: 0.3s; transition-property: border-radius"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      :style="{
        borderRadius: `${roundTweak / 2}rem`,
      }"
    >
      <h3 class="mt-5">Rounded Corners</h3>
      <div
        class="background--text"
        :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
      >
        applies to only a few elements for now
      </div>
      <!-- TODO: outer radius -->
      <!-- TODO: Dense Navbar -->
      <!-- TODO: Disable Top Bar -->
      <!-- TODO: Top and Bottom bar color selection -->
      <v-slider
        v-model="roundTweak"
        class="mr-2 mt-5"
        label="Inner"
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
