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

  target: "static",
  plugins: [
    { src: "~/plugins/youtube", mode: "client" },
    { src: "~/plugins/vuetube", mode: "client" },
    { src: "~/plugins/ryd", mode: "client" },
  ],
  generate: {
    dir: "../dist",
  },

  //---   Bettertube Debugging   ---//
  server: {
    port: 80, // default: 3000 (Note: Running on ports below 1024 requires root privileges!)
    host: "0.0.0.0", // default: localhost,
    timing: false,
  },

  //---   Default NUXT Stuff   ---//
  head: {
    title: "VueTube",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
  },

  css: [],
  components: true,

  buildModules: ["@nuxtjs/vuetify"],
  modules: [],

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      dark: true,
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: "#E57373",
          background: "#ffffff",
        },
        dark: {
          primary: "#B71C1C",
          background: "#000000",
        },
      },
    },
  },
};
