<template>
  <div class="d-flex flex-column justify-end" style="min-height: 100%">
    <h4 class="mx-10">Layout</h4>
    <v-card flat class="px-4 mx-4 mb-4 mt-2 background lighten-1 rounded-xl">
      <v-switch disabled label="Dense Navbars" />
      <v-switch class="mt-0" disabled label="Disable Top Bar" />
      <!-- <v-switch class="mt-6" disabled label="Reverse (disabled)" /> -->
    </v-card>
    <h4 class="mx-10">Rounded Corners</h4>
    <v-card flat class="px-4 mx-4 mb-4 mt-2 background lighten-1 rounded-xl">
      <v-switch disabled label="Reverse (disabled)" />
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
        @input="vibrate()"
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
  methods: {
    vibrate() {
      navigator.vibrate(10);
    },
  },
};
</script>
