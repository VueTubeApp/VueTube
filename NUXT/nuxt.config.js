import colors from 'vuetify/es5/util/colors'
/**** Front's Notes / Don't Remove ****
*   Data Storage:
*   localStorage.setItem("key", data)
*   localStorage.getItem('key')
*/


export default {

  //---   Bettertube Stuff   ---//
  env: {
    appVersion: "dev-local",
  },

  target: 'static',
  plugins: [
    { src: "~/plugins/youtube", mode: "client" },
    { src: "~/plugins/vuetube", mode: "client" }
  ],
  generate: {
    dir: '../dist'
  },

  //---   Bettertube Debugging   ---//
  server: {
    port: 80, // default: 3000 (Note: Running on ports below 1024 requires root privileges!)
    host: '0.0.0.0', // default: localhost,
    timing: false
  },

  //---   Default NUXT Stuff   ---//
  head: {
    title: 'VueTube',
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
      options: { customProperties: true },
      themes: {
        light: {
          primary: colors.red.lighten2,
          primaryAlt: colors.red.lighten4,
          accent: "#CD201F",
          accent2: "#fff",
          background: "#fff",
          info: "#000"
        },
        dark: {
          primary: colors.red.darken2, //colors.blue.darken2
          primaryAlt: "#533",
          accent: "#333",
          accent2: "#333",
          background: "#222",
          info: "#fff",
        }
      }
    }
  }
}
