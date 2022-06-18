<template>
  <div class="mainContainer pt-1">
    <v-card flat class="pb-5 background" :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'" :style="{borderRadius: `${roundTweak / 2}rem`}">
      <v-card-title>{{ lang.language }}</v-card-title>
      <v-card-text>
        <language />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import language from '~/components/Settings/language.vue';
  export default {
    components: {
      language
    },
    computed: {
      roundTweak() {
        return this.$store.state.tweaks.roundTweak;
      },
    },

    data() {
      return {
        lang: { mods: { general: { language: "" } } },
      };
    },

    mounted() {
      const lang = this.$lang(); this.lang = lang.mods.general;
    }
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
