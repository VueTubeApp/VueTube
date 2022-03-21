<template>
  <div class="mainContainer pt-1">
    <v-card class="pb-5">
      <v-card-title>Default Page</v-card-title>
      <v-card-text>
        <v-select
          v-model="page"
          :items="pages"
          label="Default Page"
          solo
        ></v-select>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: "home",
      pages: ["home", "subscriptions", "library"],
    };
  },

  watch: {
    page: function (newVal) {
      localStorage.setItem("startPage", newVal);
    },
  },

  mounted() {
    this.page = localStorage.getItem("startPage") || "home";
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
