import colors from 'vuetify/es5/util/colors'

export default {

  //---   Bettertube Stuff   ---//
  target: 'static',
  buildDir: '../dist',
  plugins: [
    { src: "~/plugins/youtubei", mode: "client" }
  ],

  //---   Bettertube Debugging   ---//
  server: {
    port: 80, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  },

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
  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          background: colors.white,
          primary: colors.red.lighten1,
          accent: "#E62117",
          info: "#000"
        },
        dark: {
          background: colors.grey.darken9,
          primary: colors.red.darken2, //colors.blue.darken2
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: "#fff",
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
