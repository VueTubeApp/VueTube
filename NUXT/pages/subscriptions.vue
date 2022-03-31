<template>
  <center>
    <v-img
      contain
      style="margin-top: 5em; max-width: 80%; max-height: 15em"
      src="/dev.svg"
    />
    <h1
      class="background--text"
      :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
    >
      Page Under Construction
    </h1>
    <p
      class="background--text"
      :class="$vuetify.theme.dark ? 'text--lighten-4' : 'text--darken-4'"
    >
      Please read the VueTube FAQ for more information.
    </p>
  </center>
</template>

<script>
export default {};
</script>
