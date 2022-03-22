<template>
  <v-card
    style="height: 4rem !important; display: flex; box-shadow: none !important"
    color="accent"
    class="topNav rounded-0 pa-3"
  >
    <h3 v-show="!search" class="my-auto ml-4" v-text="page" />

    <v-btn
      v-if="search"
      icon
      class="mr-3 my-auto"
      @click="$emit('close-search')"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <v-text-field
      v-if="search"
      v-model="text"
      solo
      dense
      flat
      label="Search"
      class="searchBar"
      @input="$emit('text-changed', text)"
      @keyup.enter="$emit('search-btn', text)"
    />

    <v-spacer v-if="!search" />

    <v-btn
      icon
      tile
      class="ml-3 my-auto fill-height"
      style="border-radius: 0.25rem !important"
      @click="$emit('search-btn', text)"
      ><v-icon>mdi-magnify</v-icon></v-btn
    >
    <v-btn
      v-show="!search"
      icon
      tile
      class="ml-4 mr-2 my-auto fill-height"
      style="border-radius: 0.25rem !important"
      to="/settings"
      ><v-icon>mdi-dots-vertical</v-icon></v-btn
    >
  </v-card>
</template>

<script>
export default {
  props: {
    search: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      default: "Home",
    },
  },
  events: ["searchBtn", "textChanged", "closeSearch"],
  data: () => ({
    text: "",
  }),
};
</script>

<style scoped>
.topNav {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
  /*border-radius: 0 0 1em 1em !important;*/
}
.topNavSearch {
  margin-bottom: -10em;
  margin-left: 2em;
  /*transform: translateY(-2.5%);*/
}
.searchBar {
  margin: 0;
}
.searchButton {
  width: 100%;
  justify-content: left !important;
}
</style>
