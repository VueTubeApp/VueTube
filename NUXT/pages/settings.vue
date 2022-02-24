<template>
  <div class="mainContainer">


    <v-card>
      <v-card-title>Theme</v-card-title>
      <section>
        <v-switch
          v-model="$vuetify.theme.dark"
          label="Dark Theme"
          hint="Bravo Six, Going Dark."
          persistent-hint
        />
      </section>
    </v-card>


  </div>
</template>

<style scoped>
.mainContainer {
  padding: 1em;
}
section {
  padding: 0 1em 1em 1em;
}
</style>
