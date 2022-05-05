<template>
  <v-card class="dialog-base">
    <div class="toolbar-container">
      <v-toolbar color="background" flat>
        <slot name="header"></slot>
      </v-toolbar>
      <v-divider></v-divider>
    </div>
    <div class="dialog-body background">
      <slot></slot>
    </div>
    <expand-x-transition>
      <slot name="reveal"></slot>
    </expand-x-transition>
  </v-card>
</template>

<style lang="sass">
.dialog-base
  display: flex
  flex-direction: column
  height: 100%

  .dialog-body
    overflow-y: auto
    height: 100%
</style>
