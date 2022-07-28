<template>
  <div class="container-max-height d-flex flex-column justify-end">
    <!-- // TODO: outer radius -->
    <!-- // TODO: Dense Navbar -->
    <!-- // TODO: Disable Top Bar -->
    <!-- // TODO: Top and Bottom bar color selection -->
    <v-card
      flat
      class="mx-4 my-2 px-4 py-2 d-flex flex-row justify-between background"
      style="transition-duration: 0.3s; transition-property: border-radius"
      :class="
        roundTweak > 0 ? ($vuetify.theme.dark ? 'lighten-1' : 'darken-1') : ''
      "
      :style="{
        borderRadius: `${roundTweak / 2}rem`,
      }"
    >
      <h3
        class="my-auto background--text"
        :class="$vuetify.theme.dark ? 'text--lighten-3' : 'text--darken-3'"
      >
        {{ lang.fullscreen }}
      </h3>
      <v-spacer />
      <v-switch
        disabled
        class="mt-2"
        style="pointer-events: none"
        persistent-hint
        inset
      />
    </v-card>

    <v-divider v-if="!roundTweak" />

    <v-card
      flat
      class="mx-4 my-2 px-4 py-2 d-flex flex-row justify-between background"
      style="transition-duration: 0.3s; transition-property: border-radius"
      :class="
        roundTweak > 0 ? ($vuetify.theme.dark ? 'lighten-1' : 'darken-1') : ''
      "
      :style="{
        borderRadius: `${roundTweak / 2}rem`,
      }"
    >
      <h3
        class="my-auto background--text"
        :class="$vuetify.theme.dark ? 'text--lighten-3' : 'text--darken-3'"
      >
        {{ lang.navbarblur }}
      </h3>
      <v-spacer />
      <v-switch
        disabled
        class="mt-2"
        style="pointer-events: none"
        persistent-hint
        inset
      />
    </v-card>

    <v-divider v-if="!roundTweak" />

    <h3 class="ml-8 mt-8">{{ lang.roundedcorners }}</h3>

    <v-card
      flat
      class="mx-4 my-2 background"
      style="
        transition-duration: 0.3s;
        transition-property: border-radius;
        overflow: hidden;
      "
      :style="{
        borderRadius: `${roundTweak / 2}rem`,
      }"
    >
      <!-- margin: $store.state.tweaks.roundTweak > 0 ? '0 1rem' : '0', -->
      <v-card
        flat
        class="mb-1 px-4 py-2 d-flex flex-row justify-between background"
        :class="
          roundTweak > 0 ? ($vuetify.theme.dark ? 'lighten-1' : 'darken-1') : ''
        "
        :style="{
          borderRadius: `${roundTweak / 12}rem`,
        }"
        @click="
          (roundThumb = !roundThumb), $vuetube.haptics.hapticsImpactLight(1)
        "
      >
        <div
          class="my-auto background--text"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
        >
          {{ lang.roundthumbnails }}
        </div>
        <v-spacer />
        <v-switch
          v-model="roundThumb"
          style="pointer-events: none"
          persistent-hint
          class="mt-2"
          inset
        />
      </v-card>
      <v-card
        flat
        class="mb-1 px-4 py-2 d-flex flex-row justify-between background"
        :class="
          roundTweak > 0 ? ($vuetify.theme.dark ? 'lighten-1' : 'darken-1') : ''
        "
        :style="{
          borderRadius: `${roundTweak / 12}rem`,
        }"
        @click="
          (roundWatch = !roundWatch), $vuetube.haptics.hapticsImpactLight(1)
        "
      >
        <div
          class="my-auto background--text"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
        >
          {{ lang.roundwatchpagecomponents }}
        </div>
        <v-spacer />
        <v-switch
          v-model="roundWatch"
          style="pointer-events: none"
          persistent-hint
          class="mt-2"
          inset
        />
      </v-card>
      <v-slider
        v-model="roundTweak"
        class="pr-8 pl-4 pt-3 pb-0 background"
        :max="4"
        :label="lang.radius"
        step=".25"
        thumb-size="64"
        :class="
          roundTweak > 0 ? ($vuetify.theme.dark ? 'lighten-1' : 'darken-1') : ''
        "
        :style="{
          borderRadius: `${roundTweak / 12}rem`,
        }"
        @input="$vuetube.haptics.hapticsImpactLight(0)"
      >
        <template #thumb-label="{ value }">
          <div
            class="pa-4 background"
            :style="{ borderRadius: value * 3 + 'px !important' }"
          ></div>
        </template>
      </v-slider>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: {},
    };
  },
  computed: {
    roundTweak: {
      get() {
        return this.$store.state.tweaks.roundTweak;
      },
      set(value) {
        this.$store.commit("tweaks/setRoundTweak", value);
      },
    },
    roundThumb: {
      get() {
        return this.$store.state.tweaks.roundThumb;
      },
      set(value) {
        this.$store.commit("tweaks/setRoundThumb", value);
      },
    },
    roundWatch: {
      get() {
        return this.$store.state.tweaks.roundWatch;
      },
      set(value) {
        this.$store.commit("tweaks/setRoundWatch", value);
      },
    },
  },
  mounted() {
    this.lang = this.$lang("mods").tweaks;
  },
};
</script>
