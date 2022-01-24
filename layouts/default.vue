<template>
  <v-app dark>
    <v-app-content>
      <nuxt />
    </v-app-content>


    <v-bottom-navigation v-model="value" >
      <v-btn v-for="(item, i) in tabs" :key="i">
        <span v-text="item.name" />

        <v-icon v-text="item.icon" />
      </v-btn>
    </v-bottom-navigation>


  </v-app>
</template>

<script>
  export default {
    data: () => ({
      value: 0,
      tabs: [
        { name: "Home", icon: "mdi-home" },
        { name: "Shorts", icon: "mdi-lightning-bolt" },
        { name: "Upload", icon: "mdi-plus" },
        { name: "Subscriptions", icon: "mdi-youtube-subscription" },
        { name: "Library", icon: "mdi-view-list" },
      ]
    }),
  }
</script>
