<template>
  <v-card
    v-ripple
    flat
    class="background"
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
      margin:
        $store.state.tweaks.roundThumb && $store.state.tweaks.roundTweak > 0
          ? '0 1rem 1rem 1rem'
          : '0 0 0.25rem 0',
    }"
  >
    <div class="d-flex flex-row pa-4">
      <v-avatar size="50" color="primary" />
      <div class="d-flex flex-column my-auto pl-4">
        <b>Work in progress</b>
        <div
          class="background--text"
          :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
        >
          69 years ago
        </div>
      </div>
      <v-spacer />
      <v-btn
        fab
        text
        elevation="0"
        style="width: 50px !important; height: 50px !important"
      >
        <v-icon>mdi-share-outline</v-icon>
      </v-btn>
    </div>
    <p class="px-4" v-emoji>Blurb Blurb Text Goes Here ...</p>
    <v-img
      contain
      class="background my-4"
      :class="$vuetify.theme.dark ? 'lighten-2' : 'darken-2'"
      style="max-height: 15rem"
      :style="{
        borderRadius: `${$store.state.tweaks.roundTweak / 4}rem`,
        marginLeft:
          !($store.state.tweaks.roundThumb && $store.state.tweaks.roundTweak) >
          0
            ? '1rem'
            : '0',
        marginRight:
          !($store.state.tweaks.roundThumb && $store.state.tweaks.roundTweak) >
          0
            ? '1rem'
            : '0',
      }"
      src="/dev.svg"
    />
    <div class="d-flex flex-row px-4 pb-4">
      <v-icon>mdi-thumb-up-outline</v-icon>
      <b class="mx-2">123</b>
      <v-icon class="ml-2">mdi-thumb-down-outline</v-icon>
    </div>
  </v-card>
</template>
