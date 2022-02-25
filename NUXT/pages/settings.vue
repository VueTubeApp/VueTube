<template>
  <div class="mainContainer pt-1">


    <v-card class="pb-5"> 
      <v-card-title>Theme</v-card-title>
      <v-row class="ml-3 mr-6">
        <section class="row">
          <v-switch
            v-model="$vuetify.theme.dark"
            label="Dark Theme"
            hint="Bravo Six, Going Dark."
            persistent-hint
            inset
          />
        </section>
        <v-btn v-if="$vuetify.theme.dark" text tile class="white--text black" @click="amoled" >
          {{ 
            this.$vuetify.theme.themes.dark.background === '#000000'
            ? 'LCD' 
            : 'OLED'
          }}
          <v-icon :size="this.$vuetify.theme.themes.dark.background === '#000000' ? '.5rem' : '.9rem'" class="ml-2">mdi-brightness-2</v-icon>
        </v-btn>
        <v-btn v-else text tile class="white--text red" @click="nored" >
          {{ 
            this.$vuetify.theme.themes.light.accent === '#888'
            ? 'RED' 
            : 'EWW'
          }}
          <v-icon :size="this.$vuetify.theme.themes.light.accent === '#888' ? '.5rem' : '.9rem'" class="ml-2">mdi-brightness-1</v-icon>
        </v-btn>
      </v-row>
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

<script>
export default {
  methods: {
    nored () {
      this.$vuetify.theme.themes.light.accent === '#888' ? (
        this.$vuetify.theme.themes.light.accent = '#e00'
       ) : (
        this.$vuetify.theme.themes.light.accent = '#888'
      )
    },
    amoled () {
      this.$vuetify.theme.themes.dark.background === '#000000' ? (
        this.$vuetify.theme.themes.dark.accent = '#444444',
        this.$vuetify.theme.themes.dark.background = '#111111'
       ) : (
        this.$vuetify.theme.themes.dark.accent = '#000000',
        this.$vuetify.theme.themes.dark.background = '#000000'
      )
      // doesn't work 😭
      // console.log(document.getElementsByClassName('v-application--wrap')[0])
      // console.log(document.getElementsByClassName('v-application--wrap')[0].style)
      // document.getElementsByClassName('v-application--wrap')[0].style.backgroundColor = "#000000 !important"
    }
  }
}
</script>

<style scoped>
.v-card {
  margin: 1em;
}

section {
  padding: 0 1em 1em 1em;
}
</style>
