import colors from 'vuetify/es5/util/colors'

export default {
  
  //---   Bettertube Stuff   ---//
  target: 'static',
  buildDir: '../dist',
  
  //---   Default NUXT Stuff   ---//
  head: {
    title: 'BetterTube',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },


  css: [],
  plugins: [],
  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.red.darken2, //colors.blue.darken2
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
    buildDir: '../dist'
  }
}
