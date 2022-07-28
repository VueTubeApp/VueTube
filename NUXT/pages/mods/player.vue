<template>
  <div class="container-max-height d-flex flex-column justify-end">
    <!-- // TODO: Pre-fetch -->
    <!-- // TODO: Pre-fetch buffering threshold -->
    <!-- // TODO: Quality -->
    <!-- // TODO: quality auto-adjustment settings -->
    <!-- // TODO: Data saver -->
    <!-- // TODO: Player UI -->
    <h3 class="ml-8 mt-8">Interactions (preview)</h3>
    <!-- v-model = thumbs ui -->
    <v-radio-group>
      <div
        class="d-flex flex-row px-6 no-wrap"
        style="max-width: 100%; overflow-x: auto"
      >
        <div class="text-center">
          <v-radio
            color="primary"
            active-class="px-6 border-primary primary"
            off-icon="mdi-thumb-up-outline"
            on-icon="mdi-thumb-up"
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
          >
            <template slot="label">
              <v-icon
                class="text--white"
                :class="
                  $vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'
                "
              >
                mdi-thumb-down
              </v-icon>
              <div class="ml-1" style="font-size: 0.6rem" v-text="'12,345'" />
            </template>
          </v-radio>
          New
        </div>
        <div class="text-center">
          <v-btn
            text
            fab
            class="vertical-button px-4 rounded-lg ma-2"
            elevation="0"
            style="
              width: 4.2rem !important;
              height: 3.75rem !important;
              text-transform: none !important;
              border: 2px solid var(--v-primary-base) !important;
            "
          >
            <v-icon v-text="'mdi-thumb-up-outline'" />
            <div class="mt-1" style="font-size: 0.6rem" v-text="'12,345'" />
          </v-btn>
          <br />
          Current
        </div>
      </div>
    </v-radio-group>

    <h3 class="ml-8 mt-8">Pre-Fetch</h3>

    <v-card
      flat
      class="mx-4 my-2 pa-4 pb-2 d-flex flex-row justify-between background"
      :class="
        $store.state.tweaks.roundTweak > 0
          ? $vuetify.theme.dark
            ? 'lighten-1'
            : 'darken-1'
          : ''
      "
      :style="{
        borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
      }"
    >
      <div class="my-auto">
        Pre-fetch video data before playback
        <!-- <b class="red--text">(can be data intensive it high quality presets)</b> -->
        <br />
        _______________
        <br />
        <span class="overline">Buffering threshold: 15%</span>
      </div>
      <v-spacer />
      <v-switch
        disabled
        class="mt-2"
        style="pointer-events: none"
        persistent-hint
        inset
      />
    </v-card>

    <v-divider v-if="!$store.state.tweaks.roundTweak" />

    <h3 class="ml-8 mt-8">
      <v-icon>mdi-speedometer</v-icon>
      Speed &middot; {{ speed }}x
    </h3>

    <v-card
      flat
      class="mx-4 my-2 background"
      style="overflow: hidden"
      :style="{
        borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
      }"
    >
      <v-card
        flat
        class="mb-1 pa-4 d-flex flex-row justify-between background"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? 'lighten-1'
              : 'darken-1'
            : ''
        "
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 12}rem`,
        }"
        @click="
          (speedAutosave = !speedAutosave),
            $vuetube.haptics.hapticsImpactLight(1)
        "
      >
        <div class="my-auto">
          <div>Autosave</div>
          <div
            class="background--text pr-4"
            :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
            style="font-size: 0.75rem"
          >
            When changing video speed through the player UI while watching a
            video, all future videos will be played at the selected speed.
          </div>
        </div>
        <v-spacer />
        <v-switch
          v-model="speedAutosave"
          style="pointer-events: none"
          class="mt-2"
          persistent-hint
          inset
        />
      </v-card>
      <!-- <speed
        class="mx-2"
        style="z-index: 77777"
        :current-speed="$store.state.player.speed"
        @speed="speed = $event"
      /> -->
      <span v-if="speed > 4">
        <v-icon>mdi-alert-decagram</v-icon> Might cause issues with buffering
        <br />
        enable <b>Pre-Fetch</b> to avoid
      </span>
      <v-slider
        v-model="speed"
        style="transition-duration: 0.3s; transition-property: all"
        class="pr-8 pl-8 pt-4 pb-0 background"
        :max="16"
        :label="speed.toFixed(2) + 'x'"
        :color="speed > 4 ? 'green' : ''"
        thumb-size="64"
        step=".25"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? 'lighten-1'
              : 'darken-1'
            : ''
        "
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 12}rem`,
          filter: `invert(${speed > 4 ? '1' : '0'})`,
        }"
        @input="$vuetube.haptics.hapticsImpactLight(0)"
      >
        <template #thumb-label="{ value }">
          <b class="background--text">{{ value.toFixed(2) }}</b>
        </template>
      </v-slider>
    </v-card>
    <marquee bgcolor="#ffdddd">
      <b style="text-shadow: 0 0 1rem white" class="red--text">
        (NOTHING WORKS, WIP, incomplete)
      </b>
    </marquee>
  </div>
</template>

<style>
.vertical-button span.v-btn__content {
  flex-direction: column;
  justify-content: space-around;
}
</style>

<script>
// import speed from "../../components/Player/speed.vue";

export default {
  components: {
    // speed,
  },
  computed: {
    speed: {
      get() {
        return this.$store.state.player.speed;
      },
      set(value) {
        console.warn(value);
        this.$store.commit("player/setSpeed", value);
      },
    },
    speedAutosave: {
      get() {
        return this.$store.state.player.speedAutosave;
      },
      set(value) {
        this.$store.commit("player/setSpeedAutosave", value);
      },
    },
    // preload: {
    //   get() {
    //     return this.$store.state.player.preload;
    //   },
    //   set(value) {
    //     this.$store.commit("player/setPreload", value);
    //   },
    // },
    // bufferThreshold: {
    //   get() {
    //     return this.$store.state.player.bufferThreshold;
    //   },
    //   set(value) {
    //     this.$store.commit("player/setBufferThreshold", value);
    //   },
    // },
    // quality: {
    //   get() {
    //     return this.$store.state.player.quality;
    //   },
    //   set(value) {
    //     this.$store.commit("player/setQuality", value);
    //   },
    // },
  },
};
</script>
