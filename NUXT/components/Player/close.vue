<template>
  <!-- TODO: change /home to $router.goBack() or $router.go(-1) -->
  <v-btn
    fab
    text
    small
    style="position: absolute; top: 0.25rem; right: 0.25rem"
    to="/home"
    color="white"
  >
    <v-icon>mdi-close</v-icon>
  </v-btn>
</template>
