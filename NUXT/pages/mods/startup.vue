<template>
  <div class="mainContainer pt-1">
    <v-card
      flat
      class="pb-5 background"
      :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'"
      :style="{ borderRadius: `${roundTweak / 2}rem` }"
    >
      <v-card-title>{{ lang.mods.startup.defaultpage }}</v-card-title>
      <v-card-text>
        <v-select
          v-model="page"
          background-color="background"
          :items="pages"
          label="Default Page"
          solo
          rounded
        ></v-select>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  computed: {
    roundTweak() {
      return this.$store.state.tweaks.roundTweak;
    },
  },

  data() {
    return {
      page: "home",
      pages: [],
      lang: { mods: { startup: {} } },
    };
  },

  watch: {
    page: function (newVal) {
      localStorage.setItem("startPage", newVal);
    },
  },

  mounted() {
    this.page = localStorage.getItem("startPage") || "home";

    const lang = this.$lang();
    this.lang = lang;

    this.pages = [
      {
        value: "home",
        text: lang.global.home,
      },
      {
        value: "subscriptions",
        text: lang.global.subscriptions,
      },
      {
        value: "library",
        text: lang.global.library,
      },
    ];
  },
};
</script>

<style scoped>
.v-card {
  margin: 1em;
}

section {
  padding: 0 1em 1em 1em;
}
</style>
