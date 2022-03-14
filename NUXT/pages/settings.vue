<template>
 <div style="padding-top: 1em;">
    <v-list-item v-for="(item, index) in settingsItems" :key="index">

      <v-btn text class="entry text-left" :to="item.to" :disabled="item.disabled">
        <v-icon v-text="item.icon" size="30px" class="icon" />
        {{ item.name }}
      </v-btn>

    </v-list-item>
 </div>
</template>

<style scoped>
.entry {
  width: 100%;
  justify-content: left !important;
  font-size: 1.25em;
  padding: 1.5em 0.5em 1.5em 0.5em !important;
}
.icon {
  margin-right: 0.5em;
}
</style>

<script>
export default {
  data() {
    return {
      settingsItems: [
        { name: "General", icon: "mdi-cog", to: "", disabled: true },
        { name: "Theme", icon: "mdi-brush-variant", to: "/mods/theme" },
        { name: "Player", icon: "mdi-motion-play-outline", to: "", disabled: true },
        { name: "UI Tweaker", icon: "mdi-television-guide", to: "", disabled: true },
        { name: "Updates", icon: "mdi-cloud-download-outline", to: "/mods/updates" },
        { name: "Logs", icon: "mdi-text-box-outline", to: "/mods/logs" },
        { name: "About", icon: "mdi-information-outline", to: "/mods/about" },
      ]
    }
  }
}
</script>
