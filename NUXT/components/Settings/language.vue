<template>
  <v-select
    v-model="selectedLang"
    background-color="background"
    :items="langs"
    label="App Language"
    solo
  ></v-select>
</template>

<script>
export default {
  data() {
    return {
      langs: [],
      lang: { mods: { general: { language: "" } } },
      selectedLang: null,
    };
  },

  watch: {
    //---   Update Stored Language Value   ---//
    selectedLang: function (newVal) {
      const langs = this.$lang(null, true);
      let lang = String();
      for (const i in langs) {
        if (langs[i].name == newVal) {
          lang = i;
          console.log(lang);
        }
      }
      localStorage.setItem("language", lang);
    },
    //---   End Update Stored Language Value   ---//
  },

  mounted() {
    const lang = this.$lang();
    this.lang = lang.mods.general;
    const langs = this.$lang(null, true);
    for (const i in langs) {
      this.langs.push(langs[i].name);
    }

    this.selectedLang = this.$lang().name;
  },
};
</script>
