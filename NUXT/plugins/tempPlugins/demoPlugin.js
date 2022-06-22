module.exports = {
  manifest: {
    name: "Test plugin", // Required
    vuetube: "*",
    version: "1.0", // Required
    author: "Frontesque", // Required
    description:
      "A plugin to test how vuetube handles plugins // Add 'Hello, World!' to the home page.", // Required
    homepage: "https://github.com/Frontesque/VueTube-Example-Plugin",
    license: "GPL-3.0", // Required
  },

  /*************************
   * Execute code on ALL VueTube pages
   ************************/
  global: function () {
    console.log(
      "This code is now executed when ALL vuetube pages (including settings) are loaded."
    );
  },

  /*************************
   * Execute code on SPECIFIC VueTube pages
   *
   * You can view what page you intend to inject code into by looking at `~/NUXT/pages/` in the main VueTube repo
   ************************/
  pages: {
    home: function () {
      // Execute code on JUST the home page
    },
  },
};
