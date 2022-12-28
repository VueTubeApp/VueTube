<template>
  <div class="container-max-height d-flex flex-column justify-end">
    <!-- // TODO: outer radius -->
    <!-- // TODO: Dense Navbar -->
    <!-- // TODO: Disable Top Bar -->
    <!-- // TODO: Top and Bottom bar color selection -->
    <!-- <v-card
      flat
      class="mx-4 my-2 px-4 py-2 d-flex flex-row background"
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
    </v-card> -->

    <!-- <v-divider v-if="!roundTweak" /> -->

    <!-- <v-card
      flat
      class="mx-4 my-2 px-4 py-2 d-flex flex-row background"
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
    </v-card> -->

    <v-divider v-if="!roundTweak" />

    <h3 class="ml-8 mt-8">{{ lang.roundedcorners }}</h3>

    <v-card
      flat
      class="mx-4 mt-2 mb-6 background"
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
        class="mb-1 px-4 py-2 d-flex flex-row background"
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
        <div class="my-auto" :class="roundThumb ? 'primary--text' : ''">
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
        class="mb-1 px-4 py-2 d-flex flex-row background"
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
        <div class="my-auto" :class="roundThumb ? 'primary--text' : ''">
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
        <template #label>
          <div :class="roundTweak > 0 ? 'primary--text' : ''">
            {{ lang.radius }}
          </div>
        </template>

        <template #thumb-label="{ value }">
          <div
            class="pa-4 background"
            :style="{ borderRadius: value * 3.5 + 'px !important' }"
          ></div>
        </template>
      </v-slider>
    </v-card>

    <v-divider v-if="!$store.state.tweaks.roundTweak" />

    <!-- TODO: translate below -->

    <h3 class="ml-8 mt-8">{{ lang.launchscreen }}</h3>

    <v-card
      flat
      class="mx-4 mt-2 mb-6 background d-flex flex-row"
      style="overflow: hidden"
      :style="{
        borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
      }"
    >
      <v-card
        flat
        class="mr-1 pa-4 d-flex flex-column align-center justify-space-between"
        style="width: calc(100% / 3) !important"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? launchTheme === 0
                ? 'primary darken-4'
                : 'background lighten-1'
              : launchTheme === 0
              ? 'primary lighten-4'
              : 'background darken-1'
            : 'background'
        "
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 12}rem`,
        }"
        @click="launchTheme = 0"
      >
        <v-icon
          style="transition: transform 0.25s; width: 3rem; height: 3rem"
          :style="{
            transform: launchTheme === 0 ? 'scale(1.5)' : '',
            color: launchTheme === 0 ? $vuetify.theme.currentTheme.primary : '',
          }"
        >
          mdi-align-horizontal-center
        </v-icon>
        <span class="mt-3 text-center" style="font-size: 0.8rem">
          {{ lang.centeredlayout }}
        </span>
      </v-card>
      <v-card
        flat
        class="mr-1 pa-4 d-flex flex-column align-center justify-space-between"
        style="width: calc(100% / 3) !important"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? launchTheme === 1
                ? 'primary darken-4'
                : 'background lighten-1'
              : launchTheme === 1
              ? 'primary lighten-4'
              : 'background darken-1'
            : 'background'
        "
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 12}rem ${
            $store.state.tweaks.roundTweak / 2
          }rem ${$store.state.tweaks.roundTweak / 2}rem  ${
            $store.state.tweaks.roundTweak / 12
          }rem `,
        }"
        @click="launchTheme = 1"
      >
        <v-icon
          style="transition: transform 0.25s; width: 3rem; height: 3rem"
          :style="{
            transform: launchTheme === 1 ? 'scale(1.5)' : '',
            color: launchTheme === 1 ? $vuetify.theme.currentTheme.primary : '',
          }"
        >
          mdi-align-vertical-distribute
        </v-icon>
        <span class="mt-3 text-center" style="font-size: 0.8rem">
          {{ lang.fullscreenlayout }}
        </span>
      </v-card>
      <v-card
        flat
        class="ml-4 pa-4 pt-6 d-flex flex-column align-center justify-space-between"
        style="width: calc(100% / 3) !important"
        :class="
          $store.state.tweaks.roundTweak > 0
            ? $vuetify.theme.dark
              ? launchIconTheme
                ? 'primary darken-4'
                : 'background lighten-1'
              : launchIconTheme
              ? 'primary lighten-4'
              : 'background darken-1'
            : 'background'
        "
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
        }"
        @click="launchIconTheme = !launchIconTheme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5rem"
          height="1.5rem"
          xml:space="preserve"
          viewBox="0 0 512 512"
          class="iconsvgstuff"
          style="transition: scale 0.25s; border-radius: 0 !important"
          :style="{
            scale: launchIconTheme ? 1.25 : 1,
            color: launchIconTheme ? $vuetify.theme.currentTheme.primary : '',
          }"
        >
          <g>
            <path
              d="M157.768,142.391C168.454,136.236 168.454,120.814 157.766,114.66L157.761,114.658L121.527,93.811L161.399,75.218L175.714,83.453L175.736,83.466L216.392,106.857C233.102,116.471 233.102,140.582 216.392,150.196L175.743,173.582L175.714,173.599L158.778,183.343L118.905,164.75L157.761,142.395L157.768,142.391ZM36,163.605L36,184.79C36.005,197.092 49.314,204.788 59.979,198.652L82.89,185.471L122.763,204.063L77.932,229.856L77.903,229.873L37.467,253.137C20.801,262.726 0,250.695 0,231.467L0,146.818L36,163.605ZM125.384,54.497L85.512,73.09L59.979,58.4L59.964,58.392C49.3,52.27 36,59.968 36,72.269L36,96.178L0,112.965L0,25.585C0,6.357 20.801,-5.673 37.467,3.916L77.917,27.187L77.932,27.196L125.384,54.497Z"
              transform="matrix(1.99234,0,0,1.99234,52.4337,-0.543689)"
              style="fill: currentColor"
            />
          </g>
        </svg>
        <span class="mt-3 text-center" style="font-size: 0.8rem">
          {{ lang.themedicon }}
        </span>
      </v-card>
    </v-card>

    <v-divider v-if="!$store.state.tweaks.roundTweak" />

    <!-- TODO: translate below -->

    <h3 class="ml-8 mt-8">{{ lang.bottomnavigation }}</h3>
    <v-card
      flat
      class="mx-4 mt-2 mb-6 background d-flex flex-column"
      style="overflow: hidden"
      :style="{
        borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
      }"
    >
      <v-card
        flat
        class="mb-1 px-4 py-2 d-flex flex-row background"
        :class="
          roundTweak > 0 ? ($vuetify.theme.dark ? 'lighten-1' : 'darken-1') : ''
        "
        :style="{
          borderRadius: `${roundTweak / 12}rem`,
        }"
        @click="
          navigationIcons < 1 ? (navigationShift = !navigationShift) : '',
            $vuetube.haptics.hapticsImpactLight(1)
        "
      >
        <div class="my-auto" :class="navigationShift ? 'primary--text' : ''">
          {{ lang.shift }}
        </div>
        <v-spacer />
        <v-switch
          v-model="navigationShift"
          style="pointer-events: none"
          persistent-hint
          class="mt-2"
          inset
        />
      </v-card>
      <v-card
        flat
        class="mb-1 px-4 py-2 d-flex flex-row background"
        :class="
          roundTweak > 0 ? ($vuetify.theme.dark ? 'lighten-1' : 'darken-1') : ''
        "
        :style="{
          borderRadius: `${roundTweak / 12}rem`,
        }"
        @click="
          (navigationText = !navigationText),
            $vuetube.haptics.hapticsImpactLight(1)
        "
      >
        <div class="my-auto" :class="navigationText ? 'primary--text' : ''">
          {{ lang.showlabels }}
        </div>
        <v-spacer />
        <v-switch
          v-model="navigationText"
          style="pointer-events: none"
          persistent-hint
          class="mt-2"
          inset
        />
      </v-card>
      <div class="mb-1 d-flex flex-row">
        <v-card
          flat
          class="mr-1 pa-4 d-flex flex-row align-center background"
          :class="
            roundTweak > 0
              ? $vuetify.theme.dark
                ? 'lighten-1'
                : 'darken-1'
              : ''
          "
          style="width: 100%"
          :style="{
            color: navigationIcons === 0 ? 'var(--v-primary-base)' : '',
            borderRadius: `${roundTweak / 12}rem`,
          }"
          @click="(navigationIcons = 0), $vuetube.haptics.hapticsImpactLight(1)"
        >
          <div>{{ lang.mdi }}</div>
          <v-spacer></v-spacer>
          <v-icon
            :class="navigationIcons === 0 ? 'primary--text' : ''"
            class="ma-1"
          >
            mdi-home
          </v-icon>
          <v-icon
            :class="navigationIcons === 0 ? 'primary--text' : ''"
            class="ma-1"
          >
            mdi-youtube-subscription
          </v-icon>
          <v-icon
            :class="navigationIcons === 0 ? 'primary--text' : ''"
            class="ma-1"
          >
            mdi-view-list
          </v-icon>
        </v-card>
        <v-card
          flat
          class="pa-4 d-flex flex-row align-center background"
          :class="
            roundTweak > 0
              ? $vuetify.theme.dark
                ? 'lighten-1'
                : 'darken-1'
              : ''
          "
          style="width: 100%"
          :style="{
            color: navigationIcons === 1 ? 'var(--v-primary-base)' : '',
            borderRadius: `${roundTweak / 12}rem`,
          }"
          @click="
            (navigationIcons = 1),
              (navigationShift = false),
              $vuetube.haptics.hapticsImpactLight(1)
          "
        >
          <div>{{ lang.materialsymbols }}</div>
          <v-spacer></v-spacer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 48 48"
            height="2rem"
            width="2rem"
            class="ma-1"
          >
            <use href="/home.svg#main" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 48 48"
            height="2rem"
            width="2rem"
            class="ma-1"
          >
            <use href="/subs.svg#main" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 48 48"
            height="2rem"
            width="2rem"
            class="ma-1"
          >
            <use href="/list.svg#main" />
          </svg>
        </v-card>
      </div>
      <div class="d-flex flex-row">
        <v-card
          flat
          class="mr-1 pa-4 d-flex flex-row align-center background"
          :class="
            roundTweak > 0
              ? $vuetify.theme.dark
                ? 'lighten-1'
                : 'darken-1'
              : ''
          "
          style="width: 100%"
          :style="{
            color: navigationIcons === 2 ? 'var(--v-primary-base)' : '',
            borderRadius: `${roundTweak / 12}rem`,
          }"
          @click="
            (navigationIcons = 2),
              (navigationShift = false),
              $vuetube.haptics.hapticsImpactLight(1)
          "
        >
          <div>{{ lang.fluentuiicons }}</div>
          <v-spacer></v-spacer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            height="2rem"
            width="2rem"
            class="ma-1"
          >
            <use href="/fhome.svg#main" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            height="2rem"
            width="2rem"
            class="ma-1"
          >
            <use href="/fsubs.svg#main" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            height="2rem"
            width="2rem"
            class="ma-1"
          >
            <use href="/flist.svg#main" />
          </svg>
        </v-card>
        <v-card
          flat
          class="pa-4 d-flex flex-row align-center background"
          :class="
            roundTweak > 0
              ? $vuetify.theme.dark
                ? 'lighten-1'
                : 'darken-1'
              : ''
          "
          style="width: 100%"
          :style="{
            color: navigationIcons === 3 ? 'var(--v-primary-base)' : '',
            borderRadius: `${roundTweak / 12}rem`,
          }"
          @click="
            (navigationIcons = 3),
              (navigationShift = false),
              $vuetube.haptics.hapticsImpactLight(1)
          "
        >
          <div>{{ lang.ibmcarbonicons }}</div>
          <v-spacer></v-spacer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 32 32"
            height="2rem"
            width="2rem"
            class="ma-1"
          >
            <use href="/chome.svg#main" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 32 32"
            height="2rem"
            width="2rem"
            class="ma-1"
          >
            <use href="/csubs.svg#main" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 32 32"
            height="2rem"
            width="2rem"
            class="ma-1"
          >
            <use href="/clist.svg#main" />
          </svg>
        </v-card>
      </div>
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
    launchTheme: {
      get() {
        return this.$store.state.tweaks.launchTheme;
      },
      set(value) {
        this.$store.commit("tweaks/setLaunchTheme", value);
      },
    },
    launchIconTheme: {
      get() {
        return this.$store.state.tweaks.launchIconTheme;
      },
      set(value) {
        this.$store.commit("tweaks/setLaunchIconTheme", value);
      },
    },
    navigationText: {
      get() {
        return this.$store.state.tweaks.navigationText;
      },
      set(value) {
        this.$store.commit("tweaks/setNavigationText", value);
      },
    },
    navigationShift: {
      get() {
        return this.$store.state.tweaks.navigationShift;
      },
      set(value) {
        this.$store.commit("tweaks/setNavigationShift", value);
      },
    },
    navigationIcons: {
      get() {
        return this.$store.state.tweaks.navigationIcons;
      },
      set(value) {
        this.$store.commit("tweaks/setNavigationIcons", value);
      },
    },
  },
  mounted() {
    this.lang = this.$lang("mods").tweaks;
  },
};
</script>
