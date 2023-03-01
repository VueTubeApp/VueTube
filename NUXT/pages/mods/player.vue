<template>
  <div class="container-max-height d-flex flex-column justify-end">
    <!-- // TODO: Pre-fetch -->
    <!-- // TODO: Pre-fetch buffering threshold -->
    <!-- // TODO: Quality -->
    <!-- // TODO: quality auto-adjustment settings -->
    <!-- // TODO: Data saver -->
    <!-- // TODO: Player UI -->

    <v-divider v-if="!$store.state.tweaks.roundTweak" />

    <h3 class="ml-8 mt-8">
      <v-icon class="mb-1 mr-1">mdi-play-speed</v-icon>
      Preload (UNSTABLE)
    </h3>

    <v-card
      flat
      class="mx-4 mt-2 mb-8 background"
      :style="{
        border: preload
          ? `2.1px solid var(--v-primary-base) !important`
          : '2.1px solid var(--v-background-base)',
        borderRadius: `${$store.state.tweaks.roundTweak / 1.9}rem`,
      }"
    >
      <v-card
        flat
        class="pa-4 d-flex flex-row background"
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
        <div class="pr-4">
          <div style="font-size: 0.75rem">
            Pre-buffer video data before playback to avoid buffering pauses.
            <b class="primary--text">
              (can be data intensive at high quality presets)
            </b>
          </div>
          <div
            :class="preload ? 'primary' : 'background'"
            class="my-3 mr-6 rounded-right"
            style="width: 100%; height: 2px; margin-left: -1.1rem"
          />
          <div>Buffering Threshold &middot; {{ preloadUpTo }}%</div>
          <div
            class="background--text"
            :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
            style="font-size: 0.75rem"
          >
            The video will start playing after this much of the video is loaded.
            <b class="red--text">(doesn't work yet)</b>
          </div>
        </div>
        <v-switch
          v-model="preload"
          style="pointer-events: none"
          class="mt-0"
          inset
        />
      </v-card>
      <v-slider
        v-show="preload"
        v-model="preloadUpTo"
        :min="1"
        :max="100"
        thumb-label
        persistent-hint
        height="20"
        :hint="preloadUpTo <= 10 || 'This can take a very long time.'"
        class="pt-4 px-0 pb-1"
        track-color="background"
        thumb-color="primary background--text"
        style="z-index: 69420; position: absolute; bottom: -1.82rem"
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 4}rem`,
          width: `calc(100% - 2rem - ${$store.state.tweaks.roundTweak}rem)`,
          left: `${$store.state.tweaks.roundTweak / 2 + 1}rem`,
        }"
        @input="$vuetube.haptics.hapticsImpactLight(0)"
      >
      </v-slider>
    </v-card>

    <v-divider v-if="!$store.state.tweaks.roundTweak && !preload" />

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
        class="mb-1 pa-4 d-flex flex-row background"
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
      <v-card flat class="d-flex flex-row background">
        <speed
          class="background mr-1 px-4 d-flex justify-center align-center"
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

    <v-divider v-if="!$store.state.tweaks.roundTweak" />

    <h3 class="ml-8 mt-8">
      <v-icon class="mb-1 mr-1">mdi-play-network-outline</v-icon>
      Quality <b class="ml-1">&middot;</b> 1080p
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
        class="pa-4 d-flex flex-row justify-space-between background"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? 'lighten-1'
              : 'darken-1'
            : ''
        "
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 8}rem`,
        }"
      >
        <div>
          <div>
            <v-icon class="mb-1 mr-1" v-text="'mdi-video-outline'" />Video Codec
          </div>
          <div
            class="background--text pr-4"
            :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
            style="font-size: 0.75rem"
          >
            Just pick VP9
          </div>
        </div>
        <div
          class="background d-flex flex-row justify-end rounded-lg"
          style="max-width: content-width; overflow: hidden"
          :style="{
            borderRadius: `${$store.state.tweaks.roundTweak / 3}rem`,
          }"
          slider-size="0"
        >
          <v-tab active-class="primary darken-4">AVC</v-tab>
          <v-tab active-class="primary darken-4">VP9</v-tab>
        </div>
      </v-card>
      <marquee class="background--text mt-2">
        <b class="primary pa-2 rounded-xl">
          still in progress, not functional yet.
        </b>
      </marquee>
      <v-card
        flat
        class="pa-4 d-flex flex-row justify-space-between background"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? 'lighten-1'
              : 'darken-1'
            : ''
        "
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 8}rem`,
        }"
      >
        <div
          class="background d-flex flex-row justify-end rounded-lg"
          style="max-width: content-width; overflow: hidden"
          :style="{
            borderRadius: `${$store.state.tweaks.roundTweak / 3}rem`,
          }"
          slider-size="0"
        >
          <v-tab active-class="primary darken-4">OGG OPUS</v-tab>
          <v-tab active-class="primary darken-4">MP4 MP4a</v-tab>
        </div>
        <div class="d-flex flex-column align-end">
          <div>
            <v-icon class="mb-1 mr-1" v-text="'mdi-music-note'" />Audio Codec
          </div>
          <div
            class="background--text"
            :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
            style="font-size: 0.75rem"
          >
            OGG is better
          </div>
        </div>
      </v-card>
    </v-card>

    <v-divider v-if="!$store.state.tweaks.roundTweak" />

    <h3 class="ml-8 mt-8">
      <v-icon class="mb-1 mr-1">mdi-cog-play</v-icon>
      Other
    </h3>

    <v-card
      flat
      class="mx-4 mt-2 mb-6 background d-flex flex-row"
      style="overflow: hidden"
      :style="{
        borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
      }"
    >
      <v-card
        v-for="(toggl, i) in toggles"
        :key="i"
        flat
        class="mr-1 px-4 py-6 d-flex flex-column align-center background"
        style="width: calc(100% / 4) !important"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? 'lighten-1'
              : 'darken-1'
            : 'background'
        "
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 12}rem`,
        }"
      >
        <v-icon
          class="background--text"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
          >{{ toggl.icon }}</v-icon
        >
        <span
          class="background--text mt-1"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
          >{{ toggl.name }}</span
        >
      </v-card>
      <v-card
        flat
        class="px-4 py-6 d-flex flex-column align-center"
        style="width: calc(100% / 4) !important"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? loop
                ? 'primary darken-4'
                : 'background lighten-1'
              : loop
              ? 'primary lighten-4'
              : 'background darken-1'
            : 'background'
        "
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 12}rem`,
        }"
        @click="loop = !loop"
      >
        <v-icon
          style="transition: transform 0.5s"
          :style="{
            transform: loop ? 'rotate(180deg)' : '',
          }"
        >
          {{ loop ? "mdi-sync-circle" : "mdi-sync" }}
        </v-icon>
        <span class="mt-1">Loop</span>
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
  data: () => ({
    toggles: [
      {
        value: "captions",
        name: "Captions",
        icon: "mdi-closed-caption-outline",
      },
      {
        value: "autoskip",
        name: "Autoskip",
        icon: "mdi-skip-next-outline",
      },
      {
        value: "mute",
        name: "Mute",
        icon: "mdi-volume-off",
      },
    ],
  }),
  computed: {
    getthis(name) {
      return this[name] || false;
    },
    loop: {
      get() {
        return this.$store.state.player.loop;
      },
      set(value) {
        this.$store.commit("player/setLoop", value);
      },
    },
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
    preloadUpTo: {
      get() {
        return this.$store.state.player.preloadUpTo;
      },
      set(value) {
        this.$store.commit("player/setPreloadUpTo", value);
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
