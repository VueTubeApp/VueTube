<template>
  <div class="mainContainer pt-1">
    <v-card flat class="pb-5 background" :class="$vuetify.theme.dark ? 'lighten-1' : 'darken-1'" :style="{borderRadius: `${roundTweak / 2}rem`}">
      <v-card-title>{{ lang.language }}</v-card-title>
      <v-card-text>
        <v-select v-model="selectedLang" background-color="background" :items="langs" label="App Language" solo></v-select>
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
        langs: [],
        lang: { mods: { general: { language: "" } } },
        selectedLang: null
      };
    },

    watch: {
      //---   Update Stored Language Value   ---//
      selectedLang: function (newVal) {
        const langs = this.$lang(null, true);
        let lang = new String();
        for (const i in langs) {
          if (langs[i].name == newVal) {
            lang = i;
            console.log(lang)
          }
        }
        localStorage.setItem("language", lang);
      },
      //---   End Update Stored Language Value   ---//
    },

    mounted() {
      const lang = this.$lang(); this.lang = lang.mods.general;
      const langs = this.$lang(null, true);
      for (const i in langs) {
        this.langs.push(langs[i].name);
      }

      this.selectedLang = this.$lang().name;


      
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
