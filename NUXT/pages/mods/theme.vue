<template>
  <div class="mainContainer pt-1">

    <v-card class="pb-5">
      <v-card-title>Global Base Color</v-card-title>
      <v-row class="ml-3 mr-6">
        <section class="row">
          <v-switch
            v-model="$vuetify.theme.dark"
            label="Dark Theme"
            hint="Bravo Six, Going Dark."
            persistent-hint
            inset
            @click="saveTheme($vuetify.theme.dark)"
          />
        </section>
        <v-btn v-if="$vuetify.theme.dark" text tile class="white--text black" @click="amoled" >
          {{
            this.$vuetify.theme.themes.dark.background === '#000'
            ? 'LCD'
            : 'OLED'
          }}
          <v-icon :size="this.$vuetify.theme.themes.dark.background === '#000' ? '.5rem' : '.9rem'" class="ml-2">mdi-brightness-2</v-icon>
        </v-btn>
      </v-row>
    </v-card>


  </div>
</template>

<script>
export default {
  methods: {
    amoled() {
      this.$vuetify.theme.themes.dark.background === '#000' ? (
        this.$vuetify.theme.themes.dark.accent = '#222',
        this.$vuetify.theme.themes.dark.accent2 = '#222',
        this.$vuetify.theme.themes.dark.background = '#333'
       ) : (
        this.$vuetify.theme.themes.dark.accent = '#000',
        this.$vuetify.theme.themes.dark.accent2 = '#000',
        this.$vuetify.theme.themes.dark.background = '#000'
      )
      // doesn't work 😭
      // console.log(document.getElementsByClassName('v-application--wrap')[0])
      // console.log(document.getElementsByClassName('v-application--wrap')[0].style)
      // document.getElementsByClassName('v-application--wrap')[0].style.backgroundColor = "#000000 !important"
    },

    saveTheme(isDark) {
      this.$auth.$storage.setLocalStorage("darkTheme", isDark)
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
