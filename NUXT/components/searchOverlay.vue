<template>
  <div>
    <v-text-field
      label="Search"
      outlined
      v-model="text"
      @input="textChanged"
    />
    <v-list style="min-width: 180px;">
      <v-list-item v-for="(item, index) in response" :key="index">
        <v-btn text style="width: 100%;" class="info--text">{{ item[0] }}</v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>

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
        const data = res.data.replace(/^.*?\(/,'').replace(/\)$/,''); //Format Response
        this.response = JSON.parse(data)[1]
      });
    }
  }

}
</script>
