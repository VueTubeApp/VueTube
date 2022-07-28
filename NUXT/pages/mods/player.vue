<template>
  <div class="container-max-height d-flex flex-column justify-end">
    <!-- // TODO: Pre-fetch -->
    <!-- // TODO: Pre-fetch buffering threshold -->
    <!-- // TODO: Quality -->
    <!-- // TODO: quality auto-adjustment settings -->
    <!-- // TODO: Data saver -->
    <!-- // TODO: Player UI -->
    <!-- <v-divider v-if="!$store.state.tweaks.roundTweak" />

    <h3 class="ml-8 mt-8">
      <v-icon class="mb-1 mr-1">mdi-play-speed</v-icon>
      Preload
    </h3>

    <v-card
      flat
      class="mx-4 my-2 pa-4 d-flex flex-row justify-between background"
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
      @click="(preload = !preload), $vuetube.haptics.hapticsImpactLight(1)"
    >
      <div>
        Pre-buffer video data before playback to avoid buffering pauses.
        <b class="red--text">(can be data intensive it high quality presets)</b>
        <br />
        <br />
        <hr class="primary mr-6" style="opacity: 0.25" />
        <span class="overline">Buffering threshold: 15%</span>
      </div>
      <v-spacer />
      <v-switch
        v-model="preload"
        style="pointer-events: none"
        class="mt-0"
        inset
      />
    </v-card> -->

    <v-divider v-if="!$store.state.tweaks.roundTweak" />

    <h3 class="ml-8 mt-8">
      <v-icon class="mb-1 mr-1">mdi-speedometer</v-icon>
      Speed <b class="ml-1">&middot;</b> {{ speed }}x
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
        <div>
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
          class="mt-0"
          inset
        />
      </v-card>
      <v-card flat class="d-flex flex-row justify-between background">
        <speed
          class="background mr-1 px-4 d-flex justify-center align-center"
          style="
            font-size: 1.5rem !important;
            font-weight: bold !important;
            color: black !important;
            background: red;
            text-shadow: 0 0 2rem green;
          "
          :current-speed="speed"
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
          @speed="speed = $event"
        />
        <v-slider
          v-model="speed"
          step=".25"
          thumb-size="64"
          class="pa-0 pt-5 pl-6 pb-2 ma-0 background"
          style="transition-duration: 0.3s; transition-property: all"
          :rules="[(s) => s <= 4 || 'Might cause issues with buffering.']"
          :min="0.25"
          :max="16"
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
          @input="$vuetube.haptics.hapticsImpactLight(0)"
        >
          <template #thumb-label="{ value }">
            <b class="background--text" style="font-size: 1.15rem">
              {{ value.toFixed(2) }}x
            </b>
          </template>
        </v-slider>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import speed from "../../components/Player/speed.vue";

export default {
  components: {
    speed,
  },
  computed: {
    speed: {
      get() {
        return this.$store.state.player.speed;
      },
      set(value) {
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
    preload: {
      get() {
        return this.$store.state.player.preload;
      },
      set(value) {
        this.$store.commit("player/setPreload", value);
      },
    },
  },
};
</script>

<style>
.vertical-button span.v-btn__content {
  flex-direction: column;
  justify-content: space-around;
}
</style>
