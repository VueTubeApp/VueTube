<template>
  <v-app>
    <center style="padding: 10% 0;">
      <v-icon size="100">mdi-heart-broken</v-icon>
      <h1>Something went wrong</h1>
      <v-btn rounded to="/" color="primary darken-2"><v-icon>mdi-restart</v-icon>Restart</v-btn>
      <v-btn rounded @click="exit"><v-icon>mdi-close</v-icon>Exit</v-btn>

      <div style="margin-top: 5em; color: #999; font-size: 0.75em">
        <div style="font-size: 1.4em">Crash Information</div>
        <div>Reason: {{ error.message }}</div>
        <div>Path: {{ $route.fullPath }}</div>
        <div>Code: {{ error.statusCode }}</div>
      </div>
    </center>
  </v-app>
</template>

<script>
import { App } from '@capacitor/app';

export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  method: {
    exit() {
      App.exitApp()
    }
  }
};
</script>
