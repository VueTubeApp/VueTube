<template>
  <v-card
    v-ripple
    class="background d-flex flex-row overflow-hidden mb-4 mx-4"
    style="height: 6rem !important"
    :class="
      $store.state.tweaks.roundThumb && $store.state.tweaks.roundTweak > 0
        ? $vuetify.theme.dark
          ? 'lighten-1'
          : 'darken-1'
        : ''
    "
    :style="{
      borderRadius: $store.state.tweaks.roundThumb
        ? `${$store.state.tweaks.roundTweak / 3}rem`
        : '0',
    }"
    flat
  >
    <v-img
      contain
      src="/dev.svg"
      class="background"
      style="position: relative; max-width: 8rem !important"
      :class="$vuetify.theme.dark ? 'lighten-3' : 'darken-3'"
      :style="{
        borderRadius: $store.state.tweaks.roundThumb
          ? `${$store.state.tweaks.roundTweak / 3}rem`
          : '0',
      }"
    >
      <div
        class="d-flex flex-column justify-center align-center background-opaque"
        style="position: absolute; top: 0; right: 0; width: 50%; height: 100%"
      >
        <div>420</div>
        <v-icon>mdi-playlist-play</v-icon>
      </div>
    </v-img>
    <div class="pa-4" v-emoji style="font-size: 0.75rem !important">
      <b>Work in Progress</b>

      <div
        class="background--text caption mt-2"
        :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
      >
        Bottom Text <br />
        420 videos
      </div>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex flex-column">
      <v-btn
        text
        tile
        elevation="0"
        class="flex-grow-1"
        style="width: 2rem !important"
      >
        <v-icon>mdi-share-outline</v-icon>
      </v-btn>
      <v-btn
        text
        tile
        elevation="0"
        class="flex-grow-1"
        style="width: 2rem !important"
      >
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>
