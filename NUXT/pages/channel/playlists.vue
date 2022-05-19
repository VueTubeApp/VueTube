<template>
  <div>
    <!-- TODO: make this a playlist-card-renderer -->
    <v-card
      v-ripple
      class="background d-flex flex-row overflow-hidden ma-4"
      :class="
        $store.state.tweaks.roundThumb && $store.state.tweaks.roundTweak > 0
          ? $vuetify.theme.dark
            ? 'lighten-1'
            : 'darken-1'
          : ''
      "
      :style="{
        borderRadius: $store.state.tweaks.roundThumb
          ? `${$store.state.tweaks.roundTweak / 2}rem`
          : '0',
      }"
      flat
    >
      <v-img
        contain
        src="/dev.svg"
        class="background"
        style="position: relative; max-width: 8rem !important"
        :class="$vuetify.theme.dark ? 'lighten-2' : 'darken-2'"
        :style="{
          borderRadius: $store.state.tweaks.roundThumb
            ? `${$store.state.tweaks.roundTweak / 4}rem`
            : '0',
        }"
      >
        <div
          class="background d-flex flex-column justify-center align-center"
          style="
            position: absolute;
            top: 0;
            right: 0;
            width: 40%;
            height: 100%;
            opacity: 0.25;
          "
        >
          <div>420</div>
          <v-icon>mdi-playlist-play</v-icon>
        </div>
      </v-img>
      <div class="pa-4" v-emoji>
        <b>Work in Progress</b>

        <div
          class="background--text caption"
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
          style="width: 50px !important; height: 50px !important"
        >
          <v-icon>mdi-share-outline</v-icon>
        </v-btn>
        <v-btn
          text
          tile
          elevation="0"
          style="width: 50px !important; height: 50px !important"
        >
          <v-icon>mdi-plus-box-multiple-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
