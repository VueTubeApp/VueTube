<template>
  <div class="mainContainer">


    <v-switch
      v-model="$vuetify.theme.dark"
      label="Dark Theme"
      hint="Bravo Six, Going Dark."
      inset persistent-hint
    />


  </div>
</template>

<style scoped>
.mainContainer {
  padding-left: 1em;
}
</style>
