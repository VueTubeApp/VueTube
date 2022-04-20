<template>
  <div class="d-flex flex-column justify-end" style="min-height: 100%">
    <v-card
      flat
      class="mb-4 background"
      style="
        transition-duration: 0.3s;
        transition-property: border-radius;
        overflow: hidden;
      "
      :style="{
        borderRadius: `${roundTweak / 2}rem`,
        margin: $store.state.tweaks.roundTweak > 0 ? '0 1rem' : '0',
      }"
    >
      <div
        v-for="item in list"
        :key="item"
        @click="list.pop(item)"
        class="pa-4 mb-1 background text-center rounded-sm"
        :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      >
        {{ item }}
      </div>
      <v-card-title
        v-ripple
        class="pa-4 background primary--text text--lighten-2 rounded-sm"
        :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
        @click="list.push('x')"
      >
        +++++++++++++++++++++++++++++
      </v-card-title>
    </v-card>
    <v-card
      flat
      class="px-6 background"
      style="transition-duration: 0.3s; transition-property: border-radius"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      :style="{
        borderRadius: `${roundTweak / 2}rem`,
        margin: $store.state.tweaks.roundTweak > 0 ? '0 1rem' : '0',
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
  data: () => ({
    list: ["x", "x"],
  }),
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
