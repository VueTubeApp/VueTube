<template>
  <div class="py-1">
    <v-card class="px-8 py-6 ma-4">
      <h3>Layout</h3>
      <v-switch class="mt-6" disabled label="Dense Navbars" />
      <v-switch disabled label="Disable Top Bar" />
      <!-- <v-switch class="mt-6" disabled label="Reverse (disabled)" /> -->
    </v-card>
    <v-card class="px-8 pt-6 ma-4">
      <h3>Rounded Corners</h3>
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
        v-model="roundTweak"
        class="mr-2"
        label="Inner"
        :max="4"
        step="1"
        thumb-size="64"
      >
        <template #thumb-label="{ value }">
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
