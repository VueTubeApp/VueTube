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

    <v-card>
      <v-card-title>Debug</v-card-title>
      <section>
        <div style="color: #999;">This is just a temporary section for messing with the tool while it's still being worked on :)</div>
        <v-btn to="/watch">Open Watch Page</v-btn>
      </section>
    </v-card>


  </div>
</template>

<style scoped>
.v-card {
  margin: 1em;
}

section {
  padding: 0 1em 1em 1em;
}
</style>
