<template>
  <div class="d-flex flex-column align-center">
    <v-img
      height="120"
      :src="$store.state.channel.banner"
      class="background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
    ></v-img>
    <v-avatar size="60" class="mt-2 primary">
      <img :src="$store.state.channel.avatar" />
    </v-avatar>
    <h2 class="mt-2">{{ $store.state.channel.title }}</h2>
    <v-btn
      :aria-label="subscribeAlt"
      class="mt-2"
      text
      color="primary"
      style="height: 1rem"
    >
      {{ $store.state.channel.subscribe }}
    </v-btn>
    <div style="font-size: 0.75rem" class="mt-2">
      {{ $store.state.channel.subscribers }} &middot;
      {{ $store.state.channel.videos }}
    </div>
    <v-card
      flat
      to="/channel/about"
      style="
        font-size: 0.75rem;
        height: 2rem;
        text-oveflow: ellipsis;
        overflow: hidden;
      "
      class="background background--text text-center px-4"
      :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
    >
      {{ $store.state.channel.descriptionPreview }}
      <v-icon
        class="background--text"
        :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
      >
        mdi-chevron-right
      </v-icon>
    </v-card>
  </div>
</template>
