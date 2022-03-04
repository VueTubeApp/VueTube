<template>
  <div>


    <v-text-field
      label="Search"
      v-model="text"
      @input="textChanged"
      class="searchBar"
    />

    <div style="min-width: 180px;">
      <v-list-item v-for="(item, index) in response" :key="index">
        <v-btn text dense class="info--text searchButton text-left" @click="search(item)" v-text="item[0]" />
      </v-list-item>
    </div>


  </div>
</template>

<style scoped>
.searchBar {
  margin: 0 1em 1em 1em;
}
.searchButton {
  width: 100%;
  justify-content: left !important;
}
</style>

<script>
export default {
  data() {
    return {
      text: null,
      response: [],
    }
  },

  methods: {
    textChanged() {
      this.$youtube.autoComplete(this.text, (res) => {
        const data = res.replace(/^.*?\(/,'').replace(/\)$/,''); //Format Response
        this.response = JSON.parse(data)[1]
      });
    },

    search(item) {
      location.href="/search?q="+item[0];
    }
  }

}
</script>
