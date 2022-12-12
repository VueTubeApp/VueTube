<template>
  <div>
    <v-select
      v-model="selectedLang"
      background-color="background"
      style="border-radius: 0.75rem"
      :menu-props="{
        bottom: true,
        offsetY: true,
        rounded: 'lg',
        nudgeTop: -8,
        maxHeight: 228,
        transition: 'slide-y-transition',
      }"
      label="App Language"
      :items="langs"
      outlined
    />

    <v-dialog v-model="restart" width="500">
      <v-card
        class="rounded-lg"
        :class="
          $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
        "
      >
        <v-card-title class="text-h5">{{ lang.global.restart }}</v-card-title>
        <v-card-text>{{ lang.global.settingRestart }}</v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="restart = false">{{ lang.global.later }}</v-btn>
          <v-btn color="primary" text @click="restartApp()">{{
            lang.global.restart
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: [],
      lang: { global: {}, mods: { general: { language: "" } } },
      selectedLang: null,
      restart: false,

      //---   Required To Prvent Initial Popup   ---//
      userChanged: false,
    };
  },

  watch: {
    //---   Update Stored Language Value   ---//
    selectedLang: function (newVal) {
      //---   Required To Prvent Initial Popup   ---//
      if (this.userChanged == false) return (this.userChanged = true);

      //---   Change Lang Stuff   ---//
      const langs = this.$lang(null, true);
      let lang = String();
      for (const i in langs) {
        if (langs[i].name == newVal) {
          lang = i;
          this.lang = langs[i];
        }
      }
      localStorage.setItem("language", lang);
      this.restart = true;
    },
    //---   End Update Stored Language Value   ---//
  },

  mounted() {
    this.lang = this.$lang();
    const langs = this.$lang(null, true);
    for (const i in langs) {
      this.langs.push(langs[i].name);
    }

    this.selectedLang = this.$lang().name;
  },

  methods: {
    restartApp() {
      this.$router.replace("/");
    },
  },
};
</script>
