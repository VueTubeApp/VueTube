<template>
  <div class="mainContainer pt-1">

    <v-card class="pb-5">
      <v-card-title>Default Page</v-card-title>
      <v-card-text>

        <v-select
          :items="pages"
          v-model="page"
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
      pages: [
        "home",
        "subscriptions",
        "library"
      ]
    }
  },

  mounted() {
    this.page = localStorage.getItem("startPage") || "home";
  },

  watch: {
    page: function (val, oldVal) {
      localStorage.setItem("startPage", val);
    }
  }

}
</script>

<style scoped>
.v-card {
  margin: 1em;
}

section {
  padding: 0 1em 1em 1em;
}
</style>
