<template>
  <center>
    <img style="margin-top: 5em; max-width: 80%; max-height: 15em;" src="/dev.svg" />
    <h1 class="grey--text">Page Under Construction</h1>
    <p class="grey--text">Please read the VueTube FAQ for more information.</p>
    <button @click="debug">Test Button</button>
  </center>
</template>

<script>
export default {
  methods: {
    debug () {
      console.log(this.$youtube.recommend("test", false))
    }
  } 
}
</script>