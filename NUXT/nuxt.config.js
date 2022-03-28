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
      // { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, viewport-fit=cover",
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
        // themeCache: {
        //   get: (key) => localStorage.getItem(key),
        //   set: (key, value) => localStorage.setItem(key, value),
        // },
      },
      themes: {
        light: {
          primary: {
            base: "#E57373",
            lighten1: "#EF9A9A",
            lighten2: "#FFCDD2",
          },
          background: {
            base: "#ffffff",
            lighten1: "#eee",
            lighten2: "#e0e0e0",
            lighten4: "#aaaaaa",
          },
        },
        dark: {
          primary: {
            base: "#D32F2F",
            lighten1: "#533",
            lighten2: "#300",
          },
          background: {
            base: "#181818",
            lighten1: "#222",
            lighten2: "#282828",
            lighten4: "#424242",
          },
        },
      },
    },
  },
};
