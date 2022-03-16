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

    <v-card class="pb-5">
      <v-card-title>Accent Color</v-card-title>
      <v-card-text>

        <v-alert color="primary" dense outlined type="warning">NOTE: This doesn't save after closing the app (yet)</v-alert>
        <v-color-picker dot-size="5" hide-mode-switch mode="hexa" v-model="accentColor" />
        
      </v-card-text>
    </v-card>


  </div>
</template>

<script>
export default {

  data() {
    return {
      accentColor: '#ffffff'
    }
  },

  mounted() {
    this.accentColor = this.$vuetify.theme.themes.dark.primary;
  },

  methods: {
    amoled() {
      this.$vuetify.theme.themes.dark.background === '#000' ? (
        this.$vuetify.theme.themes.dark.accent = '#222',
        this.$vuetify.theme.themes.dark.accent2 = '#222',
        this.$vuetify.theme.themes.dark.background = '#333',
        localStorage.setItem("isOled", false)
       ) : (
        this.$vuetify.theme.themes.dark.accent = '#000',
        this.$vuetify.theme.themes.dark.accent2 = '#000',
        this.$vuetify.theme.themes.dark.background = '#000',
        localStorage.setItem("isOled", true)

      )
      // doesn't work 😭
      // console.log(document.getElementsByClassName('v-application--wrap')[0])
      // console.log(document.getElementsByClassName('v-application--wrap')[0].style)
      // document.getElementsByClassName('v-application--wrap')[0].style.backgroundColor = "#000000 !important"
    },

    saveTheme(isDark) {
      localStorage.setItem("darkTheme", isDark);
    },

  },

  watch: {
    accentColor: function (val, oldVal) {
      this.$vuetify.theme.currentTheme.primary = val;
      let primaryAlt = this.$libs.hexToRgb(val);

      let rgbEdit = 130; //Light Mode
      if (localStorage.getItem('darkTheme') === "true") rgbEdit = -80; //Dark Mode

      for (const i in primaryAlt) {
        primaryAlt[i] = primaryAlt[i] + rgbEdit; //Amount To Lighten By
        if (primaryAlt[i] > 255) primaryAlt[i] = 255;
        if (primaryAlt[i] < 0) primaryAlt[i] = 0;
      }

      primaryAlt = this.$libs.rgbToHex(primaryAlt.r, primaryAlt.g, primaryAlt.b);
      


      this.$vuetify.theme.currentTheme.primaryAlt = primaryAlt;
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
