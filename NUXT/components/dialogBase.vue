<template>
  <v-card flat class="dialog-base background">
    <div
      class="toolbar-container d-flex flex-column background"
      style="flex-direction: column !important"
    >
      <v-toolbar color="background" style="position: sticky; top: 0" flat>
        <slot name="header"></slot>
      </v-toolbar>
      <v-divider></v-divider>
    </div>
    <div class="dialog-body background">
      <slot></slot>
    </div>
    <v-expand-transition>
      <slot name="reveal"></slot>
    </v-expand-transition>
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
