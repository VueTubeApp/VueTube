<template>
  <div>
    <v-list-item
      v-for="(item, index) in settingsItems"
      :key="index"
      :style="{
        padding:
          $store.state.tweaks.roundTweak > 0
            ? '0 1rem !important'
            : '0rem !important',
      }"
    >
      <v-btn
        text
        class="entry text-left setting-btn no-spacing"
        :to="item.to"
        :disabled="item.disabled"
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
          paddingLeft:
            $store.state.tweaks.roundTweak > 0 ? '' : '1.5rem !important',
        }"
      >
        <v-icon size="30px" class="icon" v-text="item.icon" />
        {{ item.name }}
      </v-btn>
    </v-list-item>
    <v-list-item
      :style="{
        padding:
          $store.state.tweaks.roundTweak > 0
            ? '0 1rem !important'
            : '0rem !important',
      }"
    >
      <!--   Dev Mode Open   -->
      <v-btn
        v-if="!devmode"
        text
        class="entry"
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
          paddingLeft:
            $store.state.tweaks.roundTweak > 0 ? '' : '1.5rem !important',
        }"
        @click="dev()"
      />

      <v-btn
        v-if="devmode"
        text
        class="entry text-left setting-btn no-spacing"
        to="/mods/developer"
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
          paddingLeft:
            $store.state.tweaks.roundTweak > 0 ? '' : '1.5rem !important',
        }"
      >
        <v-icon size="30px" class="icon">mdi-database-edit</v-icon>
        {{ devmodebuttonname }}
      </v-btn>
    </v-list-item>
    <!--   End Dev Mode   -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      devClicks: 0,
      devmode: false,

      devmodebuttonname: "Developer Mode",

      settingsItems: [
        {
          name: "General",
          icon: "mdi-cog",
          to: "/mods/general",
        },
        {
          name: "Theme",
          icon: "mdi-brush-variant",
          to: "/mods/theme",
        },
        {
          name: "Player",
          icon: "mdi-motion-play-outline",
          to: "/mods/player",
          disabled: true,
        },
        {
          name: "UI Tweaker",
          icon: "mdi-television-guide",
          to: "/mods/tweaks",
        },
        {
          name: "Startup Options",
          icon: "mdi-restart",
          to: "/mods/startup",
        },
        {
          name: "Plugins",
          icon: "mdi-puzzle",
          to: "/mods/plugins",
          disabled: true,
        },
        {
          name: "Updates",
          icon: "mdi-cloud-download-outline",
          to: "/mods/updates",
        },
        {
          name: "About",
          icon: "mdi-information-outline",
          to: "/mods/about",
        },
      ],
    };
  },

  mounted() {
    this.settingsItems[0].name = this.$lang("settings").general;
    this.settingsItems[1].name = this.$lang("settings").theme;
    this.settingsItems[2].name = this.$lang("settings").player;
    this.settingsItems[3].name = this.$lang("settings").uitweaker;
    this.settingsItems[4].name = this.$lang("settings").startupoptions;
    this.settingsItems[5].name = this.$lang("settings").plugins;
    this.settingsItems[6].name = this.$lang("settings").updates;
    this.settingsItems[7].name = this.$lang("settings").about;
    this.devmodebuttonname = this.$lang("settings").devmode;

    this.devmode = localStorage.getItem("devmode");
  },

  methods: {
    dev() {
      this.devClicks++;
      if (this.devClicks >= 6) {
        localStorage.setItem("devmode", "true");
        this.devmode = true;
      }
    },
  },
};
</script>

<style scoped>
.setting-btn {
  /* overrides Vuetify defaults (all caps) */
  text-transform: none !important;
}
.setting-btn:first-letter {
  /* Capitalizes first-letter only */
  text-transform: uppercase !important;
}
.entry {
  width: 100%;
  font-size: 1.2em;
  justify-content: left !important;
  padding: 1.5em 0.5em 1.5em 0.5em !important;
}
.icon {
  margin-right: 0.5em;
}
</style>
