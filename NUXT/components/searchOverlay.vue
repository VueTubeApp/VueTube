<template>
  <div>
    <v-text-field
      label="Search"
      outlined
      v-model="text"
      @input="textChanged"
    />
    {{ response }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: null,
      response: null,
    }
  },

  methods: {
    textChanged() {
      this.$youtube.autoComplete(this.text, (data) => {
        this.response = data;
      });
    }
  }

}
</script>
