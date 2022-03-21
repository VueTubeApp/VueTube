<template>
  <div class="py-1">
    <v-card class="px-8 pt-6 ma-4">
      <h3>Rounded Corners</h3>
      <!-- // TODO: add tweaks for other components -->
      <v-switch class="mt-6" disabled label="Reverse (disabled)" />
      <v-slider
        disabled
        class="mr-2"
        label="Outer (disabled)"
        :max="4"
        step="1"
        thumb-size="64"
      ></v-slider>
      <v-slider
        class="mr-2"
        label="Inner"
        v-model="roundTweak"
        :max="4"
        step="1"
        thumb-size="64"
      >
        <template v-slot:thumb-label="{ value }">
          <div
            class="pa-4 white text-red red-text red--text"
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
