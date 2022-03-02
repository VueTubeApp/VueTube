import colors from 'vuetify/es5/util/colors'

export default {

  //---   Bettertube Stuff   ---//
  target: 'static',
  plugins: [
    { src: "~/plugins/youtube", mode: "client" }
  ],
  generate: {
    dir: '../dist'
  },

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
          primary: colors.red.lighten2,
          accent: "#CD201F",
          accent2: "#fff",
          background: "#fff",
          info: "#000"
        },
        dark: {
          primary: colors.red.darken2, //colors.blue.darken2
          accent: "#333",
          accent2: "#333",
          background: "#222",
          info: "#fff",
        }
      }
    }
  }
}
